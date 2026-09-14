import { Link, useParams, useSearchParams } from 'react-router-dom'
import { categories, getCategory, type CategoryKey } from '../../data/culture'
import { useContent } from '../../data/ContentProvider'
import { atlasCategoryCopy, atlasDimensions, buildAtlasGroups, type AtlasView } from './lifeAtlasContent'
import styles from './LifeAtlasPage.module.css'

export function LifeAtlasPage() {
  const { cultureItems, solarTerms } = useContent()
  const { category } = useParams()
  const active = getCategory(category)
  const [params, setParams] = useSearchParams()
  const requestedView = params.get('view')
  const view: AtlasView = requestedView === 'dynasty' || requestedView === 'region' ? requestedView : 'time'
  const copy = atlasCategoryCopy[active.key]
  const groups = buildAtlasGroups(view, active.key, cultureItems, solarTerms)
  const heroImage = copy.heroImage
  const preservedSearch = view === 'time' ? '' : `?view=${view}`

  const changeView = (nextView: AtlasView) => {
    const next = new URLSearchParams(params)
    if (nextView === 'time') next.delete('view')
    else next.set('view', nextView)
    setParams(next, { replace: true })
  }

  return <div className={styles.page}>
    <header key={active.key} className={styles.hero}>
      <img className={styles.heroImage} src={heroImage} alt="" />
      <div className={styles.heroWash} aria-hidden="true" />
      <div className={styles.heroInner}>
        <p>生活之相</p>
        <h1>生活图鉴</h1>
        <span>{active.intro}</span>
        <div className={styles.heroMark} aria-hidden="true"><b>{copy.mark}</b><i>{active.label}</i></div>
      </div>
    </header>

    <main className={styles.main}>
      <nav className={styles.categoryTabs} aria-label="生活分类">
        {categories.map((item) => <Link
          key={item.key}
          to={`/life/${item.key}${preservedSearch}`}
          className={item.key === active.key ? styles.categoryActive : ''}
          aria-current={item.key === active.key ? 'page' : undefined}
        ><strong>{item.label}</strong><small>{item.key.toUpperCase()}</small></Link>)}
      </nav>

      <section className={styles.atlasSection} aria-labelledby="atlas-heading">
        <div className={styles.sectionHeading}>
          <div><h2 id="atlas-heading">{copy.heading}</h2><p>{copy.lead}</p></div>
          <fieldset className={styles.dimensionTabs}>
            <legend>浏览方式：</legend>
            {atlasDimensions.map((dimension) => <button
              type="button"
              key={dimension.key}
              aria-pressed={dimension.key === view}
              className={dimension.key === view ? styles.dimensionActive : ''}
              onClick={() => changeView(dimension.key)}
            >{dimension.label}</button>)}
          </fieldset>
        </div>

        <div className={styles.groupGrid} data-view={view}>
          {groups.map((group) => <AtlasGroup key={group.key} group={group} category={active.key} />)}
        </div>
      </section>
    </main>

    <aside className={styles.editorialBanner} style={{ backgroundImage: `linear-gradient(90deg,rgba(244,248,248,.98),rgba(244,248,248,.7),rgba(244,248,248,.28)),url(/images/misty-boat.png)` }}>
      <div><h2>{copy.bannerTitle}</h2><p>{copy.bannerCopy}</p></div>
      <Link to={`/stories?category=${active.key}`}>了解更多关于{active.label}的文章 <span aria-hidden="true">→</span></Link>
    </aside>
  </div>
}

type AtlasGroupData = ReturnType<typeof buildAtlasGroups>[number]

function AtlasGroup({ group, category }: { group: AtlasGroupData; category: CategoryKey }) {
  return <article className={styles.group}>
    <header><div><h3>{group.label}</h3><small>{group.english}</small></div><p>{group.tagline}<br />{group.change}</p><BotanicalMotif season={group.label} /></header>
    <Link className={styles.featureImage} to={group.items[0].to} aria-label={`查看${group.items[0].title}`}><img src={group.image} alt="" /></Link>
    <ul>{group.items.map((item) => <AtlasEntry key={`${group.key}-${item.title}`} item={item} />)}</ul>
    <Link className={styles.groupLink} to={`/search?q=${encodeURIComponent(group.label + categories.find((item) => item.key === category)?.label)}`}>查看{group.label}{categories.find((item) => item.key === category)?.label}事 <span aria-hidden="true">→</span></Link>
  </article>
}

function AtlasEntry({ item }: { item: { title: string; summary: string; image: string; to: string } }) {
  return <li><Link to={item.to}><img src={item.image} alt="" /><span><b>{item.title}</b><small>{item.summary}</small></span><i aria-hidden="true">→</i></Link></li>
}

const seasonalBotanicals: Record<string, string> = {
  春: '/images/atlas-botanical-spring-v1.png',
  夏: '/images/atlas-botanical-summer-v1.png',
  秋: '/images/atlas-botanical-autumn-v1.png',
  冬: '/images/atlas-botanical-winter-v1.png',
}

function BotanicalMotif({ season }: { season: string }) {
  const image = seasonalBotanicals[season]
  return image ? <img className={styles.botanical} src={image} alt="" aria-hidden="true" /> : null
}
