import styles from './header.module.css';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
    user: any;
};

export default function Header({ user }: HeaderProps) {
    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }
    return (
        <>
            {!user ? (
                <div className={styles.header}>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            ) : (
                <div></div>
            )}
            {user && user.role === 'JOB_SEEKER' && (
                <div className={styles.header}>
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/favorites">favorites</Link>
                </div>
            )}
            {user && user.role === 'EMPLOYER' && (
                <div className={styles.header}>
                    <Link to="/">Home</Link>
                    <Link to="/Createjob">Create Job </Link>
                    <Link to="/Dashboard ">Dashboard </Link>
                </div>
            )}
        </>
    );
}
