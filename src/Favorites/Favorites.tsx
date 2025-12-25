import styles from './Favorites.module.css';

type FavoritesProps = {
    user: any;
};

export default function Favorites({ user }: FavoritesProps) {
    return (
        <>
            <div className={styles.favorites}>your favorites</div>
        </>
    );
}
