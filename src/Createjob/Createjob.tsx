import styles from './Createjob.module.css';

type CreatejobProps = {
    user: any;
};
export default function Createjob({ user }: CreatejobProps) {
    return (
        <>
            <div className={styles.createjob}>your createjob</div>
        </>
    );
}
