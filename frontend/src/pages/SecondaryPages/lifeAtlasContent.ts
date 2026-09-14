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

const foodTimeEntries: Record<string, { title: string; summary: string; image: string; to: string }[]> = {
  春: [
    { title: '春盘尝新', summary: '以时蔬入盘，迎接春天的生机。', image: '/images/atlas-food-spring-v1.jpg', to: '/item/lichun-spring-dish' },
    { title: '春茶', summary: '一杯新茶，唤醒春日的味觉。', image: '/images/tea-incense.png', to: '/search?q=%E6%98%A5%E8%8C%B6' },
    { title: '荠菜', summary: '春日野菜，清新可口。', image: '/images/atlas-food-spring-v1.jpg', to: '/search?q=%E8%8D%A0%E8%8F%9C' },
  ],
  夏: [
    { title: '消暑饮', summary: '以酸梅汤、绿豆汤解暑。', image: '/images/atlas-food-summer-v1.jpg', to: '/search?q=%E6%B6%88%E6%9A%91%E9%A5%AE' },
    { title: '瓜果', summary: '西瓜、香瓜，时令之味。', image: '/images/atlas-food-summer-v1.jpg', to: '/search?q=%E7%93%9C%E6%9E%9C' },
    { title: '伏日清饮', summary: '温凉有度，补水解渴。', image: '/images/atlas-food-summer-v1.jpg', to: '/item/dashu-herbal-tea' },
  ],
  秋: [
    { title: '秋梨', summary: '润燥养肺，秋日佳果。', image: '/images/atlas-food-autumn-v1.jpg', to: '/item/autumn-pear' },
    { title: '秋茶', summary: '茶性渐平，宜品清润之味。', image: '/images/tea-incense.png', to: '/item/bailu-tea' },
    { title: '蟹', summary: '菊黄蟹肥，秋日时鲜。', image: '/images/atlas-food-crab-v1.jpg', to: '/search?q=%E7%A7%8B%E8%9F%B9' },
  ],
  冬: [
    { title: '羊肉', summary: '温补御寒，冬日常食。', image: '/images/atlas-food-winter-v1.jpg', to: '/search?q=%E7%BE%8A%E8%82%89' },
    { title: '腊味', summary: '岁末腌藏，风味悠长。', image: '/images/atlas-food-cured-v1.jpg', to: '/search?q=%E8%85%8A%E5%91%B3' },
    { title: '暖酒', summary: '温酒驱寒，暖身安心。', image: '/images/tea-incense.png', to: '/search?q=%E6%9A%96%E9%85%92' },
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
    const entries = view === 'time' && category === 'food' ? foodTimeEntries[group.key] : Array.from({ length: 3 }, (_, index) => {
      const item = matched[index]
      if (item) return { title: item.title, summary: item.summary, image: item.image, to: `/item/${item.id}` }
      const title = topics[index]
      return { title, summary: `${title}应候而用，${categoryAction[category]}。`, image: group.image, to: `/search?q=${encodeURIComponent(title)}` }
    })
    const image = view === 'time' && category === 'food' ? foodSeasonImages[group.key] : group.image
    return { ...group, image, items: entries }
  })
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
