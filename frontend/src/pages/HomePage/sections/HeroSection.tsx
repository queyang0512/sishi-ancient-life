import { Link } from 'react-router-dom'
import { getCurrentSeasonalContext } from '../../../data/culture'
import styles from '../HomePage.module.css'

const seasonalQuickLinks = {
  春: [
    { title: '吃什么', copy: '尝新食春，清鲜有节', image: '/images/hero-bailu.png', position: '74% 66%', route: 'food' },
    { title: '穿什么', copy: '渐减冬衣，慎防春寒', image: '/images/linen-hanfu.png', position: '64% 55%', route: 'clothing' },
    { title: '做什么', copy: '备耕踏青，舒展身心', image: '/images/misty-boat.png', position: '56% 52%', route: 'work' },
    { title: '注意什么', copy: '风雨多变，起居有常', image: '/images/tea-incense.png', position: '54% 58%', route: 'taboo' },
  ],
  夏: [
    { title: '吃什么', copy: '清饮瓜果，饮食有度', image: '/images/hero-bailu.png', position: '74% 66%', route: 'food' },
    { title: '穿什么', copy: '轻衣透气，宽缓舒身', image: '/images/linen-hanfu.png', position: '64% 55%', route: 'clothing' },
    { title: '做什么', copy: '顺时劳作，午间小憩', image: '/images/misty-boat.png', position: '56% 52%', route: 'work' },
    { title: '注意什么', copy: '避暑防湿，不过度贪凉', image: '/images/tea-incense.png', position: '54% 58%', route: 'taboo' },
  ],
  秋: [
    { title: '吃什么', copy: '润燥养肺，食梨饮茶', image: '/images/hero-bailu.png', position: '74% 66%', route: 'food' },
    { title: '穿什么', copy: '晨晚添衣，舒适自在', image: '/images/linen-hanfu.png', position: '64% 55%', route: 'clothing' },
    { title: '做什么', copy: '顺应秋收，安顿生活', image: '/images/misty-boat.png', position: '56% 52%', route: 'work' },
    { title: '注意什么', copy: '慎居避凉，不过度劳心', image: '/images/tea-incense.png', position: '54% 58%', route: 'taboo' },
  ],
  冬: [
    { title: '吃什么', copy: '温食暖饮，滋养收藏', image: '/images/tea-incense.png', position: '74% 66%', route: 'food' },
    { title: '穿什么', copy: '层叠御寒，护住颈足', image: '/images/linen-hanfu.png', position: '64% 55%', route: 'clothing' },
    { title: '做什么', copy: '收整器物，静候新岁', image: '/images/misty-boat.png', position: '56% 52%', route: 'work' },
    { title: '注意什么', copy: '早卧晚起，减少耗散', image: '/images/tea-incense.png', position: '54% 58%', route: 'taboo' },
  ],
} as const

const seasonalQuotes = {
  春: ['一枝新绿', '便是好时节'],
  夏: ['一席清风', '便是好时节'],
  秋: ['一瓯清茶', '便是好时节'],
  冬: ['一炉微火', '便是好时节'],
} as const

export function HeroSection() {
  const { term, dateLabel, lunarLabel } = getCurrentSeasonalContext()
  const season = term.season as keyof typeof seasonalQuickLinks
  const quickLinks = seasonalQuickLinks[season] ?? seasonalQuickLinks.秋
  const quote = seasonalQuotes[season] ?? seasonalQuotes.秋

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <aside className={styles.heroMarginalia} aria-hidden="true">
        <svg viewBox="0 0 190 430">
          <path className={styles.inkBranch} d="M28 420c34-73 31-139 66-204 26-48 33-104 22-184M67 301c-29-22-45-49-50-80M83 248c39-21 64-54 75-96M101 181c-27-26-39-55-37-87M112 119c29-15 48-39 58-69" />
          <path className={styles.inkLeaf} d="M17 220c31 1 47 15 49 43-30-3-46-17-49-43Zm142-69c-30 3-47 18-49 47 29-6 46-20 49-47ZM63 93c30 4 44 20 43 48-28-7-43-22-43-48Zm107-44c-28 6-42 23-40 50 26-8 40-24 40-50Z" />
        </svg>
      </aside>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.dateLine}>{dateLabel} <span>农历{lunarLabel}</span> <b>{term.name}</b></p>
          <h1 id="home-title">今天，<br />古人怎么生活？</h1>
          <p className={styles.heroLead}>{term.summary}。<br />古人顺应时节，调整饮食起居，<br />在自然的变化中，寻找生活的平衡。</p>
          <Link className={styles.outlineButton} to="/today">探索今日生活 <span aria-hidden="true">→</span></Link>
        </div>
        <blockquote className={styles.seasonQuote}><span>{quote[0]}</span><span>{quote[1]}</span></blockquote>
        <div className={styles.quickGrid} aria-label="今日生活导览">
          {quickLinks.map((item) => (
            <Link key={item.title} className={styles.quickCard} to={`/life/${item.route}`}>
              <span className={styles.quickImage} style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.position }} aria-hidden="true" />
              <span><strong>{item.title}</strong><small>{item.copy}</small></span>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
