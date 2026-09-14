package database

import (
	"database/sql"
	"fmt"
	"strings"
)

type termSeed struct {
	slug, name, season, summary string
}

type itemSeed struct {
	slug, title, summary, category, practice, reason, history, image, term, dynasty, region, source string
	weight                                                                                          int
}

type storySeed struct {
	slug, title, category, summary, body, image string
	weight                                      int
}

var termSeeds = []termSeed{
	{"lichun", "立春", "spring", "东风解冻，万物起始"}, {"yushui", "雨水", "spring", "雨润新生，草木萌动"},
	{"jingzhe", "惊蛰", "spring", "春雷始鸣，蛰虫初醒"}, {"chunfen", "春分", "spring", "昼夜均分，燕归花开"},
	{"qingming", "清明", "spring", "气清景明，踏青思远"}, {"guyu", "谷雨", "spring", "雨生百谷，采茶正忙"},
	{"lixia", "立夏", "summer", "万物繁茂，暑意初生"}, {"xiaoman", "小满", "summer", "麦粒渐满，雨水充盈"},
	{"mangzhong", "芒种", "summer", "有芒之谷，可稼可种"}, {"xiazhi", "夏至", "summer", "日长之至，宜静心避暑"},
	{"xiaoshu", "小暑", "summer", "热气初盛，荷风送香"}, {"dashu", "大暑", "summer", "溽暑蒸腾，清凉为要"},
	{"liqiu", "立秋", "autumn", "凉风初至，暑热未消"}, {"chushu", "处暑", "autumn", "暑气渐退，新凉将生"},
	{"bailu", "白露", "autumn", "露凝而白，秋意渐深"}, {"qiufen", "秋分", "autumn", "昼夜再均，桂香满院"},
	{"hanlu", "寒露", "autumn", "露气寒冷，菊黄蟹肥"}, {"shuangjiang", "霜降", "autumn", "霜始降，草木归藏"},
	{"lidong", "立冬", "winter", "水始冰，万物收藏"}, {"xiaoxue", "小雪", "winter", "寒气渐盛，初雪将临"},
	{"daxue", "大雪", "winter", "仲冬雪盛，围炉温酒"}, {"dongzhi", "冬至", "winter", "阴极阳生，家人团聚"},
	{"xiaohan", "小寒", "winter", "雁北乡，梅香暗动"}, {"dahan", "大寒", "winter", "岁末极寒，静候新春"},
}

