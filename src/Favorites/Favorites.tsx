import { useEffect, useState } from 'react';
import styles from './Favorites.module.css';

export default function Favorites() {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/favorites`,
                    { credentials: 'include' }
                );
                if (res.ok) {
                    const data = await res.json();
                    setFavorites(data);
                } else {
                    console.error('Failed to fetch favorites');
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }

        fetchFavorites();
    }, []);
    async function handleRemoveFavorite(jobId: any) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/favorites/${jobId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (res.ok) {
                setFavorites((prevFavorites) =>
                    prevFavorites.filter((job) => job.id !== jobId)
                );
            } else {
                console.error('Failed to remove favorite');
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    }

    return (
        <div className={styles.favorites}>
            <h2 className={styles.title}>Your Favorite Jobs</h2>
            {favorites.length === 0 ? (
                <p className={styles.noFavorites}>No favorite jobs found.</p>
            ) : (
                <div className={styles.jobList}>
                    {favorites.map((job) => (
                        <div key={job.id} className={styles.jobItem}>
                            <h2>{job.title}</h2>
                            <p>{job.location}</p>
                            <p>Type: {job.jobtype}</p>
                            <p>Remote: {job.isremote ? 'Yes' : 'No'}</p>
                            <button
                                onClick={() => handleRemoveFavorite(job.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
