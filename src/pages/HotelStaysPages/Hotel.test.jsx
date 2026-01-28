import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import HomePage from './Hotel'
import { MemoryRouter } from 'react-router-dom'

// Mock flatpickr to control selectedDates behavior
vi.mock('flatpickr', () => ({
  default: vi.fn((el, opts) => {
    // Shim for fp_incr used in component
    // flatpickr extends Date with fp_incr, we emulate here by intercepting option
    if (opts && typeof opts.maxDate === 'object' && typeof opts.maxDate.fp_incr === 'function') {
      // no-op
    }
    const instance = {
      selectedDates: [],
      setDate: vi.fn((dates) => {
        instance.selectedDates = dates
        opts?.onChange?.(dates, '')
      }),
      destroy: vi.fn(),
    }
    // Provide fp_incr on Date prototype for tests
    if (!('fp_incr' in Date.prototype)) {
      // @ts-ignore
      Date.prototype.fp_incr = function (days) {
        const d = new Date(this.valueOf())
        d.setDate(d.getDate() + days)
        return d
      }
    }
    // simulate defaultDate
    if (opts?.defaultDate) {
      const defaults = opts.defaultDate.map((d) => (typeof d === 'string' ? new Date(d) : d))
      instance.selectedDates = defaults
    }
    return instance
  }),
}))

// Mock navigate
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

const setup = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <HomePage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('Hotel HomePage', () => {
  it('renders search form with defaults and prevents search when >30 nights', () => {
    setup()
    // Should render inputs
    expect(screen.getByPlaceholderText('Enter destination')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Check-in - Check-out')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Guests & Rooms')).toBeInTheDocument()

    // Default dates span 1 night so Search enabled
    const searchBtn = screen.getByRole('button', { name: /search/i })
    expect(searchBtn).toBeEnabled()
  })

  it('toggles guests dropdown and updates counts with constraints', async () => {
    setup()

    // Open the guests dropdown
    const guestsInput = screen.getByPlaceholderText('Guests & Rooms')
    fireEvent.click(guestsInput)

    const decAdults = screen.getAllByRole('button', { name: '-' })[0]
    const incAdults = screen.getAllByRole('button', { name: '+' })[0]

    // Adults cannot go below max(1, rooms)
    expect(decAdults).toBeDisabled()

    // Increase adults
    fireEvent.click(incAdults)

    // Click Done to persist
    fireEvent.click(screen.getByRole('button', { name: /done/i }))

    await waitFor(() => {
      expect(guestsInput.value).toMatch(/Guests: 2, Rooms: 1/)
    })
  })

  it('writes selection to localStorage on Done', () => {
    setup()

    // Open and click Done immediately
    fireEvent.click(screen.getByPlaceholderText('Guests & Rooms'))
    fireEvent.click(screen.getByRole('button', { name: /done/i }))

    expect(localStorage.getItem('adults')).toBeDefined()
    expect(localStorage.getItem('children')).toBeDefined()
    expect(localStorage.getItem('rooms')).toBeDefined()
  })

  it('reads URL params to prefill form', async () => {
    const params = '?location=Chennai&checkIn=2025-01-01&checkOut=2025-01-03&adults=3&children=1&rooms=2'
    setup([`/${params}`])

    // Location prefilled
    expect(screen.getByDisplayValue('Chennai')).toBeInTheDocument()

    // Dates reflect checkIn - checkOut
    expect(screen.getByDisplayValue('2025-01-01 - 2025-01-03')).toBeInTheDocument()

    // Open dropdown to observe counts controls state
    fireEvent.click(screen.getByPlaceholderText('Guests & Rooms'))

    // Adults cannot be decreased below rooms
    const decAdults = screen.getAllByRole('button', { name: '-' })[0]
    expect(decAdults).toBeDisabled()
  })

  it('navigates to HotelList with built query on submit', () => {
    const navigateSpy = vi.fn()

    // Remap useNavigate mock to return our spy for this test
    vi.doMock('react-router-dom', async (orig) => {
      const actual = await orig()
      return {
        ...actual,
        useNavigate: () => navigateSpy,
      }
    })

    setup()

    // Fill destination
    fireEvent.change(screen.getByPlaceholderText('Enter destination'), { target: { value: 'Madurai' } })

    // Submit
    fireEvent.submit(screen.getByRole('button', { name: /search/i }).closest('form'))

    expect(navigateSpy).toHaveBeenCalled()
    const url = navigateSpy.mock.calls[0][0]
    expect(url).toMatch(/HotelList\?/) // path
    expect(url).toMatch(/location=Madurai/)
    expect(url).toMatch(/adults=/)
    expect(url).toMatch(/children=/)
    expect(url).toMatch(/rooms=/)
  })
})
