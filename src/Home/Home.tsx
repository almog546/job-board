import styles from './Home.module.css';
import { Link } from 'react-router-dom';

type HomeProps = {
    user: any;
};

export default function Home({ user }: HomeProps) {
    return (
        <>
            {user ? (
                <div className={styles.home}>
                    <h2>Welcome, {user.name}!</h2>
                    <p className={styles.description}>
                        Explore the latest job opportunities tailored just for
                        you.
                    </p>
                    <Link to="/jobs" className={styles.exploreButton}>
                        Explore Jobs
                    </Link>
                </div>
            ) : (
                <div className={styles.home}>
                    <h2>Welcome to the Job Board</h2>
                    <p className={styles.description}>
                        A modern platform for discovering job opportunities,
                        searching and filtering positions, and applying with
                        ease.
                    </p>
                    <Link to="/jobs" className={styles.exploreButton}>
                        Explore Jobs
                    </Link>
                </div>
            )}
        </>
    );
}
