import { Link } from 'react-router-dom'
import { categories, type CategoryKey } from '../../data/culture'
import styles from './SecondaryPages.module.css'

export function PageHero({ eyebrow, title, lead, image }: { eyebrow: string; title: string; lead: string; image?: string }) {
  return <header className={styles.pageHero} style={image ? { backgroundImage: `linear-gradient(90deg,rgba(var(--theme-paper-rgb),.98),rgba(var(--theme-paper-rgb),.78) 48%,rgba(var(--theme-paper-rgb),.05)),url(${image})` } : undefined}><div><p>{eyebrow}</p><h1>{title}</h1><span>{lead}</span></div></header>
}

export function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <div className={styles.sectionTitle}>{eyebrow && <p>{eyebrow}</p>}<h2>{title}</h2>{copy && <span>{copy}</span>}</div>
}

export function CategoryTabs({ active, base = '/life', search = '' }: { active?: CategoryKey; base?: string; search?: string }) {
  return <nav className={styles.categoryTabs} aria-label="生活分类">{categories.map((category) => <Link aria-current={active === category.key ? 'page' : undefined} className={active === category.key ? styles.tabActive : ''} key={category.key} to={`${base}/${category.key}${search}`}>{category.label}<small>{category.key}</small></Link>)}</nav>
}

export function ItemCard({ item, featured = false, to, context }: { item: { id: string; title: string; summary: string; image: string; term?: string; dynasty?: string; region?: string }; featured?: boolean; to?: string; context?: string }) {
  return <Link className={`${styles.itemCard} ${featured ? styles.itemFeatured : ''}`} to={to ?? `/item/${item.id}`}><img src={item.image} alt=""/><div><p>{context ?? [item.term,item.dynasty,item.region].filter(Boolean).join(' · ')}</p><h3>{item.title}</h3><span>{item.summary}</span><i aria-hidden="true">→</i></div></Link>
}

export function CausalFlow({ season = '秋' }: { season?: string }) {
  const seasonal = {
    春: [['天','天气回暖','风雨渐多，寒意未尽'],['候','草木萌发','花信渐至，蛰虫初醒'],['人','由藏转生','舒展身心，慎防春寒'],['生','生活调整','尝鲜、踏青、渐减衣'],['俗','节令成俗','迎春、簪花、采新茶']],
    夏: [['天','暑热渐盛','日长雨多，湿热交织'],['候','万物繁茂','荷开蝉鸣，作物生长'],['人','易热易倦','宜清心，避过度耗散'],['生','生活调整','纳凉、清饮、午间小憩'],['俗','节令成俗','浴兰、佩香、消夏']],
    秋: [['天','天气转凉','昼夜温差渐大'],['候','自然收敛','露凝、鸟归、草木熟'],['人','感受变化','易感凉燥，肺气宜养'],['生','生活调整','润燥、添衣、早卧'],['俗','节令成俗','饮茶、收露、赏秋']],
    冬: [['天','寒意加深','日短风寒，雨雪渐多'],['候','万物收藏','水冰地冻，草木休眠'],['人','宜藏宜温','减少耗散，顾护阳气'],['生','生活调整','温食、添衣、早卧晚起'],['俗','节令成俗','祭祖、围炉、备年']],
  } as Record<string, string[][]>
  const nodes = seasonal[season] ?? seasonal.秋
  return <ol className={styles.causalFlow}>{nodes.map(([mark,title,copy],index) => <li key={mark}><b>{mark}</b><div><strong>{title}</strong><span>{copy}</span></div>{index < nodes.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol>
}
