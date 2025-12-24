import styles from './header.module.css';
import { Link } from 'react-router-dom';

type HeaderProps = {
    user: any;
};

export default function Header({ user }: HeaderProps) {
    return (
        <>
            {user ? (
                <div className={styles.header}>
                    <Link to="/">Home</Link>
                    <div>Welcome, {user.name}</div>
                </div>
            ) : (
                <div className={styles.header}>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </>
    );
}
