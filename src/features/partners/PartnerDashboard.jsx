import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { userDB } from '../../core/firebase/firebase.user';
import { useAuth } from '../../core/contexts/AuthContext';

const PartnerDashboard = () => {
    const { currentUser } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(userDB, 'properties'),
                    where('ownerId', '==', currentUser.email) // Using email as ID based on AuthContext
                );

                const querySnapshot = await getDocs(q);
                const props = [];
                querySnapshot.forEach((doc) => {
                    props.push({ id: doc.id, ...doc.data() });
                });
                setProperties(props);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [currentUser]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="badge bg-success">Live</span>;
            case 'rejected': return <span className="badge bg-danger">Rejected</span>;
            case 'pending': return <span className="badge bg-warning text-dark">Under Review</span>;
            default: return <span className="badge bg-secondary">Draft</span>;
        }
    };

    return (
        <div className="container py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold text-dark">Partner Dashboard</h1>
                    <p className="text-muted">Manage your listings and view their status</p>
                </div>
                <Link to="/partner/add-property" className="btn btn-primary btn-lg rounded-pill px-4">
                    <i className="fas fa-plus me-2"></i> List New Property
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : properties.length === 0 ? (
                <div className="text-center py-5 bg-light rounded-3">
                    <i className="fas fa-hotel fa-4x text-muted mb-3"></i>
                    <h3>No Properties Listed Yet</h3>
                    <p>Get started by listing your first hotel or homestay.</p>
                    <Link to="/partner/add-property" className="btn btn-primary mt-3">
                        List Your Property
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {properties.map((property) => (
                        <div className="col-md-6 col-lg-4" key={property.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div style={{ height: '200px', background: '#eee', position: 'relative' }}>
                                    {property.images && property.images.length > 0 ? (
                                        <img src={property.images[0]} alt={property.name} className="w-100 h-100 object-fit-cover rounded-top" />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                            <i className="fas fa-image fa-2x"></i>
                                        </div>
                                    )}
                                    <div className="position-absolute top-0 end-0 m-3">
                                        {getStatusBadge(property.status)}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{property.name}</h5>
                                    <p className="card-text text-muted small"><i className="fas fa-map-marker-alt me-1"></i> {property.location?.city || 'Location not set'}</p>
                                    <p className="card-text">
                                        <small className="text-muted">Type: {property.type}</small>
                                    </p>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                                    <button className="btn btn-outline-primary btn-sm">Edit Details</button>
                                    <button className="btn btn-outline-secondary btn-sm">View</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PartnerDashboard;
