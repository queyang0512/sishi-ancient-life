import type { CSSProperties, ReactNode } from 'react'
import styles from './SeasonalTheme.module.css'

type ThemeTerm = {
  slug: string
  season: string
}

export function SeasonalTheme({ term, className = '', children }: { term?: ThemeTerm; className?: string; children: ReactNode }) {
  return (
    <div
      className={`${styles.theme} ${className}`}
      data-season={term?.season ?? '常'}
      data-term={term?.slug ?? 'neutral'}
      style={term ? { '--hero-season-image': `url(${getSeasonalHeroImage(term.season, term.slug)})` } as CSSProperties : undefined}
    >
      {children}
    </div>
  )
}

const termHeroImages: Record<string, string> = {
  lichun: '/images/term-lichun-v2.webp',
  yushui: '/images/term-yushui-v2.webp',
  jingzhe: '/images/term-jingzhe-v2.webp',
  chunfen: '/images/term-chunfen-v2.webp',
  qingming: '/images/term-qingming-v2.webp',
  guyu: '/images/term-guyu-v2.webp',
  lixia: '/images/term-lixia-v2.webp',
  xiaoman: '/images/term-xiaoman-v2.webp',
  mangzhong: '/images/term-mangzhong-v2.webp',
  xiazhi: '/images/term-xiazhi-v2.webp',
  xiaoshu: '/images/term-xiaoshu-v2.webp',
  dashu: '/images/term-dashu-v2.webp',
  liqiu: '/images/term-liqiu-v2.webp',
  chushu: '/images/term-chushu-v2.webp',
  bailu: '/images/term-bailu-v2.webp',
  qiufen: '/images/season-autumn-v1.jpg',
  hanlu: '/images/term-hanlu-v2.webp',
  shuangjiang: '/images/term-shuangjiang-v2.webp',
  lidong: '/images/term-lidong-v2.webp',
  xiaoxue: '/images/term-xiaoxue-v2.webp',
  daxue: '/images/term-daxue-v2.webp',
  dongzhi: '/images/term-dongzhi-v2.webp',
  xiaohan: '/images/term-xiaohan-v2.webp',
  dahan: '/images/term-dahan-v2.webp',
}

export function getSeasonalHeroImage(season: string, termSlug?: string) {
  if (termSlug && termHeroImages[termSlug]) return termHeroImages[termSlug]
  if (season === '春') return '/images/season-spring-v1.jpg'
  if (season === '夏') return '/images/season-summer-v1.jpg'
  if (season === '冬') return '/images/season-winter-v1.jpg'
  return '/images/season-autumn-v1.jpg'
}
