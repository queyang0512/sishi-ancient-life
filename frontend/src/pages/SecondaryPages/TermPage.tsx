import { Link, useParams } from 'react-router-dom'
import { getSeasonalHeroImage } from '../../components/SeasonalTheme/SeasonalTheme'
import { useContent } from '../../data/ContentProvider'
import { CausalFlow, ItemCard, PageHero, SectionTitle } from './PageElements'
import styles from './SecondaryPages.module.css'

const labels: Record<string,string> = { food:'食',clothing:'衣',home:'居',travel:'行',work:'作',leisure:'乐',custom:'俗',taboo:'忌' }
const dateRanges = ['02.04—02.18','02.19—03.04','03.05—03.19','03.20—04.03','04.04—04.19','04.20—05.04','05.05—05.20','05.21—06.04','06.05—06.20','06.21—07.06','07.07—07.22','07.23—08.06','08.07—08.22','08.23—09.06','09.07—09.22','09.23—10.07','10.08—10.22','10.23—11.06','11.07—11.21','11.22—12.06','12.07—12.21','12.22—01.04','01.05—01.19','01.20—02.03']

export function TermPage() {
  const { cultureItems, solarTerms } = useContent()
  const { term: slug } = useParams()
  const term = solarTerms.find((entry) => entry.slug === slug) ?? solarTerms[14]
  const currentIndex = solarTerms.findIndex((entry) => entry.slug === term.slug)
  const prev = solarTerms[(currentIndex + 23) % 24]
  const next = solarTerms[(currentIndex + 1) % 24]
  const related = cultureItems.filter((item) => item.term === term.name)
  const displayItems = related
  const seasonPhase = ['孟','孟','仲','仲','季','季'][currentIndex % 6]
  return <div className={styles.page}>
    <PageHero eyebrow={`${term.season}季 · ${seasonPhase}${term.season} · 约 ${dateRanges[currentIndex]}`} title={term.name} lead={term.summary} image={getSeasonalHeroImage(term.season, term.slug)} />
    <main className={styles.content}>
      <section><SectionTitle eyebrow="顺应此时" title="这个时节怎么生活" copy={`到了${term.name}，古人的饮食、衣着、起居和劳作都会随物候发生细微变化。`} />
        {displayItems.length > 2 ? <div className={styles.termLead}><div className={styles.termFeatureGrid}>{displayItems.slice(0,3).map((item) => <Link className={styles.termFeature} style={{backgroundImage:`url(${item.image})`}} key={item.id} to={`/item/${item.id}`}><strong>{labels[item.category]} · {item.title}</strong><span>{item.summary}</span></Link>)}</div><ul className={styles.lightList}>{displayItems.slice(3,7).map((item) => <li key={item.id}><Link to={`/item/${item.id}`}><b>{labels[item.category]}</b><span>{item.title}</span><i aria-hidden="true">→</i></Link></li>)}</ul></div> : displayItems.length ? <div className={styles.itemGrid}>{displayItems.map((item,index) => <ItemCard key={item.id} item={item} featured={index===0}/>)}</div> : <div className={styles.contentNotice}><b>{term.name}</b><p>这一节气的生活条目正在依据文献整理中。暂不使用其他节气内容填充，避免产生错误关联。</p><Link to="/year">返回四时地图 →</Link></div>}
      </section>
      <section className={styles.section}><SectionTitle eyebrow="从自然到日常" title="为什么这样生活"/><CausalFlow season={term.season}/></section>
      {displayItems.length > 2 && <section className={styles.section}><SectionTitle eyebrow="深入了解" title="相关文化条目"/><div className={styles.itemGrid}>{displayItems.slice(0,5).map((item,index) => <ItemCard key={item.id} item={item} featured={index===0}/>)}</div></section>}
      <nav className={styles.termNav} aria-label="切换节气"><Link to={`/year/${prev.slug}`}>← {prev.name}</Link><strong>{term.name}</strong><Link to={`/year/${next.slug}`}>{next.name} →</Link></nav>
    </main>
  </div>
}
