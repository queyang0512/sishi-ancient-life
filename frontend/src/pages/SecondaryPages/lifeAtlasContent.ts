import type { CultureItem, SolarTerm } from '../../data/ContentProvider'
import type { CategoryKey } from '../../data/culture'

export type AtlasView = 'time' | 'dynasty' | 'region'

export const atlasDimensions: { key: AtlasView; label: string }[] = [
  { key: 'time', label: '按时间' }, { key: 'dynasty', label: '按朝代' }, { key: 'region', label: '按地域' },
]

export const atlasCategoryCopy: Record<CategoryKey, { heading: string; lead: string; mark: string; bannerTitle: string; bannerCopy: string; heroImage: string }> = {
  food: { heading: '在四时中品味饮食', lead: '饮食随四时而变，顺应时令，养身养心。', mark: '一食一时', bannerTitle: '饮食是人与自然的对话', bannerCopy: '春生、夏长、秋收、冬藏，四时流转，饮食随之而变。', heroImage: '/images/atlas-hero-food-v1.jpg' },
  clothing: { heading: '从寒暑中理解衣着', lead: '一层一料，回应风、雨、暑热与霜寒。', mark: '一衣一候', bannerTitle: '衣着是身体对季节的回答', bannerCopy: '材质、层次与形制，共同安顿四时里的身体。', heroImage: '/images/atlas-hero-clothing-v1.jpg' },
  home: { heading: '在居室中安顿四时', lead: '开合门窗、替换寝具，让家顺应天气变化。', mark: '一居一境', bannerTitle: '居所连接人与天地', bannerCopy: '光、风、湿度与温度，塑造着古人的日常空间。', heroImage: '/images/atlas-hero-home-v1.jpg' },
  travel: { heading: '循着天时出行', lead: '舟车步履各有时，远近缓急皆看风物。', mark: '一行一景', bannerTitle: '行旅也是观看四时', bannerCopy: '从城郭到山水，古人在出行中感知季节与地域。', heroImage: '/images/atlas-hero-travel-v1.jpg' },
  work: { heading: '跟着节律劳作', lead: '耕种、采制与收藏，都有不可错过的时机。', mark: '一作一序', bannerTitle: '劳作把节气变成日常', bannerCopy: '看云识雨、随时而作，是古人最朴素的时间智慧。', heroImage: '/images/atlas-hero-work-v1.jpg' },
  leisure: { heading: '在闲情中感受四时', lead: '赏花、听雨、夜坐，闲暇亦有季节。', mark: '一乐一趣', bannerTitle: '闲情让季节有了温度', bannerCopy: '不必远游，一庭花木、一盏清茶便可亲近自然。', heroImage: '/images/atlas-hero-leisure-v1.jpg' },
  custom: { heading: '在习俗中记住时序', lead: '共同的仪式，将自然变化沉淀为生活记忆。', mark: '一俗一念', bannerTitle: '习俗是共同生活的回声', bannerCopy: '节令、家族与乡土，在一次次相聚中彼此连接。', heroImage: '/images/atlas-hero-custom-v1.jpg' },
  taboo: { heading: '从避忌中理解经验', lead: '有所不为，背后常是对身体与环境的观察。', mark: '一忌一慎', bannerTitle: '避忌也是生活经验', bannerCopy: '去除神秘外壳，仍能看见古人趋利避害的日常判断。', heroImage: '/images/atlas-hero-taboo-v1.jpg' },
}

const categoryTopics: Record<CategoryKey, string[]> = {
  food: ['春盘','春茶','荠菜','消暑饮','瓜果','荷花羹','秋梨','秋茶','蟹','羊肉','腊味','暖酒'],
  clothing: ['春衫','夹衣','雨具','葛衣','纱衫','团扇','秋衣','披帛','寒衣','裘衣','手炉','冬帽'],
  home: ['洒扫','开窗','撤帘','铺席','遮阳','纳凉','收席','理庭','添衾','闭户','围炉','防冻'],
  travel: ['踏青','春游','访茶','避暑','泛舟','夜行','登高','赏秋','归田','踏雪','访梅','归家'],
  work: ['备耕','育苗','采茶','插秧','晒麦','理水','秋收','晒谷','入仓','腌藏','修具','备岁'],
  leisure: ['簪花','听雨','斗草','赏荷','消夏','观星','赏桂','夜坐','观菊','围炉','赏雪','探梅'],
  custom: ['迎春','社日','上巳','浴兰','乞巧','尝新','拜月','登高','送寒衣','冬祭','冬至宴','扫尘'],
  taboo: ['防倒寒','忌湿衣','慎风口','避暴晒','忌贪凉','防暑湿','慎秋凉','避夜露','防秋燥','慎寒风','忌久坐','防冰滑'],
}

