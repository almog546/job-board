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
    const [editingJobId, setEditingJobId] = useState<string | null>(null);
    const [editedValues, setEditedValues] = useState({
        title: '',
        location: '',
        description: '',
        jobtype: '',
        isremote: false,
    });
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

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
            handleShowMessage('Job created successfully');
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
            handleShowMessage('Job deleted successfully');
            setMyJobs((prev) => prev.filter((job) => job.id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    }
    function startEditing(job: any) {
        setEditingJobId(job.id);
        setEditedValues({
            title: job.title,
            location: job.location,
            description: job.description,
            jobtype: job.jobtype,
            isremote: job.isremote,
        });
    }
    async function handleSaveEdit(jobId: string) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`,
                {
                    method: 'put',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editedValues),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.error(data.message);
                return;
            }
            handleShowMessage('Job updated successfully');
            setMyJobs((prev) =>
                prev.map((job) =>
                    job.id === jobId ? { ...job, ...editedValues } : job
                )
            );
            setEditingJobId(null);
            setEditedValues({
                title: '',
                location: '',
                description: '',
                jobtype: '',
                isremote: false,
            });
        } catch (error) {
            console.error('Error updating job:', error);
        }
    }
    async function handleCancelEdit(jobId: string) {
        setEditingJobId(null);
        setEditedValues({
            title: '',
            location: '',
            description: '',
            jobtype: '',
            isremote: false,
        });
    }
    function handleShowMessage(text: string) {
        setMessage(text);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    }

    return (
        <>
            {showMessage && (
                <div className={styles.overlay}>
                    <div className={styles.messageBox}>{message}</div>
                </div>
            )}
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
                                        {editingJobId === job.id ? (
                                            <div className={styles.editJobForm}>
                                                <input
                                                    type="text"
                                                    value={editedValues.title}
                                                    onChange={(e) =>
                                                        setEditedValues({
                                                            ...editedValues,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className={
                                                        styles.inputField
                                                    }
                                                />
                                                <textarea
                                                    value={
                                                        editedValues.description
                                                    }
                                                    onChange={(e) =>
                                                        setEditedValues({
                                                            ...editedValues,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className={
                                                        styles.textareaField
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    value={
                                                        editedValues.location
                                                    }
                                                    onChange={(e) =>
                                                        setEditedValues({
                                                            ...editedValues,
                                                            location:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className={
                                                        styles.inputField
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    value={editedValues.jobtype}
                                                    onChange={(e) =>
                                                        setEditedValues({
                                                            ...editedValues,
                                                            jobtype:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className={
                                                        styles.inputField
                                                    }
                                                />
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            editedValues.isremote
                                                        }
                                                        onChange={(e) =>
                                                            setEditedValues({
                                                                ...editedValues,
                                                                isremote:
                                                                    e.target
                                                                        .checked,
                                                            })
                                                        }
                                                    />
                                                    Remote
                                                </label>
                                                <button
                                                    className={
                                                        styles.saveButton
                                                    }
                                                    onClick={() =>
                                                        handleSaveEdit(job.id)
                                                    }
                                                >
                                                    {' '}
                                                    Save
                                                </button>
                                                <button
                                                    className={
                                                        styles.cancelButton
                                                    }
                                                    onClick={() =>
                                                        handleCancelEdit(job.id)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <h3>{job.title}</h3>
                                                <p>{job.description}</p>
                                                <p>{job.location}</p>
                                                <p>{job.jobtype}</p>
                                                <p>
                                                    {job.isremote
                                                        ? 'Remote'
                                                        : 'On-site'}
                                                </p>
                                                <div
                                                    className={
                                                        styles.jobActions
                                                    }
                                                >
                                                    <button
                                                        className={
                                                            styles.editButton
                                                        }
                                                        onClick={() =>
                                                            startEditing(job)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className={
                                                            styles.deleteButton
                                                        }
                                                        onClick={() =>
                                                            handleDeleteJob(
                                                                job.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
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
