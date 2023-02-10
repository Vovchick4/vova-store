import styles from './index.module.css'

export default function Container({ children }: any) {
    return (
        <main className={styles.layout}>{children}</main>
    )
}
