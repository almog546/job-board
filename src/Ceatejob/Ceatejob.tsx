import styles from './Ceatejob.module.css';

type CeatejobProps = {
    user: any;
};
export default function Ceatejob({ user }: CeatejobProps) {
    return (
        <>
            <div className={styles.ceatejob}>your ceatejob</div>
        </>
    );
}
