import styles from './Dashboard.module.css';
import { useState } from 'react';

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
                <button onClick={toggleMyJobs}>
                    {showmyjobs ? 'Hide My Jobs' : 'Show My Jobs'}
                </button>
                {showmyjobs && <div>My Jobs will be displayed here.</div>}
            </div>
        </>
    );
}
