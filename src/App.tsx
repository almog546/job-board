import Signup from './Signup/Signup';
import Login from './Login/Login';
import Home from './Home/Home';
import Header from './header/Header';
import Jobs from './Jobs/Jobs';
import Favorites from './Favorites/Favorites';
import Dashboard from './Dashboard/Dashboard';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Ceatejob from './Ceatejob/Ceatejob';

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
                <Route path="/Signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home user={user} />} />
                <Route path="/jobs" element={<Jobs user={user} />} />
                <Route path="/Favorites" element={<Favorites user={user} />} />
                <Route path="/Dashboard" element={<Dashboard user={user} />} />
                <Route path="/Ceatejob" element={<Ceatejob user={user} />} />
            </Routes>
        </>
    );
}

export default App;
