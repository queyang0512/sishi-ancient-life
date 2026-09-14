import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p>四〇四</p>
      <h1>此处尚无踪迹</h1>
      <p>你访问的页面不存在，或仍在整理之中。</p>
      <Link to="/">返回此时</Link>
    </section>
  )
}

