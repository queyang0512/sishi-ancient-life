import { useContent } from '../../data/ContentProvider'
import { getSeasonalHeroImage } from '../SeasonalTheme/SeasonalTheme'
import styles from './SeasonWheel.module.css'

type Props = { current?: string; compact?: boolean; onChange?: (slug: string) => void; onReset?: () => void }

export function SeasonWheel({ current = 'bailu', compact = false, onChange, onReset }: Props) {
  const { solarTerms } = useContent()
  const active = solarTerms.find((term) => term.slug === current) ?? solarTerms[14]
  return (
    <div
      className={`${styles.wheel} ${compact ? styles.compact : ''}`}
      aria-label="二十四节气"
      onMouseLeave={onReset}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) onReset?.()
      }}
    >
      <div className={styles.scene}>
        <img className={styles.sceneImage} key={active.slug} src={getSeasonalHeroImage(active.season, active.slug)} alt="" />
        <small>{active.season}季 · 当前节气</small>
        <strong>{active.name}</strong>
        <span>{active.summary}</span>
      </div>
      {solarTerms.map((term, index) => {
        const angle = index * 15
        return (
          <button
            type="button"
            key={term.slug}
            className={`${styles.term} ${term.slug === active.slug ? styles.active : ''}`}
            style={{ transform: `rotate(${angle}deg) translateY(var(--orbit)) rotate(-${angle}deg)` }}
            aria-label={`${term.name}：${term.summary}`}
            aria-pressed={term.slug === active.slug}
            onClick={() => onChange?.(term.slug)}
            onFocus={() => onChange?.(term.slug)}
            onMouseEnter={() => onChange?.(term.slug)}
          >
            {term.name}
          </button>
        )
      })}
      <i className={`${styles.season} ${styles.spring}`}>春</i><i className={`${styles.season} ${styles.summer}`}>夏</i><i className={`${styles.season} ${styles.autumn}`}>秋</i><i className={`${styles.season} ${styles.winter}`}>冬</i>
    </div>
  )
}
