import { Link } from 'react-router-dom'
import { getSeasonalHeroImage } from '../../components/SeasonalTheme/SeasonalTheme'
import { categories, getCurrentSeasonalContext } from '../../data/culture'
import { useContent } from '../../data/ContentProvider'
import { CausalFlow, ItemCard, PageHero, SectionTitle } from './PageElements'
import styles from './SecondaryPages.module.css'

export function TodayPage() {
  const { cultureItems, solarTerms, stories } = useContent()
  const { term, dateLabel, lunarLabel } = getCurrentSeasonalContext()
  const termIndex = solarTerms.findIndex((item) => item.slug === term.slug)
  const prev = solarTerms[(termIndex + 23) % 24]
  const next = solarTerms[(termIndex + 1) % 24]
  const currentItems = cultureItems.filter((item) => item.term === term.name)
  return <div className={styles.page}>
    <PageHero eyebrow={`${dateLabel} · 农历${lunarLabel} · ${term.season}季`} title="今日生活" lead={`${term.summary}。随四时起居劳作，在节律中安顿一日。`} image={getSeasonalHeroImage(term.season, term.slug)} />
    <nav className={styles.inlineTermNav} aria-label="切换前后节气"><Link to={`/year/${prev.slug}`}>← {prev.name}</Link><Link className={styles.currentPill} to={`/year/${term.slug}`}>{term.name}</Link><Link to={`/year/${next.slug}`}>{next.name} →</Link></nav>
    <main className={styles.content}>
      <SectionTitle eyebrow="一日之中" title="今日生活总览" copy={`八个生活侧面，共同组成古人顺应${term.name}的日常。`} />
      <div className={styles.overviewGrid}>{categories.map((category) => { const item = currentItems.find((entry) => entry.category === category.key); return <Link className={styles.overviewCard} key={category.key} to={item ? `/item/${item.id}` : `/life/${category.key}`}><strong>{category.label}</strong><span>{item?.title ?? category.intro}<br/>{item && <small>{item.summary}</small>}</span><i>{item ? '查看' : '浏览图鉴'} →</i></Link> })}</div>
      <section className={styles.section}>
        <SectionTitle eyebrow={`${term.name}宜事`} title="重点生活内容" copy="从吃一颗梨到收起凉席，节气落在每一件具体小事里。" />
        <div className={styles.itemGrid}>{currentItems.slice(0,6).map((item,index) => <ItemCard key={item.id} item={item} featured={index === 0}/>)}</div>
      </section>
      <section className={styles.section}><SectionTitle eyebrow="顺时而为" title="为什么这样生活"/><CausalFlow/></section>
      <section className={styles.section}><SectionTitle eyebrow="继续读" title="相关文化故事"/><div className={styles.itemGrid}>{stories.map((story) => <ItemCard key={story.id} item={story} to={`/stories/${story.id}`} />)}</div></section>
    </main>
  </div>
}
