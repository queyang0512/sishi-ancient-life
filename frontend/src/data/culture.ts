export type CategoryKey = 'food' | 'clothing' | 'home' | 'travel' | 'work' | 'leisure' | 'custom' | 'taboo'

export const categories: { key: CategoryKey; label: string; intro: string }[] = [
  { key: 'food', label: '食', intro: '饮食不仅满足口腹，也是古人顺应四时的重要方式。' },
  { key: 'clothing', label: '衣', intro: '衣着随寒暑增减，也映照礼制、工艺与生活审美。' },
  { key: 'home', label: '居', intro: '居住之道关乎通风、采光、避暑与御寒。' },
  { key: 'travel', label: '行', intro: '舟车与步履之间，古人用自己的方式丈量山河。' },
  { key: 'work', label: '作', intro: '耕作依循天时，每一次劳作都有明确的季节。' },
  { key: 'leisure', label: '乐', intro: '赏花、听雨、夜游，闲情也是古代日常的一部分。' },
  { key: 'custom', label: '俗', intro: '节令习俗把自然变化变成共同的生活记忆。' },
  { key: 'taboo', label: '忌', intro: '谨慎避忌背后，是古人对身体与环境的长期观察。' },
]

export const solarTerms = [
  ['lichun', '立春', '春', '东风解冻，万物起始'], ['yushui', '雨水', '春', '雨润新生，草木萌动'],
  ['jingzhe', '惊蛰', '春', '春雷始鸣，蛰虫初醒'], ['chunfen', '春分', '春', '昼夜均分，燕归花开'],
  ['qingming', '清明', '春', '气清景明，踏青思远'], ['guyu', '谷雨', '春', '雨生百谷，采茶正忙'],
  ['lixia', '立夏', '夏', '万物繁茂，暑意初生'], ['xiaoman', '小满', '夏', '麦粒渐满，雨水充盈'],
  ['mangzhong', '芒种', '夏', '有芒之谷，可稼可种'], ['xiazhi', '夏至', '夏', '日长之至，宜静心避暑'],
  ['xiaoshu', '小暑', '夏', '热气初盛，荷风送香'], ['dashu', '大暑', '夏', '溽暑蒸腾，清凉为要'],
  ['liqiu', '立秋', '秋', '凉风初至，暑热未消'], ['chushu', '处暑', '秋', '暑气渐退，新凉将生'],
  ['bailu', '白露', '秋', '露凝而白，秋意渐深'], ['qiufen', '秋分', '秋', '昼夜再均，桂香满院'],
  ['hanlu', '寒露', '秋', '露气寒冷，菊黄蟹肥'], ['shuangjiang', '霜降', '秋', '霜始降，草木归藏'],
  ['lidong', '立冬', '冬', '水始冰，万物收藏'], ['xiaoxue', '小雪', '冬', '寒气渐盛，初雪将临'],
  ['daxue', '大雪', '冬', '仲冬雪盛，围炉温酒'], ['dongzhi', '冬至', '冬', '阴极阳生，家人团聚'],
  ['xiaohan', '小寒', '冬', '雁北乡，梅香暗动'], ['dahan', '大寒', '冬', '岁末极寒，静候新春'],
].map(([slug, name, season, summary]) => ({ slug, name, season, summary }))

