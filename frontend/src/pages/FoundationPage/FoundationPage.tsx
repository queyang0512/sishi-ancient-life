import styles from './FoundationPage.module.css'

interface FoundationPageProps {
  eyebrow: string
  title: string
  description: string
}

export function FoundationPage({ eyebrow, title, description }: FoundationPageProps) {
  return (
    <section className={styles.page}>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <div className={styles.divider} aria-hidden="true" />
      <p className={styles.description}>{description}</p>
      <p className={styles.note}>当前页面已纳入项目路由，功能将按开发步骤逐步补充。</p>
    </section>
  )
}

