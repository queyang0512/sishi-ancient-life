import { HeroSection } from './sections/HeroSection'
import { LifeSection } from './sections/LifeSection'
import { SeasonSection } from './sections/SeasonSection'
import { StoriesSection } from './sections/StoriesSection'

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <SeasonSection />
      <LifeSection />
      <StoriesSection />
    </div>
  )
}

