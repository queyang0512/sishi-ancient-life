import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { cultureItems, solarTerms, stories } from '../../data/culture'
import styles from './SecondaryPages.module.css'

const filters = ['全部','食','衣','居','行','作','乐','俗','忌']
const labels: Record<string,string> = { food:'食',clothing:'衣',home:'居',travel:'行',work:'作',leisure:'乐',custom:'俗',taboo:'忌' }
const categoryKeys: Record<string,string> = Object.fromEntries(Object.entries(labels).map(([key,label]) => [label,key]))
const remoteSearchEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_REMOTE_CONTENT === 'true'

type Result = {
  id?: string
  title: string
  summary: string
  image: string
  type: string
  category?: string
  to: string
}

function localResults(query: string, filter: string): Result[] {
  const normalized = query.trim().toLowerCase()
  const itemResults = cultureItems
    .filter((item) => (!normalized || `${item.title}${item.summary}${item.term}${item.dynasty}${item.region}`.toLowerCase().includes(normalized)) && (filter==='全部'||labels[item.category]===filter))
    .map((item)=>({...item,type:'item',to:`/item/${item.id}`}))
  const termResults = filter==='全部' ? solarTerms
    .filter((term)=>normalized && `${term.name}${term.summary}${term.season}`.includes(normalized))
    .map((term)=>({id:term.slug,title:term.name,summary:term.summary,image:'/images/misty-boat.png',type:'term',to:`/year/${term.slug}`})) : []
  const storyResults = filter==='全部' ? stories
    .filter((story)=>!normalized||`${story.title}${story.summary}`.includes(normalized))
    .map((story)=>({...story,type:'story',to:`/stories/${story.id}`})) : []
  return normalized ? [...termResults,...itemResults,...storyResults] : [...itemResults.slice(0,5),...storyResults]
}

function resultType(result: Result) {
  if (result.type === 'term') return '节气'
  if (result.type === 'story') return '文化随笔'
  return `文化条目 · ${labels[result.category ?? ''] ?? '生活'}`
}

export function SearchPage() {
  const [params,setParams] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') ?? ''
  const filter = filters.includes(params.get('category') ?? '') ? params.get('category')! : '全部'
  const requestKey = `${query}\u0000${filter}`
  const [searchState,setSearchState] = useState<{key:string;results:Result[];usingFallback:boolean}>(() => ({key:'',results:localResults(query,filter),usingFallback:false}))
  const loading = searchState.key !== requestKey
  const { results, usingFallback } = searchState

  useEffect(() => {
    if (!remoteSearchEnabled) {
      setSearchState({key:requestKey,results:localResults(query,filter),usingFallback:false})
      return
    }
    const controller = new AbortController()
    const request = new URLSearchParams()
    if (query.trim()) request.set('q',query.trim())
    if (filter !== '全部') request.set('category',categoryKeys[filter])
    fetch(`/api/search?${request.toString()}`,{signal:controller.signal})
      .then((response) => {
        if (!response.ok) throw new Error('search request failed')
        return response.json() as Promise<{results:Result[]}>
      })
      .then((payload) => setSearchState({key:requestKey,results:payload.results,usingFallback:false}))
      .catch((error:unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setSearchState({key:requestKey,results:localResults(query,filter),usingFallback:true})
      })
    return () => controller.abort()
  },[query,filter,requestKey])

  const submit = (event:FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    const value = String(data.get('q') ?? '')
    const next = new URLSearchParams()
    if (value.trim()) next.set('q',value.trim())
    if (filter !== '全部') next.set('category',filter)
    navigate(`/search?${next.toString()}`)
  }
  const changeFilter = (item:string) => {
    const next = new URLSearchParams(params)
    if (item === '全部') next.delete('category')
    else next.set('category',item)
    setParams(next,{replace:true})
  }

  return <div className={`${styles.page} ${styles.plainPage}`}><main className={styles.content}>
    <div className={styles.searchBox}>
      <p className={styles.eyebrow}>循迹而问</p><h1>搜索</h1>
      <form key={query} onSubmit={submit}><input name="q" defaultValue={query} placeholder="搜索白露、竹席、宋代饮食……" aria-label="搜索内容"/><button aria-label="提交搜索">→</button></form>
      <div className={styles.filterTabs} aria-label="搜索分类">{filters.map((item)=><button type="button" aria-pressed={filter===item} className={filter===item?styles.buttonActive:''} key={item} onClick={()=>changeFilter(item)}>{item}</button>)}</div>
    </div>
    <div className={styles.results} aria-busy={loading}>
      {query && <p>“{query}”的搜索结果 · {loading ? '查询中' : `${results.length} 条`}</p>}
      {usingFallback && <p className={styles.resultNotice} role="status">内容服务暂时不可用，当前显示本地缓存结果。</p>}
      {!loading && (results.length ? results.map((result)=><Link className={styles.result} key={`${result.type}-${result.id ?? result.title}`} to={result.to}><img src={result.image} alt=""/><div><small>{resultType(result)}</small><h3>{result.title}</h3><p>{result.summary}</p></div><span>→</span></Link>) : <div className={styles.empty}>暂未找到相关内容，试试“白露”“秋衣”或“饮茶”。</div>)}
    </div>
  </main></div>
}