export const cultureItems = [
  { id: 'bailu-tea', title: '饮白露茶', category: 'food' as CategoryKey, term: '白露', dynasty: '明清', region: '江南', image: '/images/tea-incense.png', summary: '以秋日新茶消解余暑，在清润茶香里迎接新凉。', practice: '白露前后，人们采摘经夏日暑气淬炼的茶叶，温器、投茶、注水，常与家人邻里共饮。茶汤不求浓烈，取其温润清香。', reason: '秋季空气转燥，温热的淡茶既补充水分，也让身体从盛夏的贪凉中慢慢收束。', history: ['唐代煎茶渐成风尚', '宋人点茶兼具雅趣', '明清散茶冲泡走入日常'], source: '《茶疏》及江南地方岁时记述' },
  { id: 'autumn-pear', title: '秋梨润燥', category: 'food' as CategoryKey, term: '白露', dynasty: '宋代', region: '中原', image: '/images/hero-bailu.png', summary: '梨在秋日成熟，以清甜水润回应季节的干燥。', practice: '古人取新熟之梨鲜食，也会蒸煮后佐以少量蜂蜜。老人孩童多食熟梨，以求温和。', reason: '白露后燥意渐显，水分充足的时令果物成为顺应季候的自然选择。', source: '历代本草与食疗文献相关条目' },
  { id: 'autumn-clothes', title: '晨晚添衣', category: 'clothing' as CategoryKey, term: '白露', dynasty: '宋代', region: '北方', image: '/images/linen-hanfu.png', summary: '昼暖夜凉，以轻薄夹衣应对一日温差。', practice: '清晨与夜间加一件薄夹衣，正午温暖时再酌情减去。材质多选细麻、葛与初秋夹纱。', reason: '昼夜温差加大后，分层穿着比骤然厚衣更便于身体适应。', history: ['先秦已有按季更衣制度', '唐宋衣料更为多样', '明清夹衣形制趋于成熟'], source: '《东京梦华录》与服饰史资料' },
  { id: 'dry-home', title: '清润居室', category: 'home' as CategoryKey, term: '白露', dynasty: '明清', region: '江南', image: '/images/tea-incense.png', summary: '收凉席、理庭院，在通风与避凉之间安顿居所。', practice: '午后开窗通风，入夜及时闭合临风窗扇；撤去盛夏竹席，换上柔软衾褥，并在案头置清水与时令花枝。', reason: '天气由湿热转向凉燥，居室需要保持空气流动，同时避免夜间寒露直侵。', source: '地方岁时记与传统起居经验' },
  { id: 'autumn-walk', title: '湖山赏秋', category: 'travel' as CategoryKey, term: '白露', dynasty: '宋代', region: '江南', image: '/images/misty-boat.png', summary: '趁暑退风清，泛舟、登临，观看秋色初染。', practice: '士人与家人选择天朗风轻之日近郊登临，或携茶点泛舟湖上，不赶远途，以半日闲游为宜。', reason: '初秋温度适宜，山水清澄，短途出行既舒展身心，也避开夜露渐重。', source: '宋人笔记、诗词中的秋游记录' },
  { id: 'autumn-harvest', title: '秋收晒谷', category: 'work' as CategoryKey, term: '秋分', dynasty: '历代', region: '中原', image: '/images/hero-bailu.png', summary: '趁晴收获、翻晒谷物，让一年的劳作稳妥入仓。', practice: '清晨露水稍干后开始收割，午后摊晒，傍晚及时归拢，防止夜露返潮。', reason: '秋季晴朗干燥的天气适合脱粒与储藏，劳作节奏直接响应湿度变化。', source: '传统农书与地方农事记录' },
  { id: 'osmanthus-night', title: '桂下夜坐', category: 'leisure' as CategoryKey, term: '秋分', dynasty: '宋代', region: '江南', image: '/images/tea-incense.png', summary: '月色渐明，桂香初动，庭中小坐便成秋夜雅事。', practice: '晚饭后在庭院设小几，焚淡香、饮温茶、听虫声，不必宴饮，也自有清趣。', reason: '秋夜清凉宜人，但露重渐寒，因此夜坐讲究适时而止。', source: '宋人诗词与园居笔记' },
  { id: 'collect-dew', title: '收清露', category: 'custom' as CategoryKey, term: '白露', dynasty: '明清', region: '江南', image: '/images/misty-boat.png', summary: '清晨承接草木露水，寄托对洁净与时序的想象。', practice: '天未大亮时，以洁净器皿承取荷叶或花木上的露水，用于煮茶或调墨。', reason: '露水是白露最直观的物候，人们将自然现象转化成富有诗意的节令仪式。', source: '《本草纲目》及文人生活笔记' },
  { id: 'avoid-night-dew', title: '不久坐夜露', category: 'taboo' as CategoryKey, term: '白露', dynasty: '历代', region: '各地', image: '/images/misty-boat.png', summary: '入夜露重，不在水边与空庭久坐。', practice: '日落后减少长时间户外停留，尤其避免衣着单薄地坐卧石阶、草地与水边。', reason: '地表散热后体感迅速转凉，湿冷环境更容易让人不适。', source: '传统养生文献与民间起居经验' },
  { id: 'lichun-spring-dish', title: '春盘尝新', category: 'food' as CategoryKey, term: '立春', dynasty: '唐宋以来', region: '多地', image: '/images/hero-bailu.png', summary: '以新蔬入盘，在一箸清鲜里迎接春天。', practice: '立春前后取初生蔬菜切细装盘，家人分食，以清鲜之味感知岁序更新。', reason: '冬藏之后草木初萌，尝新把抽象的节气转化为可见、可食的春意。', source: '中国非物质文化遗产网二十四节气专题及历代岁时资料' },
  { id: 'yushui-irrigation', title: '检修沟渠', category: 'work' as CategoryKey, term: '雨水', dynasty: '历代', region: '农耕地区', image: '/images/misty-boat.png', summary: '雨意渐增，先理水路再候春耕。', practice: '农家查看田埂、沟渠与蓄水处，疏通淤塞，并依土壤湿度安排后续耕作。', reason: '雨水增多会改变土壤墒情，及早理水既利灌溉，也能防止低处积涝。', source: '二十四节气农耕习俗与传统农事资料' },
  { id: 'jingzhe-cleaning', title: '洒扫迎雷', category: 'home' as CategoryKey, term: '惊蛰', dynasty: '历代', region: '多地', image: '/images/tea-incense.png', summary: '春雷将动，清理居室与庭院积尘。', practice: '天气回暖后开窗换气，清扫冬季积尘，整理墙角、器具与储藏空间。', reason: '虫类开始活动，湿度也逐渐上升，洒扫有助于让居住环境从冬藏转入春生。', source: '二十四节气民俗研究与地方生活资料' },
  { id: 'chunfen-routine', title: '昼夜均调作息', category: 'home' as CategoryKey, term: '春分', dynasty: '历代', region: '多地', image: '/images/misty-boat.png', summary: '昼夜近于均分，日常也转向舒展有序。', practice: '随白昼增长略早起身，午后适度劳作或散步，入夜仍不过度晚睡。', reason: '春分前后光照节律明显变化，顺着日长调整起居更便于安排劳作。', source: '二十四节气专题与传统起居资料' },
  { id: 'qingming-outing', title: '扫墓踏青', category: 'custom' as CategoryKey, term: '清明', dynasty: '唐宋以来', region: '多地', image: '/images/misty-boat.png', summary: '慎终追远，也在清明春色中亲近草木。', practice: '家人整治墓地、祭告先人，也会趁气清景明结伴出游、折柳赏花。', reason: '清明兼具节气与节日属性，把家族记忆和春日户外活动连接在同一时段。', source: '中国非物质文化遗产网与清明岁时资料' },
  { id: 'guyu-spring-tea', title: '采制春茶', category: 'work' as CategoryKey, term: '谷雨', dynasty: '历代', region: '南方茶区', image: '/images/tea-incense.png', summary: '雨润芽肥，把暮春新叶收入茶篓。', practice: '清晨露水稍收后采摘嫩芽，及时摊放、杀青与干燥，避免鲜叶久置。', reason: '谷雨前后气温与降水利于茶芽生长，采制节奏需要紧随叶片状态。', source: '二十四节气专题与传统制茶资料' },
  { id: 'lixia-taste-fresh', title: '立夏尝新', category: 'food' as CategoryKey, term: '立夏', dynasty: '历代', region: '多地', image: '/images/hero-bailu.png', summary: '新麦与鲜蔬登场，饮食由春入夏。', practice: '取当季新熟谷物、豆类或瓜蔬入馔，少量多样，与家人共同尝鲜。', reason: '初夏物产渐丰，尝新既标记季节转换，也回应劳作收获。', source: '二十四节气民俗与地方岁时资料' },
  { id: 'xiaoman-tend-grain', title: '看麦理田', category: 'work' as CategoryKey, term: '小满', dynasty: '历代', region: '北方农区', image: '/images/hero-bailu.png', summary: '籽粒渐满，细察水分与风雨。', practice: '查看麦穗成熟程度和田间水分，清理杂草，并为收获准备工具与晒场。', reason: '小满意味着作物将熟未熟，雨水多少直接影响灌浆与收成。', source: '二十四节气农耕习俗与传统农书资料' },
  { id: 'mangzhong-busy-fields', title: '抢收抢种', category: 'work' as CategoryKey, term: '芒种', dynasty: '历代', region: '农耕地区', image: '/images/hero-bailu.png', summary: '有芒之谷可种，田间进入繁忙时段。', practice: '晴时收割成熟麦作，雨后及时播种或插秧，家人按天气分工协作。', reason: '成熟、降雨与播种窗口集中相遇，劳作必须随天时快速转换。', source: '二十四节气农耕习俗与传统农事资料' },
  { id: 'xiazhi-noodles', title: '夏至食面', category: 'food' as CategoryKey, term: '夏至', dynasty: '历代', region: '北方为主', image: '/images/tea-incense.png', summary: '新麦入食，以清简面食度过长日。', practice: '以新麦磨粉制面，搭配时蔬与清淡浇头，热食或凉拌因地域而异。', reason: '夏至前后新麦收成，面食既顺应物产，也适合暑热初盛时简便进食。', source: '二十四节气民俗与地方饮食资料' },
  { id: 'xiaoshu-bamboo-mat', title: '铺席纳凉', category: 'home' as CategoryKey, term: '小暑', dynasty: '历代', region: '多地', image: '/images/linen-hanfu.png', summary: '暑热初盛，让竹席与穿堂风带走热意。', practice: '擦拭晾干竹席后铺于通风处，日间遮阳，傍晚开窗引风，并避开潮湿地面。', reason: '小暑气温升高，利用材质触感与空气流动是低耗而直接的降温方式。', source: '传统起居资料与夏季生活记述' },
  { id: 'dashu-herbal-tea', title: '伏日清饮', category: 'food' as CategoryKey, term: '大暑', dynasty: '历代', region: '多地', image: '/images/tea-incense.png', summary: '暑湿交织，以温凉有度的饮品补水解渴。', practice: '取茶叶或地方常用植物煎煮清饮，放至温凉后少量频饮，不一味追求冰冷。', reason: '大暑出汗增多，持续补水比短时贪凉更符合日常需要。', source: '二十四节气民俗与地方消暑资料' },
  { id: 'liqiu-autumn-fruit', title: '尝秋果', category: 'food' as CategoryKey, term: '立秋', dynasty: '历代', region: '多地', image: '/images/hero-bailu.png', summary: '暑意未尽，瓜果先带来秋收消息。', practice: '选择成熟瓜果与新收食物尝鲜，饮食仍以清爽为主，不骤然改为厚味。', reason: '立秋是季节信号而非立即转凉，尝新比急于进补更贴合实际气候。', source: '二十四节气民俗与地方岁时资料' },
  { id: 'chushu-air-bedding', title: '晾晒收席', category: 'home' as CategoryKey, term: '处暑', dynasty: '历代', region: '多地', image: '/images/linen-hanfu.png', summary: '暑气渐退，整理盛夏寝具与居室。', practice: '择晴日晾晒席、被与衣物，清理潮气，夜间根据温差逐步换用柔软寝具。', reason: '处暑后湿热开始退场，但昼夜变化不一，分阶段收整更稳妥。', source: '传统起居经验与地方岁时资料' },
  { id: 'hanlu-chrysanthemum', title: '赏菊登临', category: 'leisure' as CategoryKey, term: '寒露', dynasty: '唐宋以来', region: '多地', image: '/images/misty-boat.png', summary: '露气转寒，在清朗秋色里适度游赏。', practice: '选择晴朗白日近郊登高或庭中赏菊，携带温茶与薄衣，并在入夜前归家。', reason: '寒露时秋色渐深、空气清明，但早晚寒意明显，游赏讲究适时而止。', source: '历代诗词、岁时记与节气民俗资料' },
  { id: 'shuangjiang-winter-clothes', title: '整备寒衣', category: 'clothing' as CategoryKey, term: '霜降', dynasty: '历代', region: '多地', image: '/images/linen-hanfu.png', summary: '霜意将至，把御寒衣被提前理好。', practice: '拆洗、晾晒并缝补夹衣与厚被，按家人所需分层收纳，便于气温骤降时取用。', reason: '霜降前后冷空气活动增多，提前整备可避免临寒仓促。', source: '传统服饰史与秋冬起居资料' },
  { id: 'lidong-store-home', title: '闭藏居室', category: 'home' as CategoryKey, term: '立冬', dynasty: '历代', region: '多地', image: '/images/tea-incense.png', summary: '由秋收转入冬藏，居所也开始防风保温。', practice: '检查门窗缝隙，收妥易受冻器物，调整床榻与火具位置，同时保留适度通风。', reason: '立冬后风寒渐增，居室从通透纳凉转向防风蓄暖。', source: '二十四节气民俗与传统起居资料' },
  { id: 'xiaoxue-preserve-food', title: '腌藏冬蔬', category: 'custom' as CategoryKey, term: '小雪', dynasty: '历代', region: '多地', image: '/images/hero-bailu.png', summary: '初寒渐稳，把耐藏蔬菜加工留存。', practice: '择晴冷天气清洗晾干蔬菜，再以盐渍、风干等方式保存，做法依地域与物产而异。', reason: '低温减少腐败风险，腌藏也为冬季物产减少时预备食材。', source: '地方岁时资料与传统食物保存经验' },
  { id: 'daxue-warm-stove', title: '围炉温饮', category: 'leisure' as CategoryKey, term: '大雪', dynasty: '历代', region: '多地', image: '/images/tea-incense.png', summary: '雪意渐浓，围炉小坐成为冬日家常。', practice: '在通风安全处设炉取暖，温水煮茶，与家人短坐交谈，临睡前妥善熄火。', reason: '大雪时节寒冷加深，共享一处暖源既节省燃料，也让室内活动更加集中。', source: '历代冬日生活记述与地方岁时资料' },
  { id: 'dongzhi-family-meal', title: '冬至团聚', category: 'custom' as CategoryKey, term: '冬至', dynasty: '历代', region: '多地', image: '/images/tea-incense.png', summary: '日影最长处，以一餐温食确认岁序转折。', practice: '家人备办当地常见面食、汤食或肉食共同进餐，具体食物随地域而异。', reason: '冬至是重要历法节点，团聚与温食把天文时点转化为家庭生活仪式。', source: '中国非物质文化遗产网二十四节气专题及地方冬至资料' },
  { id: 'xiaohan-layered-clothes', title: '重衣护寒', category: 'clothing' as CategoryKey, term: '小寒', dynasty: '历代', region: '多地', image: '/images/linen-hanfu.png', summary: '寒意深重，以多层衣物守住身体暖意。', practice: '内层贴身吸湿，中层蓄暖，外层挡风，手足与头颈也根据出行需要加护。', reason: '小寒常处于一年低温时段，分层穿着方便在室内外之间调节。', source: '传统服饰与冬季起居资料' },
  { id: 'dahan-clean-for-year', title: '扫尘备岁', category: 'custom' as CategoryKey, term: '大寒', dynasty: '历代', region: '多地', image: '/images/tea-incense.png', summary: '岁末极寒，也开始为新年整理家宅。', practice: '择日清扫屋舍、整理器具与储物，检点年节所需，让一家人在冬藏中准备更新。', reason: '大寒接近岁末，清洁与备物把季节收尾转化为家庭秩序的更新。', source: '二十四节气民俗与岁末生活资料' },
]