const viewGroups: Record<AtlasView, { key: string; label: string; english: string; tagline: string; change: string; image: string }[]> = {
  time: [
    { key: '春', label: '春', english: 'SPRING', tagline: '万物复苏', change: '时令鲜嫩', image: '/images/term-qingming-v2.webp' },
    { key: '夏', label: '夏', english: 'SUMMER', tagline: '暑气渐盛', change: '清凉有度', image: '/images/term-xiazhi-v2.webp' },
    { key: '秋', label: '秋', english: 'AUTUMN', tagline: '秋意渐浓', change: '收敛润养', image: '/images/term-bailu-v2.webp' },
    { key: '冬', label: '冬', english: 'WINTER', tagline: '万物收藏', change: '温补养藏', image: '/images/term-dongzhi-v2.webp' },
  ],
  dynasty: [
    { key: '先秦汉', label: '先秦汉', english: 'EARLY CHINA', tagline: '礼制初成', change: '日用有序', image: '/images/term-lichun-v2.webp' },
    { key: '唐宋', label: '唐宋', english: 'TANG · SONG', tagline: '城市繁盛', change: '雅俗相融', image: '/images/term-qingming-v2.webp' },
    { key: '明清', label: '明清', english: 'MING · QING', tagline: '物产丰饶', change: '日常精细', image: '/images/term-bailu-v2.webp' },
    { key: '历代', label: '民间', english: 'FOLK LIFE', tagline: '因地制宜', change: '世代相传', image: '/images/term-dongzhi-v2.webp' },
  ],
  region: [
    { key: '江南', label: '江南', english: 'JIANGNAN', tagline: '水乡温润', change: '清鲜细致', image: '/images/term-guyu-v2.webp' },
    { key: '中原', label: '中原', english: 'CENTRAL PLAIN', tagline: '四季分明', change: '农事有序', image: '/images/term-qiufen-v2.webp' },
    { key: '北方', label: '北地', english: 'NORTH', tagline: '寒暑鲜明', change: '厚实温养', image: '/images/term-xiaohan-v2.webp' },
    { key: '多地', label: '岭南', english: 'LINGNAN', tagline: '湿热丰茂', change: '清润通达', image: '/images/term-dashu-v2.webp' },
  ],
}

const categoryAction: Record<CategoryKey, string> = {
  food: '顺时取味', clothing: '随候增减', home: '安顿居所', travel: '择时而行', work: '应时劳作', leisure: '体会闲趣', custom: '记住时序', taboo: '趋利避害',
}

const categoryPractice: Record<CategoryKey, string> = {
  food: '依照当时可得的食材与气候调配饮食，重在应季、适量与家常做法。',
  clothing: '根据温度、风雨和活动场景增减衣物，并以材质与层次调节体感。',
  home: '通过开合门窗、整理寝具与调整室内陈设，让居所顺应天气变化。',
  travel: '先看天气与路况，再决定远近、时辰和交通方式，尽量避开不利时段。',
  work: '观察物候、土壤和晴雨，把劳作安排在更合适的时段，并及时收整工具。',
  leisure: '选择适宜的时辰与环境，在庭院、郊野或居室中体会当季闲趣。',
  custom: '借由家人共同参与的节令活动，把自然变化转化为可感知的生活仪式。',
  taboo: '留意风寒、湿热和道路环境，减少久坐、受凉或冒险出行等不适宜行为。',
}

const categoryReason: Record<CategoryKey, string> = {
  food: '物产与身体感受都会随季节变化，顺时取食更便于获得食材，也符合日常调养需要。',
  clothing: '气温和湿度并非一日不变，分层增减比骤然换装更容易适应环境。',
  home: '居室中的光、风、湿度与温度直接影响起居舒适度，因此需要随候调整。',
  travel: '传统出行更依赖自然条件，选择合适时机能够减少体力消耗和途中风险。',
  work: '农事与手工活动都有时间窗口，顺应天气和物候可以减少损耗、提高成效。',
  leisure: '游赏与休息并非脱离日常，而是人在季节变化中舒展身心的一种方式。',
  custom: '共同仪式帮助人们确认时间、维系关系，也让抽象的节令进入具体生活。',
  taboo: '许多避忌来自长期生活经验，核心是对寒暑、湿滑与身体承受能力的朴素判断。',
}

function atlasEntryPath(category: CategoryKey, view: AtlasView, groupIndex: number, entryIndex: number) {
  return `/item/atlas-${category}-${view}-${groupIndex}-${entryIndex}`
}