var itemSeeds = []itemSeed{
	{"bailu-tea", "饮白露茶", "以秋日新茶消解余暑，在清润茶香里迎接新凉。", "food", "白露前后，人们温器、投茶、注水，常与家人邻里共饮。", "秋季空气转燥，温热的淡茶既补充水分，也让身体从盛夏的贪凉中慢慢收束。", "唐代煎茶渐成风尚\n宋人点茶兼具雅趣\n明清散茶冲泡走入日常", "/images/tea-incense.png", "白露", "明清", "江南", "《茶疏》及江南地方岁时记述", 100},
	{"autumn-pear", "秋梨润燥", "梨在秋日成熟，以清甜水润回应季节的干燥。", "food", "古人取新熟之梨鲜食，也会蒸煮后佐以少量蜂蜜。", "白露后燥意渐显，水分充足的时令果物成为顺应季候的自然选择。", "", "/images/hero-bailu.png", "白露", "宋代", "中原", "历代本草与食疗文献相关条目", 90},
	{"autumn-clothes", "晨晚添衣", "昼暖夜凉，以轻薄夹衣应对一日温差。", "clothing", "清晨与夜间加一件薄夹衣，正午温暖时再酌情减去。", "昼夜温差加大后，分层穿着比骤然厚衣更便于身体适应。", "先秦已有按季更衣制度\n唐宋衣料更为多样\n明清夹衣形制趋于成熟", "/images/linen-hanfu.png", "白露", "宋代", "北方", "《东京梦华录》与服饰史资料", 85},
	{"dry-home", "清润居室", "收凉席、理庭院，在通风与避凉之间安顿居所。", "dwelling", "午后开窗通风，入夜及时闭合临风窗扇，并换上柔软衾褥。", "天气由湿热转向凉燥，居室需要保持空气流动，同时避免夜间寒露直侵。", "", "/images/tea-incense.png", "白露", "明清", "江南", "地方岁时记与传统起居经验", 80},
	{"autumn-walk", "湖山赏秋", "趁暑退风清，泛舟、登临，观看秋色初染。", "travel", "选择天朗风轻之日近郊登临，或携茶点泛舟湖上。", "初秋温度适宜，短途出行既舒展身心，也避开夜露渐重。", "", "/images/misty-boat.png", "白露", "宋代", "江南", "宋人笔记、诗词中的秋游记录", 70},
	{"autumn-harvest", "秋收晒谷", "趁晴收获、翻晒谷物，让一年的劳作稳妥入仓。", "work", "清晨露水稍干后开始收割，午后摊晒，傍晚及时归拢。", "秋季晴朗干燥的天气适合脱粒与储藏。", "", "/images/hero-bailu.png", "秋分", "历代", "中原", "传统农书与地方农事记录", 65},
	{"osmanthus-night", "桂下夜坐", "月色渐明，桂香初动，庭中小坐便成秋夜雅事。", "leisure", "晚饭后在庭院设小几，焚淡香、饮温茶、听虫声。", "秋夜清凉宜人，但露重渐寒，因此夜坐讲究适时而止。", "", "/images/tea-incense.png", "秋分", "宋代", "江南", "宋人诗词与园居笔记", 60},
	{"collect-dew", "收清露", "清晨承接草木露水，寄托对洁净与时序的想象。", "custom", "天未大亮时，以洁净器皿承取荷叶或花木上的露水。", "露水是白露最直观的物候，人们将自然现象转化成节令仪式。", "", "/images/misty-boat.png", "白露", "明清", "江南", "《本草纲目》及文人生活笔记", 55},
	{"avoid-night-dew", "不久坐夜露", "入夜露重，不在水边与空庭久坐。", "taboo", "日落后减少长时间户外停留，避免衣着单薄地坐卧石阶、草地与水边。", "地表散热后体感迅速转凉，湿冷环境更容易让人不适。", "", "/images/misty-boat.png", "白露", "历代", "各地", "传统养生文献与民间起居经验", 50},
	{"lichun-spring-dish", "春盘尝新", "以新蔬入盘，在一箸清鲜里迎接春天。", "food", "立春前后取初生蔬菜切细装盘，家人分食，以清鲜之味感知岁序更新。", "冬藏之后草木初萌，尝新把抽象的节气转化为可见、可食的春意。", "", "/images/hero-bailu.png", "立春", "唐宋以来", "多地", "中国非物质文化遗产网二十四节气专题及历代岁时资料", 48},
	{"yushui-irrigation", "检修沟渠", "雨意渐增，先理水路再候春耕。", "work", "农家查看田埂、沟渠与蓄水处，疏通淤塞，并依土壤湿度安排后续耕作。", "雨水增多会改变土壤墒情，及早理水既利灌溉，也能防止低处积涝。", "", "/images/misty-boat.png", "雨水", "历代", "农耕地区", "二十四节气农耕习俗与传统农事资料", 47},
	{"jingzhe-cleaning", "洒扫迎雷", "春雷将动，清理居室与庭院积尘。", "dwelling", "天气回暖后开窗换气，清扫冬季积尘，整理墙角、器具与储藏空间。", "虫类开始活动，湿度也逐渐上升，洒扫有助于让居住环境从冬藏转入春生。", "", "/images/tea-incense.png", "惊蛰", "历代", "多地", "二十四节气民俗研究与地方生活资料", 46},
	{"chunfen-routine", "昼夜均调作息", "昼夜近于均分，日常也转向舒展有序。", "dwelling", "随白昼增长略早起身，午后适度劳作或散步，入夜仍不过度晚睡。", "春分前后光照节律明显变化，顺着日长调整起居更便于安排劳作。", "", "/images/misty-boat.png", "春分", "历代", "多地", "二十四节气专题与传统起居资料", 45},
	{"qingming-outing", "扫墓踏青", "慎终追远，也在清明春色中亲近草木。", "custom", "家人整治墓地、祭告先人，也会趁气清景明结伴出游、折柳赏花。", "清明兼具节气与节日属性，把家族记忆和春日户外活动连接在同一时段。", "", "/images/misty-boat.png", "清明", "唐宋以来", "多地", "中国非物质文化遗产网与清明岁时资料", 49},
	{"guyu-spring-tea", "采制春茶", "雨润芽肥，把暮春新叶收入茶篓。", "work", "清晨露水稍收后采摘嫩芽，及时摊放、杀青与干燥，避免鲜叶久置。", "谷雨前后气温与降水利于茶芽生长，采制节奏需要紧随叶片状态。", "", "/images/tea-incense.png", "谷雨", "历代", "南方茶区", "二十四节气专题与传统制茶资料", 48},
	{"lixia-taste-fresh", "立夏尝新", "新麦与鲜蔬登场，饮食由春入夏。", "food", "取当季新熟谷物、豆类或瓜蔬入馔，少量多样，与家人共同尝鲜。", "初夏物产渐丰，尝新既标记季节转换，也回应劳作收获。", "", "/images/hero-bailu.png", "立夏", "历代", "多地", "二十四节气民俗与地方岁时资料", 47},
	{"xiaoman-tend-grain", "看麦理田", "籽粒渐满，细察水分与风雨。", "work", "查看麦穗成熟程度和田间水分，清理杂草，并为收获准备工具与晒场。", "小满意味着作物将熟未熟，雨水多少直接影响灌浆与收成。", "", "/images/hero-bailu.png", "小满", "历代", "北方农区", "二十四节气农耕习俗与传统农书资料", 46},
	{"mangzhong-busy-fields", "抢收抢种", "有芒之谷可种，田间进入繁忙时段。", "work", "晴时收割成熟麦作，雨后及时播种或插秧，家人按天气分工协作。", "成熟、降雨与播种窗口集中相遇，劳作必须随天时快速转换。", "", "/images/hero-bailu.png", "芒种", "历代", "农耕地区", "二十四节气农耕习俗与传统农事资料", 49},
	{"xiazhi-noodles", "夏至食面", "新麦入食，以清简面食度过长日。", "food", "以新麦磨粉制面，搭配时蔬与清淡浇头，热食或凉拌因地域而异。", "夏至前后新麦收成，面食既顺应物产，也适合暑热初盛时简便进食。", "", "/images/tea-incense.png", "夏至", "历代", "北方为主", "二十四节气民俗与地方饮食资料", 48},
	{"xiaoshu-bamboo-mat", "铺席纳凉", "暑热初盛，让竹席与穿堂风带走热意。", "dwelling", "擦拭晾干竹席后铺于通风处，日间遮阳，傍晚开窗引风，并避开潮湿地面。", "小暑气温升高，利用材质触感与空气流动是低耗而直接的降温方式。", "", "/images/linen-hanfu.png", "小暑", "历代", "多地", "传统起居资料与夏季生活记述", 46},
	{"dashu-herbal-tea", "伏日清饮", "暑湿交织，以温凉有度的饮品补水解渴。", "food", "取茶叶或地方常用植物煎煮清饮，放至温凉后少量频饮，不一味追求冰冷。", "大暑出汗增多，持续补水比短时贪凉更符合日常需要。", "", "/images/tea-incense.png", "大暑", "历代", "多地", "二十四节气民俗与地方消暑资料", 45},
	{"liqiu-autumn-fruit", "尝秋果", "暑意未尽，瓜果先带来秋收消息。", "food", "选择成熟瓜果与新收食物尝鲜，饮食仍以清爽为主，不骤然改为厚味。", "立秋是季节信号而非立即转凉，尝新比急于进补更贴合实际气候。", "", "/images/hero-bailu.png", "立秋", "历代", "多地", "二十四节气民俗与地方岁时资料", 45},
	{"chushu-air-bedding", "晾晒收席", "暑气渐退，整理盛夏寝具与居室。", "dwelling", "择晴日晾晒席、被与衣物，清理潮气，夜间根据温差逐步换用柔软寝具。", "处暑后湿热开始退场，但昼夜变化不一，分阶段收整更稳妥。", "", "/images/linen-hanfu.png", "处暑", "历代", "多地", "传统起居经验与地方岁时资料", 46},
	{"hanlu-chrysanthemum", "赏菊登临", "露气转寒，在清朗秋色里适度游赏。", "leisure", "选择晴朗白日近郊登高或庭中赏菊，携带温茶与薄衣，并在入夜前归家。", "寒露时秋色渐深、空气清明，但早晚寒意明显，游赏讲究适时而止。", "", "/images/misty-boat.png", "寒露", "唐宋以来", "多地", "历代诗词、岁时记与节气民俗资料", 47},
	{"shuangjiang-winter-clothes", "整备寒衣", "霜意将至，把御寒衣被提前理好。", "clothing", "拆洗、晾晒并缝补夹衣与厚被，按家人所需分层收纳，便于气温骤降时取用。", "霜降前后冷空气活动增多，提前整备可避免临寒仓促。", "", "/images/linen-hanfu.png", "霜降", "历代", "多地", "传统服饰史与秋冬起居资料", 46},
	{"lidong-store-home", "闭藏居室", "由秋收转入冬藏，居所也开始防风保温。", "dwelling", "检查门窗缝隙，收妥易受冻器物，调整床榻与火具位置，同时保留适度通风。", "立冬后风寒渐增，居室从通透纳凉转向防风蓄暖。", "", "/images/tea-incense.png", "立冬", "历代", "多地", "二十四节气民俗与传统起居资料", 47},
	{"xiaoxue-preserve-food", "腌藏冬蔬", "初寒渐稳，把耐藏蔬菜加工留存。", "custom", "择晴冷天气清洗晾干蔬菜，再以盐渍、风干等方式保存，做法依地域与物产而异。", "低温减少腐败风险，腌藏也为冬季物产减少时预备食材。", "", "/images/hero-bailu.png", "小雪", "历代", "多地", "地方岁时资料与传统食物保存经验", 45},
	{"daxue-warm-stove", "围炉温饮", "雪意渐浓，围炉小坐成为冬日家常。", "leisure", "在通风安全处设炉取暖，温水煮茶，与家人短坐交谈，临睡前妥善熄火。", "大雪时节寒冷加深，共享一处暖源既节省燃料，也让室内活动更加集中。", "", "/images/tea-incense.png", "大雪", "历代", "多地", "历代冬日生活记述与地方岁时资料", 46},
	{"dongzhi-family-meal", "冬至团聚", "日影最长处，以一餐温食确认岁序转折。", "custom", "家人备办当地常见面食、汤食或肉食共同进餐，具体食物随地域而异。", "冬至是重要历法节点，团聚与温食把天文时点转化为家庭生活仪式。", "", "/images/tea-incense.png", "冬至", "历代", "多地", "中国非物质文化遗产网二十四节气专题及地方冬至资料", 49},
	{"xiaohan-layered-clothes", "重衣护寒", "寒意深重，以多层衣物守住身体暖意。", "clothing", "内层贴身吸湿，中层蓄暖，外层挡风，手足与头颈也根据出行需要加护。", "小寒常处于一年低温时段，分层穿着方便在室内外之间调节。", "", "/images/linen-hanfu.png", "小寒", "历代", "多地", "传统服饰与冬季起居资料", 46},
	{"dahan-clean-for-year", "扫尘备岁", "岁末极寒，也开始为新年整理家宅。", "custom", "择日清扫屋舍、整理器具与储物，检点年节所需，让一家人在冬藏中准备更新。", "大寒接近岁末，清洁与备物把季节收尾转化为家庭秩序的更新。", "", "/images/tea-incense.png", "大寒", "历代", "多地", "二十四节气民俗与岁末生活资料", 48},
}

