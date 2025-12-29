import { useEffect, useState } from 'react';
import styles from './Jobs.module.css';
import { Link } from 'react-router';

type JobsProps = {
    user: any;
};

export default function Jobs({ user }: JobsProps) {
    const [jobs, setJobs] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/jobs`
                );
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                } else {
                    setJobs([]);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        }

        fetchJobs();
    }, []);

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function handleSearch() {
        const value = input.toLowerCase();
        if (!value) {
            setFilteredJobs([]);
            return;
        }
        setFilteredJobs(
            jobs.filter(
                (job) =>
                    job.title.toLowerCase().includes(value) ||
                    job.location.toLowerCase().includes(value) ||
                    job.description.toLowerCase().includes(value)
            )
        );
    }
    const jobsToShow = filteredJobs.length > 0 ? filteredJobs : jobs;

    return (
        <div className={styles.jobs}>
            <div className={styles.searchSection}>
                {' '}
                <h2>Job Listings</h2>
                <div className={styles.searchBox}>
                    <input
                        className={styles.styleInput}
                        type="text"
                        value={input}
                        onChange={handleSearchChange}
                        placeholder="Search jobs..."
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className={styles.jobList}>
                {jobsToShow.map((job) => (
                    <div key={job.id} className={styles.jobCard}>
                        <h2>{job.title}</h2>
                        <p>{job.location}</p>
                        <p>{job.description}</p>

                        <Link
                            to={`/jobs/${job.id}`}
                            className={styles.viewDetailsButton}
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
