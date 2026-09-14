import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../components/SiteLayout/SiteLayout'
import { FoundationPage } from '../pages/FoundationPage/FoundationPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { TodayPage } from '../pages/SecondaryPages/TodayPage'
import { YearPage } from '../pages/SecondaryPages/YearPage'
import { TermPage } from '../pages/SecondaryPages/TermPage'
import { ItemPage } from '../pages/SecondaryPages/ItemPage'
import { LifeAtlasPage } from '../pages/SecondaryPages/LifeAtlasPage'
import { StoriesPage, StoryDetailPage } from '../pages/SecondaryPages/StoriesPage'
import { SearchPage } from '../pages/SecondaryPages/SearchPage'
import { ContentProvider } from '../data/ContentProvider'

export function App() {
  return (
    <ContentProvider><Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="today" element={<TodayPage />} />
        <Route path="year" element={<YearPage />} />
        <Route path="year/:term" element={<TermPage />} />
        <Route path="item/:id" element={<ItemPage />} />
        <Route path="life" element={<LifeAtlasPage />} />
        <Route path="life/:category" element={<LifeAtlasPage />} />
        <Route path="atlas" element={<Navigate to="/life" replace />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="stories/:id" element={<StoryDetailPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="about"
          element={
            <FoundationPage
              eyebrow="关于本站"
              title="让传统回到生活"
              description="本站关注古人在不同时间与环境下如何生活，以及为什么这样生活。"
            />
          }
        />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes></ContentProvider>
  )
}