export const stories = [
  { id: 'autumn-meaning', title: '为什么秋天在古人生活中如此重要？', category: '俗', summary: '从收获、礼仪到诗意，理解秋天如何塑造古人的时间观。', image: '/images/hero-bailu.png', body: ['秋天不仅是一种景色，更是一年劳作是否有收获的答案。谷物入仓、衣物换季、居室收整，都在这个季节集中发生。', '古人由物候感知时间，也借登高、赏月、饮茶等活动安顿情绪。肃杀与丰收并存，使秋天成为传统文化中层次最丰富的季节之一。'] },
  { id: 'summer-night', title: '宋代人怎么度过一个夏夜？', category: '居', summary: '竹席、冰鉴、荷风与夜市，组成一幅鲜活的消夏图。', image: '/images/misty-boat.png', body: ['白日暑气退去后，城市夜市与庭院生活才渐渐活跃。人们移榻近水，铺竹席、摇团扇，听更漏也听市声。', '富贵之家或用冰鉴送凉，普通人则依靠穿堂风、井水与植物荫影调节居住环境。'] },
  { id: 'tea-four-seasons', title: '一杯茶里的四时变化', category: '食', summary: '春尝鲜、夏取清、秋求润、冬宜温，茶事随四季而变。', image: '/images/tea-incense.png', body: ['同是一杯茶，在不同季节承担着不同角色。春茶贵新，夏茶求清，秋茶取香润，冬日则讲究温器慢饮。', '茶叶、用水、器具与饮用时间的变化，共同构成了古人细腻的四时生活。'] },
]