const foodTimeEntries: Record<string, { title: string; summary: string; image: string; to?: string }[]> = {
  春: [
    { title: '春盘尝新', summary: '以时蔬入盘，迎接春天的生机。', image: '/images/atlas-food-spring-v1.jpg', to: '/item/lichun-spring-dish' },
    { title: '春茶', summary: '一杯新茶，唤醒春日的味觉。', image: '/images/tea-incense.png' },
    { title: '荠菜', summary: '春日野菜，清新可口。', image: '/images/atlas-food-spring-v1.jpg' },
  ],
  夏: [
    { title: '消暑饮', summary: '以酸梅汤、绿豆汤解暑。', image: '/images/atlas-food-summer-v1.jpg' },
    { title: '瓜果', summary: '西瓜、香瓜，时令之味。', image: '/images/atlas-food-summer-v1.jpg' },
    { title: '伏日清饮', summary: '温凉有度，补水解渴。', image: '/images/atlas-food-summer-v1.jpg', to: '/item/dashu-herbal-tea' },
  ],
  秋: [
    { title: '秋梨', summary: '润燥养肺，秋日佳果。', image: '/images/atlas-food-autumn-v1.jpg', to: '/item/autumn-pear' },
    { title: '秋茶', summary: '茶性渐平，宜品清润之味。', image: '/images/tea-incense.png', to: '/item/bailu-tea' },
    { title: '蟹', summary: '菊黄蟹肥，秋日时鲜。', image: '/images/atlas-food-crab-v1.jpg' },
  ],
  冬: [
    { title: '羊肉', summary: '温补御寒，冬日常食。', image: '/images/atlas-food-winter-v1.jpg' },
    { title: '腊味', summary: '岁末腌藏，风味悠长。', image: '/images/atlas-food-cured-v1.jpg' },
    { title: '暖酒', summary: '温酒驱寒，暖身安心。', image: '/images/tea-incense.png' },
  ],
}

const foodSeasonImages: Record<string, string> = {
  春: '/images/atlas-food-spring-v1.jpg', 夏: '/images/atlas-food-summer-v1.jpg',
  秋: '/images/atlas-food-autumn-v1.jpg', 冬: '/images/atlas-food-winter-v1.jpg',
}

export function buildAtlasGroups(view: AtlasView, category: CategoryKey, items: CultureItem[], terms: SolarTerm[]) {
  const categoryItems = items.filter((item) => item.category === category)
  const termSeason = new Map(terms.map((term) => [term.name, term.season]))
  return viewGroups[view].map((group, groupIndex) => {
    const matched = categoryItems.filter((item) => view === 'time'
      ? termSeason.get(item.term) === group.key
      : view === 'dynasty'
        ? matchesDynasty(item.dynasty, group.key)
        : matchesRegion(item.region, group.key))
    const topics = categoryTopics[category].slice(groupIndex * 3, groupIndex * 3 + 3)
    const rawEntries = view === 'time' && category === 'food' ? foodTimeEntries[group.key] : Array.from({ length: 3 }, (_, index) => {
      const item = matched[index]
      if (item) return { title: item.title, summary: item.summary, image: item.image, to: `/item/${item.id}` }
      const title = topics[index]
      return { title, summary: `${title}应候而用，${categoryAction[category]}。`, image: group.image, to: atlasEntryPath(category, view, groupIndex, index) }
    })
    const entries = rawEntries.map((entry, entryIndex) => ({
      ...entry,
      to: entry.to ?? atlasEntryPath(category, view, groupIndex, entryIndex),
    }))
    const image = view === 'time' && category === 'food' ? foodSeasonImages[group.key] : group.image
    return { ...group, image, items: entries }
  })
}

export function getAtlasDetailItem(id: string | undefined, items: CultureItem[], terms: SolarTerm[]): CultureItem | undefined {
  if (!id) return undefined
  const match = /^atlas-(food|clothing|home|travel|work|leisure|custom|taboo)-(time|dynasty|region)-(\d+)-(\d+)$/.exec(id)
  if (!match) return undefined

  const category = match[1] as CategoryKey
  const view = match[2] as AtlasView
  const groupIndex = Number(match[3])
  const entryIndex = Number(match[4])
  const group = buildAtlasGroups(view, category, items, terms)[groupIndex]
  const entry = group?.items[entryIndex]
  if (!group || !entry) return undefined

  return {
    id,
    title: entry.title,
    category,
    term: view === 'time' ? `${group.label}季` : '四时',
    dynasty: view === 'dynasty' ? group.label : '历代',
    region: view === 'region' ? group.label : '多地',
    image: entry.image,
    summary: entry.summary,
    practice: `围绕“${entry.title}”，古人会结合${group.tagline}的环境特点安排日常。${categoryPractice[category]}`,
    reason: `${group.tagline}、${group.change}，生活方式也需要随之调整。${categoryReason[category]}`,
    source: '传统生活资料与节令民俗综合整理',
    sourceType: 'modern_research' as const,
    citation: '依据相关生活史、节令民俗与物质文化资料进行概括性整理。',
    evidenceLevel: 'D' as const,
  }
}

function matchesDynasty(value: string, key: string) {
  if (key === '先秦汉') return /先秦|汉/.test(value)
  if (key === '唐宋') return /唐|宋/.test(value)
  if (key === '明清') return /明|清/.test(value)
  return /历代|以来/.test(value)
}

function matchesRegion(value: string, key: string) {
  if (key === '多地') return /多地|各地|岭南|南方/.test(value)
  return value.includes(key)
}
