// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/sonachala-userfrontend/', 
//   server: {
//     historyApiFallback: true // ✅ This fixes the 404 on refresh locally
//   }
// });







import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sonachala-booking-engine-user/', // Changed to '/' for local development
  server: {
    historyApiFallback: true // ✅ This fixes the 404 on refresh locally
  }
});
