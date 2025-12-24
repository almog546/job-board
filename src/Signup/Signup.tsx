import { useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../validation/signupSchema';

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await signupSchema.validate(
                { email, password, name, role },
                { abortEarly: false }
            );

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name, role }),
                    credentials: 'include',
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }

            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (err) {
            if (err.name === 'ValidationError') {
                setError(err.errors.join(', '));
            } else {
                setError('Server error');
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.signupForm}>
            <h2 className={styles.signupTitle}>Sign Up</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select role</option>
                <option value="JOB_SEEKER">Job Seeker</option>
                <option value="EMPLOYER">Employer</option>
            </select>

            <button type="submit" className={styles.signupButton}>
                Sign Up
            </button>

            {/* הודעות למשתמש */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>User created!</p>}

            <Link to="/login" className={styles.loginLink}>
                Already have an account? Login
            </Link>
        </form>
    );
}
