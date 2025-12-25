import styles from './Dashboard.module.css';

type DashboardProps = {
    user: any;
};
export default function Dashboard({ user }: DashboardProps) {
    return (
        <>
            <div className={styles.dashboard}>your dashboard</div>
        </>
    );
}
