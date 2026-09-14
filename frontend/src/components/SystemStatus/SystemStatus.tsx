import { useContent } from '../../data/ContentProvider'
import styles from './SystemStatus.module.css'

export function SystemStatus() {
  const { source } = useContent()

  const label = {
    loading: '正在载入文化内容',
    remote: '文化内容已更新',
    cache: '正在使用内置内容',
  }[source]

  return (
    <span className={styles.status} role="status">
      <span className={`${styles.dot} ${styles[source]}`} aria-hidden="true" />
      {label}
    </span>
  )
}
