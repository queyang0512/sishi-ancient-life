import { Link } from 'react-router-dom'
import styles from '../HomePage.module.css'

const categories = [
  { name: '食', copy: '时令而食，顺应天时', image: '/images/hero-bailu.png', className: 'food', route: 'food' },
  { name: '衣', copy: '因时增减，舒身养心', image: '/images/linen-hanfu.png', className: 'clothing', route: 'clothing' },
  { name: '居', copy: '晨昏有序，安顿日常', image: '/images/tea-incense.png', className: 'dwelling', route: 'home' },
  { name: '行', copy: '曲水行舟，远近皆景', image: '/images/misty-boat.png', className: 'travel', route: 'travel' },
  { name: '作', copy: '顺应农时，劳作有度', image: '/images/hero-bailu.png', className: 'work', route: 'work' },
  { name: '乐', copy: '宴饮游赏，闲逸有志', image: '/images/tea-incense.png', className: 'leisure', route: 'leisure' },
  { name: '忌', copy: '因时趋避，养护身心', image: '/images/tea-incense.png', className: 'taboo', route: 'taboo' },
  { name: '俗', copy: '节令有信，承续人情', image: '/images/misty-boat.png', className: 'custom', route: 'custom' },
]

export function LifeSection() {
  return (
    <section className={styles.lifeSection} aria-labelledby="life-title">
      <header className={styles.sectionHeader}>
        <div><h2 id="life-title">此时 · 生活</h2><p>从饮食起居到出行游乐，走进古人的日常。</p></div>
        <Link to="/life">查看全部 <span aria-hidden="true">→</span></Link>
      </header>
      <div className={styles.lifeGrid}>
        {categories.map((item) => (
          <Link key={item.name} className={`${styles.lifeCard} ${styles[item.className]}`} style={{ backgroundImage: `url(${item.image})` }} to={`/life/${item.route}`}>
            <span className={styles.lifeShade} aria-hidden="true" /><strong>{item.name}</strong><small>{item.copy}</small><i aria-hidden="true">→</i>
          </Link>
        ))}
      </div>
    </section>
  )
}
