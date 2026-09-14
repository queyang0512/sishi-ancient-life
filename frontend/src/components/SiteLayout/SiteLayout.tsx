import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { getCurrentSeasonalContext, getTerm } from '../../data/culture'
import { useContent } from '../../data/ContentProvider'
import { SeasonalTheme } from '../SeasonalTheme/SeasonalTheme'
import { SystemStatus } from '../SystemStatus/SystemStatus'
import styles from './SiteLayout.module.css'

const navigation = [
  { to: '/', label: '今日生活' },
  { to: '/year', label: '古人的一年' },
  { to: '/life', label: '生活图鉴' },
  { to: '/stories', label: '文化随笔' },
]

export function SiteLayout() {
  const location = useLocation()
  const { cultureItems, solarTerms } = useContent()
  const path = location.pathname.split('/').filter(Boolean)
  const currentTerm = getCurrentSeasonalContext().term
  const item = path[0] === 'item' ? cultureItems.find((entry) => entry.id === path[1]) : undefined
  const itemTerm = item ? solarTerms.find((entry) => entry.name === item.term) : undefined
  const themedTerm = path.length === 0 || path[0] === 'today' || (path[0] === 'year' && path.length === 1)
    ? currentTerm
    : path[0] === 'year' && path[1]
      ? solarTerms.find((entry) => entry.slug === path[1]) ?? getTerm(path[1])
      : itemTerm

  return (
    <SeasonalTheme term={themedTerm} className={styles.siteShell}>
      <a className={styles.skipLink} href="#main-content">
        跳到主要内容
      </a>
      <header className={styles.header}>
        <NavLink className={styles.brand} to="/" aria-label="古人日常首页">
          <strong>四时</strong>
          <small>ANCIENT<br />CHINA</small>
        </NavLink>
        <nav aria-label="主导航">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) => {
                    const isTodaySection = item.to === '/' && location.pathname === '/today'
                    return `${styles.navLink} ${isActive || isTodaySection ? styles.navLinkActive : ''}`
                  }}
                  end={item.to === '/'}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <NavLink className={styles.searchLink} to="/search">
          <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
          <span>搜索节气、习俗或生活问题</span>
        </NavLink>
        <NavLink className={styles.aboutLink} to="/about">关于</NavLink>
      </header>

      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>循四时，见日常。</p>
        <SystemStatus />
        <NavLink to="/about">关于与资料来源</NavLink>
      </footer>
    </SeasonalTheme>
  )
}