var storySeeds = []storySeed{
	{"autumn-meaning", "为什么秋天在古人生活中如此重要？", "俗", "从收获、礼仪到诗意，理解秋天如何塑造古人的时间观。", "秋天不仅是一种景色，更是一年劳作是否有收获的答案。\n古人由物候感知时间，也借登高、赏月、饮茶等活动安顿情绪。", "/images/hero-bailu.png", 100},
	{"summer-night", "宋代人怎么度过一个夏夜？", "居", "竹席、冰鉴、荷风与夜市，组成一幅鲜活的消夏图。", "白日暑气退去后，城市夜市与庭院生活才渐渐活跃。\n富贵之家或用冰鉴送凉，普通人则依靠穿堂风、井水与植物荫影调节居住环境。", "/images/misty-boat.png", 90},
	{"tea-four-seasons", "一杯茶里的四时变化", "食", "春尝鲜、夏取清、秋求润、冬宜温，茶事随四季而变。", "同是一杯茶，在不同季节承担着不同角色。\n茶叶、用水、器具与饮用时间的变化，共同构成了古人细腻的四时生活。", "/images/tea-incense.png", 80},
}

func seedContent(db *sql.DB) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	for index, term := range termSeeds {
		if _, err := tx.Exec(`INSERT INTO solar_terms(slug,name,season,sequence,summary) VALUES(?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,season=excluded.season,sequence=excluded.sequence,summary=excluded.summary`, term.slug, term.name, term.season, index+1, term.summary); err != nil {
			return fmt.Errorf("seed term %s: %w", term.slug, err)
		}
	}
	for _, item := range itemSeeds {
		if err := seedItem(tx, item); err != nil {
			return err
		}
	}
	for _, story := range storySeeds {
		if _, err := tx.Exec(`INSERT INTO stories(slug,title,category,summary,body,cover_image,featured_weight,status) VALUES(?,?,?,?,?,?,?,'published') ON CONFLICT(slug) DO UPDATE SET title=excluded.title,category=excluded.category,summary=excluded.summary,body=excluded.body,cover_image=excluded.cover_image,featured_weight=excluded.featured_weight,status='published'`, story.slug, story.title, story.category, story.summary, story.body, story.image, story.weight); err != nil {
			return fmt.Errorf("seed story %s: %w", story.slug, err)
		}
	}
	return tx.Commit()
}

