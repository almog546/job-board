import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include',
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            navigate('/');
        } catch {
            setError('Server is unavailable');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1>Login Page</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.loginButton}>
                Login
            </button>
        </form>
    );
}
