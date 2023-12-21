import Image from 'next/image';
import styles from '../../styles/footer.module.css'

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <Image className={styles.logo} src='/ifrn_logo.png' alt='ifrn logo' width={100} height={150}/>
        </footer>
    )
}