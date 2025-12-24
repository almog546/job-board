import Signup from './Signup/Signup.jsx';
import Login from './Login/Login.jsx';
import Home from './Home/Home.jsx';
import Header from './header/header.jsx';
import Jobs from './Jobs/Jobs.jsx';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    { credentials: 'include' }
                );

                if (res.ok) {
                    setUser(await res.json());
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        }

        checkAuth();
    }, []);
    return (
        <>
            <Header user={user} />
            <Routes>
                <Route path="/Signup" element={<Signup user={user} />} />
                <Route path="/login" element={<Login user={user} />} />
                <Route path="/" element={<Home user={user} />} />
                <Route path="/jobs" element={<Jobs user={user} />} />
            </Routes>
        </>
    );
}

export default App;