export const getTerm = (slug?: string) => solarTerms.find((term) => term.slug === slug) ?? solarTerms[14]
export const getCategory = (key?: string) => categories.find((category) => category.key === key) ?? categories[0]

const termBoundaries = [
  [105,'xiaohan'],[120,'dahan'],[204,'lichun'],[219,'yushui'],[305,'jingzhe'],[320,'chunfen'],
  [404,'qingming'],[420,'guyu'],[505,'lixia'],[521,'xiaoman'],[605,'mangzhong'],[621,'xiazhi'],
  [707,'xiaoshu'],[723,'dashu'],[807,'liqiu'],[823,'chushu'],[907,'bailu'],[923,'qiufen'],
  [1008,'hanlu'],[1023,'shuangjiang'],[1107,'lidong'],[1122,'xiaoxue'],[1207,'daxue'],[1222,'dongzhi'],
] as const

// 临时预览立春；确认效果后改回 null，恢复按真实日期自动判断。
const contentPreviewDate: Date | null = new Date(2026, 1, 4)

export function getCurrentSeasonalContext(date = contentPreviewDate ?? new Date()) {
  const value = (date.getMonth() + 1) * 100 + date.getDate()
  let slug = value < 105 ? 'dongzhi' : 'xiaohan'
  for (const [boundary, candidate] of termBoundaries) if (value >= boundary) slug = candidate
  const term = getTerm(slug)
  const dateLabel = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).replaceAll('/', '.')
  const lunarLabel = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long', day: 'numeric' }).format(date)
  return { term, dateLabel, lunarLabel }
}




