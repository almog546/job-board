import { useEffect, useState } from 'react';
import styles from './Jobpage.module.css';
import { useParams } from 'react-router-dom';

export default function Jobpage() {
    const [jobDetails, setJobDetails] = useState<any>(null);
    const { id } = useParams();
    useEffect(() => {
        async function fetchJobDetails() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setJobDetails(data);
                } else {
                    setJobDetails(null);
                }
            } catch {
                setJobDetails(null);
            }
        }
        fetchJobDetails();
    }, [id]);

    if (!jobDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.jobpage}>
            <h1>{jobDetails.title}</h1>
            <h2>{jobDetails.location}</h2>
            <h3>Type: {jobDetails.jobtype}</h3>
            <p>{jobDetails.description}</p>
            <p>Remote: {jobDetails.isremote ? 'Yes' : 'No'}</p>
            <button>Add to Favorites</button>
        </div>
    );
}
