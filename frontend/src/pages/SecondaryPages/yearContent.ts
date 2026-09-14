export type TermPreview = {
  phenology: string
  activities: string[]
  explanation: string
}

export const termPreviews: Record<string, TermPreview> = {
  lichun: { phenology: '东风解冻，草木初萌', activities: ['咬春', '剪春幡', '备耕'], explanation: '寒意尚未完全退去，日常开始由冬藏转向春生。' },
  yushui: { phenology: '细雨渐多，土脉润动', activities: ['接雨水', '理沟渠', '减厚衣'], explanation: '水汽增加，农事与居所都要先处理好湿润变化。' },
  jingzhe: { phenology: '春雷始鸣，蛰虫初醒', activities: ['洒扫', '松土', '防虫'], explanation: '气温回升、虫类活动，家宅与田地一同苏醒。' },
  chunfen: { phenology: '昼夜均分，燕归花开', activities: ['踏青', '晾晒', '调作息'], explanation: '白昼继续增长，劳作与起居逐渐舒展。' },
  qingming: { phenology: '气清景明，桐花初放', activities: ['扫墓', '踏青', '插柳'], explanation: '清明把追思先人与亲近春日草木放在同一时序里。' },
  guyu: { phenology: '雨生百谷，茶芽渐肥', activities: ['采春茶', '点豆', '护秧'], explanation: '暮春雨量与温度上升，农事进入细密而忙碌的阶段。' },
  lixia: { phenology: '蝼蝈鸣，万物繁茂', activities: ['尝新', '称人', '换轻衣'], explanation: '暑意初生，新熟物产与轻薄起居共同提示入夏。' },
  xiaoman: { phenology: '麦粒渐满，水气充盈', activities: ['看麦', '理田', '备晒场'], explanation: '作物将熟未熟，雨水多少直接牵动收成。' },
  mangzhong: { phenology: '麦熟稻青，梅雨将至', activities: ['抢收', '插秧', '晒麦'], explanation: '收与种的窗口重叠，古人必须紧随天气安排劳作。' },
  xiazhi: { phenology: '日长之至，鹿角渐解', activities: ['食面', '汲井', '午间小憩'], explanation: '白昼最长、热意加深，生活开始主动避开正午消耗。' },
  xiaoshu: { phenology: '温风至，荷风送香', activities: ['铺竹席', '摇团扇', '晒伏'], explanation: '暑热初盛，通风、遮阳与清简饮食成为日常重点。' },
  dashu: { phenology: '溽暑蒸腾，雷雨频至', activities: ['伏日清饮', '近水纳凉', '防湿'], explanation: '高温与湿气交织，消暑也要避免一味贪凉。' },
  liqiu: { phenology: '凉风初至，梧桐落叶', activities: ['啃秋', '晒物', '察收成'], explanation: '节序已入秋而暑气未消，生活先从细微信号过渡。' },
  chushu: { phenology: '暑气渐退，天地始肃', activities: ['晾晒', '收凉席', '早晚添衣'], explanation: '热湿慢慢退场，家中开始分阶段收整夏日用物。' },
  bailu: { phenology: '露凝草木，候鸟南归', activities: ['收清露', '添衣', '饮白露茶'], explanation: '昼夜温差增大，饮食与起居由清暑转向润燥收敛。' },
  qiufen: { phenology: '昼夜再均，稻谷成熟', activities: ['秋收', '晒谷', '赏月'], explanation: '成熟与晴燥相遇，一年的收获进入集中整理期。' },
  hanlu: { phenology: '露气转寒，菊花渐黄', activities: ['赏菊', '添衣', '饮热茶'], explanation: '寒意已比凉意更明确，白日游赏也要顾及早晚温差。' },
  shuangjiang: { phenology: '霜始降，草木黄落', activities: ['整寒衣', '收晚稻', '护藏物'], explanation: '冷空气活动增多，衣被、粮食与居所都要为冬天做准备。' },
  lidong: { phenology: '水始冰，万物收藏', activities: ['补门窗', '收器物', '温食'], explanation: '生活由秋收转向冬藏，居所开始防风蓄暖。' },
  xiaoxue: { phenology: '寒气渐盛，初雪将临', activities: ['腌冬蔬', '晾腊味', '添厚被'], explanation: '稳定低温适合保存食物，也提示家中完成御寒准备。' },
  daxue: { phenology: '仲冬雪盛，鹖鴠不鸣', activities: ['围炉', '温饮', '扫雪'], explanation: '户外劳作减少，一家人的活动逐渐向共同暖源集中。' },
  dongzhi: { phenology: '日影最长，阳气初生', activities: ['备家宴', '食面点', '祭祖'], explanation: '重要历法节点被转化为团聚、温食与敬祖的家庭仪式。' },
  xiaohan: { phenology: '雁北乡，梅香暗动', activities: ['重衣护寒', '温粥', '早卧'], explanation: '严寒深入日常，分层穿衣与减少耗散最为实际。' },
  dahan: { phenology: '岁末极寒，春信将近', activities: ['扫尘', '备岁', '藏食'], explanation: '一年寒意抵达极点，家宅也在整理中准备更新。' },
}

export const seasonLifeBands = [
  { season: '春', title: '万物渐生', terms: ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨'], changes: ['天气回暖', '草木萌发', '春耕开始'] },
  { season: '夏', title: '万物盛长', terms: ['立夏', '小满', '芒种', '夏至', '小暑', '大暑'], changes: ['暑热渐盛', '雨水增多', '纳凉避暑'] },
  { season: '秋', title: '万物渐收', terms: ['立秋', '处暑', '白露', '秋分', '寒露', '霜降'], changes: ['昼夜转凉', '收获渐丰', '起居入秋'] },
  { season: '冬', title: '万物收藏', terms: ['立冬', '小雪', '大雪', '冬至', '小寒', '大寒'], changes: ['气温下降', '草木休藏', '御寒养藏'] },
] as const
