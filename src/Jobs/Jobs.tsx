import styles from './Jobs.module.css';

type JobsProps = {
    user: any;
};
export default function Jobs({ user }: JobsProps) {
    return (
        <>
            <div className={styles.jobs}>your jobs</div>
        </>
    );
}
