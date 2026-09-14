import { Navigate, useParams } from 'react-router-dom'
import { useContent } from '../../data/ContentProvider'
import { CausalFlow, ItemCard, SectionTitle } from './PageElements'
import styles from './SecondaryPages.module.css'

const labels: Record<string,string> = { food:'食',clothing:'衣',home:'居',travel:'行',work:'作',leisure:'乐',custom:'俗',taboo:'忌' }
const evidenceLabels = {
  A: { label: '高', note: '有可直接对应的历史文献或实物材料。' },
  B: { label: '较高', note: '由明确文献与相关研究交叉印证。' },
  C: { label: '参考', note: '主要依据间接记述、地方材料或延续性经验。' },
  D: { label: '待考', note: '材料有限，仅作为文化线索呈现。' },
} as const
const sourceTypeLabels: Record<string,string> = {
  historical_document: '古代文献', literary_record: '文学与生活记录', modern_research: '当代研究', living_tradition: '地方材料与生活经验',
}

function relatedItems(item: { id:string; term:string; category:string; region:string; dynasty:string }, items: ReturnType<typeof useContent>['cultureItems']) {
  return items.filter((entry) => entry.id !== item.id).map((entry) => {
    const reasons = []
    let score = 0
    if (entry.term === item.term) { score += 60; reasons.push('同节气') }
    if (entry.category === item.category) { score += 40; reasons.push('同主题') }
    if (entry.region === item.region) { score += 15; reasons.push('同地域') }
    if (entry.dynasty === item.dynasty) { score += 10; reasons.push('同时期') }
    return { entry, score, reason: reasons.slice(0,2).join(' · ') || '延伸阅读' }
  }).filter((candidate) => candidate.score > 0).sort((left,right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title,'zh-CN')).slice(0,4)
}

export function ItemPage() {
  const { cultureItems } = useContent()
  const { id } = useParams()
  const item = cultureItems.find((entry) => entry.id === id)
  if (!item) return <Navigate to="/life" replace />
  const recommendations = relatedItems(item,cultureItems)
  const evidence = evidenceLabels[item.evidenceLevel ?? 'C']
  return <div className={styles.page}>
    <header className={styles.articleHero}><div><p>{labels[item.category]} · {item.term} · {item.region} · {item.dynasty}</p><h1>{item.title}</h1><span>{item.summary}</span></div><img src={item.image} alt={item.title}/></header>
    <main className={styles.content}>
      <section className={styles.proseGrid}><h2>古人怎么做</h2><p>{item.practice}</p></section>
      <section className={styles.section}><div className={styles.proseGrid}><h2>为什么这样做</h2><p>{item.reason}</p></div><div className={styles.causalSpacing}><CausalFlow/></div></section>
      {!!item.history?.length && <section className={styles.section}><SectionTitle eyebrow="流变" title="历史演变"/><div className={styles.timeline}>{item.history.map((event,index) => <div key={event}><b>{['早期','唐宋','明清'][index] ?? `阶段 ${index+1}`}</b><span>{event}</span></div>)}</div></section>}
      {item.source && <section className={styles.section}><SectionTitle eyebrow="资料说明" title="文献出处" copy="证据等级用于说明材料与条目结论之间的对应程度，不代表对传统本身的价值判断。"/><div className={styles.sourceBox}><div><strong>{item.source}</strong><dl><div><dt>来源类型</dt><dd>{sourceTypeLabels[item.sourceType ?? ''] ?? '综合资料'}</dd></div><div><dt>引用说明</dt><dd>{item.citation || item.source}</dd></div></dl></div><div className={styles.evidenceBadge}><span>证据等级 {item.evidenceLevel ?? 'C'}</span><b>可信度 · {evidence.label}</b><small>{evidence.note}</small></div></div></section>}
      {!!recommendations.length && <section className={styles.section}><SectionTitle eyebrow="继续探索" title="与此相关" copy="推荐依据节气、生活主题、地域与时代的关联程度排序。"/><div className={styles.itemGrid}>{recommendations.map(({entry,reason}) => <ItemCard key={entry.id} item={entry} context={reason}/>)}</div></section>}
    </main>
  </div>
}
