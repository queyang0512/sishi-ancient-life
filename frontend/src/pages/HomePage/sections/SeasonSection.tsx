import { Link } from 'react-router-dom'
import { getCurrentSeasonalContext } from '../../../data/culture'
import { useContent } from '../../../data/ContentProvider'
import styles from '../HomePage.module.css'

const seasonalReasons: Record<string, { icon: string; title: string; copy: string }[]> = {
  春: [{icon:'○',title:'天气变化',copy:'风暖雨润，寒意未尽'},{icon:'⌁',title:'自然物候',copy:'草木萌发，花信渐至'},{icon:'◇',title:'人体感受',copy:'由藏转生，舒展身心'},{icon:'□',title:'生活方式',copy:'尝鲜踏青，渐次减衣'}],
  夏: [{icon:'○',title:'天气变化',copy:'日长暑盛，湿热交织'},{icon:'⌁',title:'自然物候',copy:'荷开蝉鸣，万物繁茂'},{icon:'◇',title:'人体感受',copy:'易热易倦，宜静心'},{icon:'□',title:'生活方式',copy:'清饮纳凉，午间小憩'}],
  秋: [{icon:'○',title:'天气变化',copy:'暑气渐退，空气转燥'},{icon:'⌁',title:'自然物候',copy:'露凝草木，万物收敛'},{icon:'◇',title:'人体感受',copy:'晨晚转凉，宜养收敛'},{icon:'□',title:'生活方式',copy:'饮食润燥，起居有节'}],
  冬: [{icon:'○',title:'天气变化',copy:'日短风寒，雨雪渐多'},{icon:'⌁',title:'自然物候',copy:'水冰地冻，草木休眠'},{icon:'◇',title:'人体感受',copy:'宜藏宜温，减少耗散'},{icon:'□',title:'生活方式',copy:'温食添衣，早卧晚起'}],
}

export function SeasonSection() {
  const { solarTerms } = useContent()
  const { term } = getCurrentSeasonalContext()
  const pivot = solarTerms.findIndex((entry) => entry.slug === 'dongzhi')
  const wheelTerms = pivot >= 0 ? [...solarTerms.slice(pivot),...solarTerms.slice(0,pivot)] : solarTerms
  const reasons = seasonalReasons[term.season] ?? seasonalReasons.秋
  return (
    <section className={styles.seasonSection} aria-labelledby="season-title">
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>与自然同行</p>
        <h2 id="season-title">四时与生活</h2>
        <p>时间改变自然，也改变生活。跟随二十四节气，看见古人顺应天时的智慧。</p>
        <Link className={styles.outlineButton} to="/year">进入节气地图 <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.termWheel} aria-label={`二十四节气示意图，当前节气为${term.name}`}>
        {wheelTerms.map((entry, index) => {
          const angle = index * 15
          return <button
            type="button"
            key={entry.slug}
            className={`${styles.termPoint} ${entry.slug === term.slug ? styles.currentTerm : ''}`}
            style={{ transform: `rotate(${angle}deg) translateY(var(--term-radius)) rotate(${-angle}deg)` }}
            aria-label={`${entry.name}：${entry.summary}`}
          >
            <span>{entry.name}</span>
            <small className={styles.termBubble} role="tooltip">{entry.summary}</small>
          </button>
        })}
        <div className={styles.wheelCenter}><p>{term.name}</p><span>{term.summary}</span><small>{term.season}季 · 此时</small></div>
      </div>
      <div className={styles.reasonPanel}>
        <h3>为什么这个时候<br />这样生活？</h3>
        <p>{term.name}时节，{term.summary}。古人调整饮食、衣着和起居，回应自然的变化。</p>
        <ul>
          {reasons.map((reason) => <li key={reason.title}><span aria-hidden="true">{reason.icon}</span><div><strong>{reason.title}</strong><small>{reason.copy}</small></div></li>)}
        </ul>
      </div>
    </section>
  )
}
