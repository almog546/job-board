import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';

type DashboardProps = {
    user: any;
};
export default function Dashboard({ user }: DashboardProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [jobtype, setJobType] = useState('');
    const [isremote, setIsRemote] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showmyjobs, setShowMyJobs] = useState(false);
    const [myjobs, setMyJobs] = useState<any[]>([]);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);

    async function handleCreateJob() {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/jobs`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        title,
                        description,
                        location,
                        jobtype,
                        isremote,
                    }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                console.error(data.message);
                return;
            }
            alert('Job created successfully');
            setTitle('');
            setDescription('');
            setLocation('');
            setJobType('');
            setIsRemote(false);
        } catch (error) {
            console.error('Error creating job:', error);
        }
    }
    function toggleInput() {
        setShowInput(!showInput);
    }
    function toggleMyJobs() {
        setShowMyJobs(!showmyjobs);
    }
    useEffect(() => {
        async function fetchMyJobs() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/jobs/me`,
                    { credentials: 'include' }
                );

                const data = await res.json();

                if (res.ok && Array.isArray(data)) {
                    setMyJobs(data);
                } else {
                    setMyJobs([]);
                }
            } catch {
                setMyJobs([]);
            }
        }

        fetchMyJobs();
    }, []);

    async function handleDeleteJob(jobId: string) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            const data = await res.json();

            if (!res.ok) {
                console.error(data.message);
                return;
            }
            alert('Job deleted successfully');
            setMyJobs((prev) => prev.filter((job) => job.id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    }

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.create}>
                    <button
                        className={styles.createJobButton}
                        onClick={toggleInput}
                    >
                        {showInput ? 'Cancel' : 'Create Job'}
                    </button>

                    {showInput && (
                        <div className={styles.jobForm}>
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={styles.inputField}
                            />
                            <textarea
                                placeholder="Job Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={styles.inputField}
                                maxLength={2000}
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={styles.inputField}
                            />
                            <input
                                type="text"
                                placeholder="Job Type"
                                value={jobtype}
                                onChange={(e) => setJobType(e.target.value)}
                                className={styles.inputField}
                            />
                            <label>
                                <input
                                    className={styles.checkboxField}
                                    type="checkbox"
                                    checked={isremote}
                                    onChange={(e) =>
                                        setIsRemote(e.target.checked)
                                    }
                                />
                                Remote position
                            </label>
                            <button
                                className={styles.submitJobButton}
                                onClick={handleCreateJob}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.myJobs}>
                    <button onClick={toggleMyJobs}>
                        {showmyjobs ? 'Hide My Jobs' : 'Show My Jobs'}
                    </button>
                    {showmyjobs && (
                        <div className={styles.myJobsList}>
                            {myjobs.length === 0 ? (
                                <p className={styles.noJobsMessage}>
                                    No jobs created yet.
                                </p>
                            ) : (
                                myjobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className={styles.jobItem}
                                    >
                                        <h3>{job.title}</h3>
                                        <p>{job.description}</p>
                                        <p>{job.location}</p>
                                        <p>{job.jobtype}</p>
                                        <p>
                                            {job.isremote
                                                ? 'Remote'
                                                : 'On-site'}
                                        </p>
                                        <div className={styles.jobActions}>
                                            <button
                                                className={styles.editButton}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() =>
                                                    handleDeleteJob(job.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