func seedItem(tx *sql.Tx, item itemSeed) error {
	if item.weight < 50 {
		item.image = seasonalImage(item.term)
	}
	evidence := evidenceLevel(item.slug)
	_, err := tx.Exec(`INSERT INTO culture_items(slug,title,summary,category,practice,reason,historical_change,cover_image,evidence_level,featured_weight,status) VALUES(?,?,?,?,?,?,?,?,?,?, 'published') ON CONFLICT(slug) DO UPDATE SET title=excluded.title,summary=excluded.summary,category=excluded.category,practice=excluded.practice,reason=excluded.reason,historical_change=excluded.historical_change,cover_image=excluded.cover_image,evidence_level=excluded.evidence_level,featured_weight=excluded.featured_weight,status='published'`, item.slug, item.title, item.summary, item.category, item.practice, item.reason, item.history, item.image, evidence, item.weight)
	if err != nil {
		return fmt.Errorf("seed item %s: %w", item.slug, err)
	}
	var itemID, termID int64
	if err := tx.QueryRow(`SELECT id FROM culture_items WHERE slug=?`, item.slug).Scan(&itemID); err != nil {
		return err
	}
	if err := tx.QueryRow(`SELECT id FROM solar_terms WHERE name=?`, item.term).Scan(&termID); err != nil {
		return err
	}
	if _, err := tx.Exec(`INSERT OR REPLACE INTO culture_item_solar_terms(culture_item_id,solar_term_id,relevance) VALUES(?,?,100)`, itemID, termID); err != nil {
		return err
	}
	for _, tag := range []struct{ kind, slug, name string }{{"period", strings.ToLower(item.dynasty), item.dynasty}, {"region", strings.ToLower(item.region), item.region}} {
		if _, err := tx.Exec(`INSERT OR IGNORE INTO tags(type,slug,name) VALUES(?,?,?)`, tag.kind, tag.slug, tag.name); err != nil {
			return err
		}
		var tagID int64
		if err := tx.QueryRow(`SELECT id FROM tags WHERE type=? AND slug=?`, tag.kind, tag.slug).Scan(&tagID); err != nil {
			return err
		}
		if _, err := tx.Exec(`INSERT OR IGNORE INTO culture_item_tags(culture_item_id,tag_id) VALUES(?,?)`, itemID, tagID); err != nil {
			return err
		}
	}
	sourceType := classifySource(item.source)
	if _, err := tx.Exec(`INSERT INTO sources(culture_item_id,title,citation,source_type) SELECT ?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM sources WHERE culture_item_id=? AND title=?)`, itemID, item.source, item.source, sourceType, itemID, item.source); err != nil {
		return err
	}
	if _, err := tx.Exec(`UPDATE sources SET citation=?,source_type=? WHERE culture_item_id=? AND title=?`, item.source, sourceType, itemID, item.source); err != nil {
		return err
	}
	return nil
}

func seasonalImage(term string) string {
	switch term {
	case "立春", "雨水", "惊蛰", "春分", "清明", "谷雨":
		return "/images/season-spring-v1.jpg"
	case "立夏", "小满", "芒种", "夏至", "小暑", "大暑":
		return "/images/season-summer-v1.jpg"
	case "立秋", "处暑", "白露", "秋分", "寒露", "霜降":
		return "/images/season-autumn-v1.jpg"
	default:
		return "/images/season-winter-v1.jpg"
	}
}

func evidenceLevel(slug string) string {
	switch slug {
	case "bailu-tea", "autumn-clothes", "collect-dew", "lichun-spring-dish", "qingming-outing", "mangzhong-busy-fields", "dongzhi-family-meal":
		return "B"
	default:
		return "C"
	}
}

func classifySource(source string) string {
	switch {
	case strings.Contains(source, "本草") || strings.Contains(source, "农书") || strings.HasPrefix(source, "《"):
		return "historical_document"
	case strings.Contains(source, "诗词") || strings.Contains(source, "笔记") || strings.Contains(source, "岁时"):
		return "literary_record"
	case strings.Contains(source, "资料") || strings.Contains(source, "研究"):
		return "modern_research"
	default:
		return "living_tradition"
	}
}
