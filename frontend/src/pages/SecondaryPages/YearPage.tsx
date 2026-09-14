import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SeasonWheel } from '../../components/SeasonWheel/SeasonWheel'
import { getCurrentSeasonalContext } from '../../data/culture'
import { useContent } from '../../data/ContentProvider'
import styles from './SecondaryPages.module.css'
import { seasonLifeBands, termPreviews } from './yearContent'

export function YearPage() {
  const { solarTerms } = useContent()
  const { term } = getCurrentSeasonalContext()
  const [activeSlug, setActiveSlug] = useState(term.slug)
  const activeTerm = solarTerms.find((entry) => entry.slug === activeSlug) ?? term
  const preview = termPreviews[activeTerm.slug]
  return <div className={styles.page}>
    <div className={styles.yearStage}><section
      className={styles.yearHero}
      onMouseLeave={() => setActiveSlug(term.slug)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveSlug(term.slug)
      }}
    >
      <div className={styles.yearIntro}><p className={styles.eyebrow}>时间之序</p><h1>古人的一年</h1><span>沿着四时环，从风雨花木里辨认时间，看古人的生活如何随节气流转。</span><Link className={styles.outlineLink} to={`/year/${term.slug}`}>查看今日节气 <b>→</b></Link></div>
      <SeasonWheel current={activeTerm.slug} onChange={setActiveSlug} />
      <aside className={styles.yearReason} aria-live="polite"><p className={styles.eyebrow}>节气预览 · {activeTerm.season}季</p><h2>{activeTerm.name}</h2><span>{activeTerm.summary}</span><dl><div><dt>物候</dt><dd>{preview?.phenology ?? activeTerm.summary}</dd></div><div><dt>此时常见</dt><dd>{preview?.activities.join(' / ') ?? '顺时而食 / 因时起居'}</dd></div></dl><p className={styles.previewExplanation}>{preview?.explanation}</p><Link to={`/year/${activeTerm.slug}`}>查看{activeTerm.name}生活 →</Link></aside>
    </section></div>
    <section className={styles.seasonLifeBands} aria-labelledby="season-life-title">
      <header className={styles.seasonLifeHeading}><p className={styles.eyebrow}>四季生活概览</p><h2 id="season-life-title">一年如何生长，又如何收藏</h2><span>从整体变化理解四季，再进入具体节气。</span></header>
      {seasonLifeBands.map((band) => <article className={styles.seasonLifeBand} data-season={band.season} key={band.season}><div className={styles.seasonIdentity}><b>{band.season}</b><h3>{band.title}</h3></div><nav aria-label={`${band.season}季节气`}>{band.terms.map((name) => { const entry = solarTerms.find((item) => item.name === name); return entry ? <Link key={entry.slug} to={`/year/${entry.slug}`} onFocus={() => setActiveSlug(entry.slug)} onMouseEnter={() => setActiveSlug(entry.slug)}>{name}</Link> : null })}</nav><ul>{band.changes.map((change) => <li key={change}>{change}</li>)}</ul></article>)}
    </section>
  </div>
}
