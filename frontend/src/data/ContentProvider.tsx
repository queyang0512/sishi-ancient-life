import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { cultureItems as cachedItems, solarTerms as cachedTerms, stories as cachedStories, type CategoryKey } from './culture'

export type SolarTerm = { slug: string; name: string; season: string; summary: string }
export type CultureItem = {
  id: string; title: string; category: CategoryKey; term: string; dynasty: string; region: string
  image: string; summary: string; practice: string; reason: string; history?: string[]; source: string
  sourceType?: 'historical_document' | 'literary_record' | 'modern_research' | 'living_tradition'
  citation?: string
  evidenceLevel?: 'A' | 'B' | 'C' | 'D'
}
export type Story = { id: string; title: string; category: string; summary: string; image: string; body: string[] }

type ContentState = {
  solarTerms: SolarTerm[]
  cultureItems: CultureItem[]
  stories: Story[]
  source: 'loading' | 'remote' | 'cache'
}

const strongEvidence = new Set(['bailu-tea','autumn-clothes','collect-dew','lichun-spring-dish','qingming-outing','mangzhong-busy-fields','dongzhi-family-meal'])
const originalItemIds = new Set(['bailu-tea','autumn-pear','autumn-clothes','dry-home','autumn-walk','autumn-harvest','osmanthus-night','collect-dew','avoid-night-dew'])
const seasonalImages: Record<string,string> = {
  春: '/images/season-spring-v1.jpg', 夏: '/images/season-summer-v1.jpg', 秋: '/images/season-autumn-v1.jpg', 冬: '/images/season-winter-v1.jpg',
}

const cachedContent: ContentState = {
  solarTerms: cachedTerms as SolarTerm[],
  cultureItems: cachedItems.map((item) => {
    const sourceType = item.source.includes('诗词') || item.source.includes('笔记') || item.source.includes('岁时')
      ? 'literary_record'
      : item.source.includes('本草') || item.source.includes('农书') || item.source.startsWith('《')
        ? 'historical_document'
        : item.source.includes('研究') || item.source.includes('资料')
          ? 'modern_research'
          : 'living_tradition'
    const season = cachedTerms.find((term) => term.name === item.term)?.season ?? '秋'
    const image = originalItemIds.has(item.id) ? item.image : seasonalImages[season]
    return {...item,image,citation:item.source,sourceType,evidenceLevel:strongEvidence.has(item.id) ? 'B' : 'C'} as CultureItem
  }),
  stories: cachedStories as Story[],
  source: 'loading',
}

const ContentContext = createContext<ContentState>(cachedContent)
const remoteContentEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_REMOTE_CONTENT === 'true'

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url,{signal})
  if (!response.ok) throw new Error(`content request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export function ContentProvider({children}:{children:ReactNode}) {
  const [content,setContent] = useState<ContentState>(() => remoteContentEnabled ? cachedContent : {...cachedContent,source:'cache'})

  useEffect(() => {
    if (!remoteContentEnabled) return
    const controller = new AbortController()
    Promise.all([
      getJson<{terms:SolarTerm[]}>('/api/content/terms',controller.signal),
      getJson<{items:CultureItem[]}>('/api/content/items',controller.signal),
      getJson<{stories:Story[]}>('/api/content/stories',controller.signal),
    ]).then(([termPayload,itemPayload,storyPayload]) => {
      if (!termPayload.terms.length || !itemPayload.items.length || !storyPayload.stories.length) throw new Error('content response is empty')
      setContent({solarTerms:termPayload.terms,cultureItems:itemPayload.items,stories:storyPayload.stories,source:'remote'})
    }).catch((error:unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setContent({...cachedContent,source:'cache'})
    })
    return () => controller.abort()
  },[])

  const value = useMemo(() => content,[content])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
