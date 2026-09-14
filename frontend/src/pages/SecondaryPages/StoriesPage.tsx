import { Link, Navigate, useParams } from 'react-router-dom'
import { useContent } from '../../data/ContentProvider'
import { ItemCard, PageHero, SectionTitle } from './PageElements'
import styles from './SecondaryPages.module.css'

export function StoriesPage() {
  const { stories } = useContent()
  return <div className={styles.page}><PageHero eyebrow="文化随笔" title="把日常，讲成故事" lead="从一个季节、一件器物或一种习惯出发，理解古人的生活情感。" image="/images/tea-incense.png"/><main className={styles.content}><SectionTitle eyebrow="编辑精选" title="值得慢慢读"/><div className={styles.storyLead}><ItemCard item={stories[0]} to={`/stories/${stories[0].id}`}/><div className={styles.storyList}>{stories.slice(1).map((story) => <ItemCard key={story.id} item={story} to={`/stories/${story.id}`}/>)}</div></div><section className={styles.section}><SectionTitle eyebrow="最新文章" title="从生活进入历史"/><div className={styles.itemGrid}>{stories.map((story)=><ItemCard key={`latest-${story.id}`} item={story} to={`/stories/${story.id}`}/>)}</div></section></main></div>
}

export function StoryDetailPage() {
  const { cultureItems, stories } = useContent()
  const { id } = useParams()
  const story = stories.find((entry) => entry.id === id)
  if (!story) return <Navigate to="/stories" replace/>
  const related = cultureItems.slice(0,4)
  return <div className={styles.page}><main className={styles.storyArticle}><header><p className={styles.eyebrow}>{story.category} · 文化随笔</p><h1>{story.title}</h1><span>{story.summary}</span></header><img src={story.image} alt=""/><article>{story.body.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</article><section className={styles.section}><SectionTitle eyebrow="关联文化条目" title="从故事继续探索"/><div className={styles.itemGrid}>{related.slice(0,3).map((item)=><ItemCard key={item.id} item={item}/>)}</div><p><Link to="/stories">← 返回文化随笔</Link></p></section></main></div>
}
