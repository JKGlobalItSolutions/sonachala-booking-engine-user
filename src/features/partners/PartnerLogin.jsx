import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../core/contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { userDB, userAuth } from '../../core/firebase/firebase.user';
import { createUserWithEmailAndPassword } from "firebase/auth";

const PartnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signInWithEmail } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                // Register as Partner
                const result = await createUserWithEmailAndPassword(userAuth, email, password);
                const user = result.user;

                // Create User Doc with 'partner' role
                await setDoc(doc(userDB, 'users', user.email), {
                    email: user.email,
                    role: 'partner',
                    createdAt: new Date(),
                    status: 'active'
                });

            } else {
                // Login
                await signInWithEmail(email, password);
            }
            navigate('/partner/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to ' + (isRegistering ? 'register' : 'login') + ': ' + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
            <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-success">Partner Portal</h2>
                    <p className="text-muted">{isRegistering ? 'Join as a Hotel Partner' : 'Welcome Back, Partner'}</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ borderRadius: '10px', padding: '12px' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: '10px', padding: '12px' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100 fw-bold"
                        disabled={loading}
                        style={{ borderRadius: '10px', padding: '12px', background: 'var(--brand-primary, #038A5E)', border: 'none' }}
                    >
                        {loading ? 'Processing...' : (isRegistering ? 'Register as Partner' : 'Login')}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-link text-decoration-none text-success"
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'Already have an account? Login' : 'Want to list your property? Register'}
                    </button>
                </div>

                <div className="text-center mt-2">
                    <Link to="/" className="small text-muted">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default PartnerLogin;
