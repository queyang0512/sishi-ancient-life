import { Link } from 'react-router-dom'
import { useContent } from '../../../data/ContentProvider'
import styles from '../HomePage.module.css'

export function StoriesSection() {
  const { stories } = useContent()
  return (
    <section className={styles.storiesSection} aria-labelledby="stories-title">
      <header className={styles.sectionHeader}>
        <div><h2 id="stories-title">精选文化故事</h2><p>从一个习俗、一件器物，看见古人的生活智慧。</p></div>
        <Link to="/stories">查看更多 <span aria-hidden="true">→</span></Link>
      </header>
      <div className={styles.storyGrid}>
        {stories.map((story) => (
          <Link key={story.title} className={styles.storyCard} to={`/stories/${story.id}`} aria-label={`阅读：${story.title}`}>
            <img src={story.image} alt="" />
            <div><span>{story.category} · 文化随笔</span><h3>{story.title}</h3><p>{story.summary}</p><i aria-hidden="true">→</i></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
