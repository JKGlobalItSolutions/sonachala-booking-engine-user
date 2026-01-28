import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { userDB } from '../../core/firebase/firebase.user';

const AddPropertyWizard = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        type: 'hotel', // hotel or homestay
        description: '',
        price: '', // Price per night
        location: {
            address: '',
            city: '',
            state: 'Tamil Nadu',
            pincode: ''
        },
        contact: {
            phone: '',
            email: ''
        },
        amenities: [],
        images: [], // For now, we will just use URLs or placeholders
        status: 'pending'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAmenityChange = (amenity) => {
        setFormData(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities };
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Add 'ownerId' and timestamp
            const propertyData = {
                ...formData,
                ownerId: currentUser.email,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: 'pending' // Default status awaiting admin approval
            };

            await addDoc(collection(userDB, 'properties'), propertyData);
            alert("Property submitted successfully! It is now under review.");
            navigate('/partner/dashboard');
        } catch (error) {
            console.error("Error submitting property:", error);
            alert("Failed to submit property. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                            <h2 className="fw-bold text-center">List Your Property</h2>
                            <div className="progress mt-3" style={{ height: '5px' }}>
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: `${(step / 3) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="card-body p-4">
                            {step === 1 && (
                                <div className="step-content">
                                    <h4 className="mb-4">Basic Information</h4>
                                    <div className="mb-3">
                                        <label className="form-label">Property Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Property Type</label>
                                        <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                                            <option value="hotel">Hotel</option>
                                            <option value="homestay">Homestay</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" rows="4" name="description" value={formData.description} onChange={handleChange}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price per Night (₹)</label>
                                        <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                                    </div>
                                    <div className="d-flex justify-content-end mt-4">
                                        <button className="btn btn-primary" onClick={() => setStep(2)}>Next: Location</button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="step-content">
                                    <h4 className="mb-4">Location & Contact</h4>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">Address Line</label>
                                            <input type="text" className="form-control" name="location.address" value={formData.location.address} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" name="location.city" value={formData.location.city} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Pincode</label>
                                            <input type="text" className="form-control" name="location.pincode" value={formData.location.pincode} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Contact Phone</label>
                                            <input type="tel" className="form-control" name="contact.phone" value={formData.contact.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Back</button>
                                        <button className="btn btn-primary" onClick={() => setStep(3)}>Next: Amenities</button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="step-content">
                                    <h4 className="mb-4">Amenities & Confirmation</h4>
                                    <div className="mb-4">
                                        <label className="form-label d-block">Select Amenities</label>
                                        <div className="btn-group-toggle d-flex flex-wrap gap-2">
                                            {['WiFi', 'Parking', 'AC', 'Restaurant', 'Pool', 'Room Service'].map(amenity => (
                                                <button
                                                    key={amenity}
                                                    className={`btn ${formData.amenities.includes(amenity) ? 'btn-success' : 'btn-outline-secondary'}`}
                                                    onClick={() => handleAmenityChange(amenity)}
                                                >
                                                    {amenity}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="alert alert-info">
                                        <i className="fas fa-info-circle me-2"></i>
                                        By clicking submit, your property will be sent for review to our admin team. This process currently takes 24-48 hours.
                                    </div>

                                    <div className="d-flex justify-content-between mt-4">
                                        <button className="btn btn-outline-secondary" onClick={() => setStep(2)}>Back</button>
                                        <button className="btn btn-success btn-lg" onClick={handleSubmit} disabled={loading}>
                                            {loading ? 'Submitting...' : 'Submit for Review'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPropertyWizard;
