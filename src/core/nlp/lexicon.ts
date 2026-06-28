/**
 * NRC Emotion Lexicon — curated subset
 *
 * Bitmask encoding per word:
 *   anger(1) fear(2) anticipation(4) trust(8) surprise(16)
 *   sadness(32) joy(64) disgust(128) positive(256) negative(512)
 *
 * Derived from the NRC Word-Emotion Association Lexicon (Mohammad & Turney 2013).
 * Only the stems are stored; the engine tries raw token → stem fallback.
 */
export const LEXICON: Record<string, number> = {
  // ── Joy + Positive ─────────────────────────────────────────────
  happy:        64+256,
  happiness:    64+256,
  joy:          64+256,
  joyful:       64+256,
  joyous:       64+256,
  wonderful:    64+256,
  amazing:      64+16+256,
  beautiful:    64+256,
  gorgeous:     64+256,
  delight:      64+4+256,
  delightful:   64+256,
  celebrate:    64+4+256,
  celebration:  64+4+256,
  love:         64+8+256,
  bliss:        64+256,
  elate:        64+256,
  elated:       64+256,
  cheerful:     64+256,
  bright:       64+256,
  radiant:      64+256,
  pleasure:     64+256,
  enjoy:        64+256,
  laugh:        64+256,
  smile:        64+256,
  fun:          64+256,
  fantastic:    64+256,
  excellent:    256,
  perfect:      8+256,
  brilliant:    64+16+256,
  glorious:     64+256,
  magnificent:  64+256,
  triumph:      64+4+256,
  victory:      64+4+256,
  succeed:      64+4+8+256,
  success:      64+4+8+256,
  win:          64+4+256,
  reward:       64+4+8+256,
  thrill:       64+4+16+256,
  excited:      64+4+256,
  enthusiasm:   64+4+256,
  inspire:      64+4+8+256,
  inspiration:  64+4+8+256,
  peace:        8+64+256,
  peaceful:     8+64+256,
  calm:         8+256,
  serene:       8+64+256,
  harmony:      8+64+256,
  comfort:      8+64+256,

  // ── Trust + Positive ───────────────────────────────────────────
  trust:        8+256,
  reliable:     8+256,
  stable:       8+256,
  safe:         8+256,
  secure:       8+256,
  honest:       8+256,
  faithful:     8+256,
  loyal:        8+256,
  genuine:      8+256,
  confident:    8+256,
  confidence:   8+4+8+256,
  steady:       8+256,
  solid:        8+256,
  strong:       8+256,
  true:         8+256,
  truth:        8+256,
  belief:       8+4+256,
  certain:      8+256,
  clarity:      8+256,
  clear:        8+256,
  focus:        8+4+256,

  // ── Anticipation ───────────────────────────────────────────────
  hope:         4+8+256,
  hopeful:      4+8+256,
  expect:       4,
  await:        4,
  wonder:       4+16+256,
  curious:      4+256,
  eager:        4+64+256,
  ready:        4+8+256,
  dream:        4+64+256,
  wish:         4+64+256,
  aspire:       4+256,
  plan:         4+8,
  goal:         4+8+256,
  ambition:     4+256,
  opportunity:  4+256,
  future:       4,
  forward:      4+256,
  progress:     4+256,
  improve:      4+256,
  grow:         4+8+256,
  learn:        4+8+256,
  discover:     4+16+256,
  explore:      4+64+256,
  adventure:    4+64+16+256,

  // ── Sadness + Negative ─────────────────────────────────────────
  sad:          32+512,
  sadness:      32+512,
  grief:        32+2+512,
  sorrow:       32+512,
  melancholy:   32+512,
  lonely:       32+512,
  alone:        32+512,
  despair:      32+2+512,
  mourn:        32+512,
  heartbreak:   32+512,
  tear:         32+512,
  weep:         32+512,
  miss:         32+512,
  loss:         32+512,
  lost:         32+512,
  empty:        32+512,
  hollow:       32+512,
  gloomy:       32+512,
  dreary:       32+512,
  depress:      32+512,
  miserable:    32+512,
  tragic:       32+512,
  unfortunate:  512,
  regret:       32+512,
  disappoint:   32+512,
  fail:         32+512,
  failure:      32+512,
  broken:       32+512,
  struggle:     32+2+512,
  suffer:       32+512,
  pain:         32+512,
  hurt:         32+2+512,
  wound:        32+2+512,
  abandon:      32+512,
  neglect:      32+512,
  forget:       32+512,
  darkness:     32+2+512,
  shadow:       32+2,
  isolation:    32+512,
  silence:      32,

  // ── Anger + Negative ───────────────────────────────────────────
  angry:        1+512,
  anger:        1+512,
  rage:         1+512,
  fury:         1+512,
  furious:      1+512,
  hate:         1+128+512,
  hatred:       1+128+512,
  violent:      1+2+512,
  aggressive:   1+512,
  hostile:      1+512,
  bitter:       1+128+512,
  resentment:   1+32+512,
  wrath:        1+512,
  frustration:  1+512,
  irritate:     1+512,
  annoy:        1+512,
  conflict:     1+2+512,
  war:          1+2+512,
  fight:        1+512,
  attack:       1+2+512,
  destroy:      1+512,
  corrupt:      1+128+512,
  betray:       1+2+32+512,
  cruel:        1+128+512,
  oppress:      1+2+512,
  brutal:       1+512,

  // ── Fear + Negative ────────────────────────────────────────────
  fear:         2+512,
  afraid:       2+512,
  terror:       2+512,
  panic:        2+16+512,
  horror:       2+128+512,
  dread:        2+512,
  anxious:      2+512,
  anxiety:      2+512,
  worried:      2+512,
  nervous:      2+512,
  scared:       2+512,
  frighten:     2+512,
  ominous:      2+512,
  threaten:     1+2+512,
  danger:       2+512,
  risk:         2,
  alarm:        2+16+512,
  uncertain:    2+512,
  doubt:        2+512,
  nightmare:    2+512,

  // ── Surprise ───────────────────────────────────────────────────
  surprise:     16,
  sudden:       16,
  unexpected:   16,
  shock:        2+16+512,
  astonish:     16+256,
  amaze:        16+64+256,
  startled:     2+16,
  unforeseen:   16,
  realize:      16+256,
  reveal:       16+4,
  notice:       16,

  // ── Disgust + Negative ─────────────────────────────────────────
  disgust:      128+512,
  revolt:       128+1+512,
  repulsive:    128+512,
  foul:         128+512,
  nasty:        128+1+512,
  gross:        128+512,
  vile:         128+1+512,
  contaminate:  128+512,
  pollute:      128+512,

  // ── Atmosphere / Weather words ─────────────────────────────────
  storm:        1+2+512,
  thunder:      2+16,
  lightning:    2+16,
  hurricane:    1+2+512,
  tornado:      1+2+512,
  rain:         32,
  drizzle:      32,
  pour:         32,
  flood:        2+32+512,
  fog:          32+2,
  mist:         32,
  haze:         32,
  murky:        32+128+512,
  overcast:     32,
  cloudy:       32,
  snow:         32+2,
  frost:        2+32,
  ice:          2,
  cold:         32+2,
  freeze:       2,
  blizzard:     2+512,
  sunny:        64+256,
  sunshine:     64+256,
  warmth:       64+256,
  warm:         64+256,
  cool:         8+256,
  breeze:       64+256,
  crisp:        8+256,
  night:        2+32,
  dark:         2+32,
  midnight:     2+32,
  dawn:         4+64+256,
  dusk:         32+4,
  twilight:     4+32,
  sunset:       64+4+256,
  sunrise:      64+4+256,

  // ── General valence ────────────────────────────────────────────
  good:         8+256,
  great:        64+256,
  bad:          512,
  awful:        128+512,
  terrible:     512,
  horrible:     128+512,
  poor:         512,
  interesting:  4+16+256,
  boring:       512,
  dull:         512,
  hard:         2+512,
  difficult:    2+512,
  easy:         8+256,
  simple:       8+256,
  complex:      2+4,
  fast:         64+256,
  slow:         32,
  long:         32,
  quick:        4+256,
  fresh:        4+256,
  old:          32,
  fix:          8+256,
  clean:        8+256,
  dirty:        128+512,
  ugly:         128+512,
  powerful:     8+64+256,
  weak:         32+512,
  unstable:     2+512,
  consistent:   8+256,
  inconsistent: 512,
  rough:        512,
  recommend:    8+4+256,
  prefer:       256,
  avoid:        2+512,
  like:         64+256,
  dislike:      512,
  review:       4,
  story:        4+64,
  experience:   4+256,
  perspective:  8+4,
  journey:      4+64+256,
  change:       4+16,
  moment:       4+256,
  life:         64+8+256,
  time:         4,
  month:        4,
  week:         4,
  year:         4,
  share:        8+256,
};

// ── Emotion bitmask positions ────────────────────────────────────
export const E = {
  ANGER: 0, FEAR: 1, ANTICIPATION: 2, TRUST: 3,
  SURPRISE: 4, SADNESS: 5, JOY: 6, DISGUST: 7,
  POSITIVE: 8, NEGATIVE: 9,
} as const;

export const EMOTION_BITS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512] as const;

// ── Domain word sets ────────────────────────────────────────────
export const DOMAIN = {
  tech: new Set([
    'software','hardware','os','operating','system','terminal','install','driver',
    'interface','kernel','app','application','workflow','laptop','desktop','computer',
    'keyboard','mouse','screen','display','monitor','code','coding','programming',
    'linux','mac','windows','processor','cpu','gpu','memory','ram','battery','performance',
    'speed','update','bug','feature','user','settings','configuration','review','technical',
    'setup','environment','distribution','distro','command','shell','package','resolution',
    'cursor','theme','dock','desktop','default','script','git','build','deploy','server',
    'network','browser','extension','plugin','api','framework','library','tool','dev',
    'developer','program','run','boot','startup','log','file','folder','directory','path',
    'shortcut','hotkey','window','tab','menu','click','button','icon','font',
    'mode','omarchy','arch','ubuntu','debian','fedora','gnome','kde','i3','hyprland',
  ]),

  nature: new Set([
    'forest','tree','mountain','ocean','river','lake','sky','cloud','wind','flower',
    'garden','grass','leaf','earth','landscape','valley','hill','coast','beach','wave',
    'waterfall','meadow','wilderness','bird','fish','animal','sunrise','sunset','nature',
    'jungle','desert','arctic','tropical','breeze','gale','tide','shore','cliff','peak',
    'glacier','coral','reef','habitat','ecosystem','soil','root','branch','seed','bloom',
    'petal','bark',
  ]),

  urban: new Set([
    'city','street','building','concrete','glass','metal','neon','traffic','urban',
    'downtown','pavement','subway','highway','road','bridge','tower','skyscraper',
    'apartment','cafe','restaurant','shop','market','noise','crowd','bus','train',
    'commute','office','work','meeting','schedule','deadline','rush',
  ]),

  personal: new Set([
    'feel','think','believe','experience','perspective','journey','story','life',
    'memory','remember','discover','learn','grow','change','moment','personal','share',
    'tell','write','read','reflect','understand','realize','know','wonder','question',
    'decision','choice','path','way','mind','heart','soul','thought','emotion',
    'myself','yourself','himself','herself','ourselves','common','user','person','people',
    'month','week','year','day',
  ]),
} as const;

// ── Color → hue mapping ─────────────────────────────────────────
export const COLOR_HUES: Record<string, number> = {
  // Western color names
  red: 5, crimson: 350, scarlet: 10, rose: 345, pink: 340,
  orange: 28, amber: 38, gold: 48, golden: 48, yellow: 58,
  green: 125, lime: 85, teal: 175, cyan: 190,
  blue: 215, azure: 208, cobalt: 225, navy: 228, indigo: 248,
  purple: 270, violet: 280, lavender: 290, magenta: 305,
  brown: 25, copper: 22, bronze: 32, rust: 15, ochre: 42,
  grey: -1, gray: -1, silver: -1, white: -1, black: -1,
  dark: -2, light: -3,  // not hues — luminance signals

  // Japanese traditional colors (日本の伝統色) — all 250 from nipponcolors.com
  // Hue = HSL hue (0–359). Special signals: -1 grey, -2 dark/black, -3 light/white.

  // ── Pink · red (beni-kei)
  umenezumi: 0,  // 梅鼠 #9E7A7A
  toki: 0,  // 鴇 #EEA9A9
  entan: 0,  // 鉛丹 #D75455
  cyohsyun: 1,  // 長春 #BF6766
  shinsyu: 1,  // 真朱 #AB3B3A
  jinzamomi: 2,  // 甚三紅 #EB7A77
  suohkoh: 2,  // 蘇芳香 #A96360
  ginsyu: 2,  // 銀朱 #C73E3A
  azuki: 4,  // 小豆 #954A45
  sakuranezumi: 6,  // 桜鼠 #B19693
  kuriume: 6,  // 栗梅 #904840
  kokiake: 7,  // 深緋 #86473F
  benikaba: 7,  // 紅樺 #B54434
  benitobi: 8,  // 紅鳶 #994639
  syojyohi: 8,  // 猩猩緋 #E83015
  akebono: 9,  // 曙 #F19483
  sangosyu: 9,  // 珊瑚朱 #F17C67
  shikancha: 10,  // 芝翫茶 #B55D4C
  ebicha: 11,  // 海老茶 #734338
  mizugaki: 11,  // 水がき #B9887D
  ake: 11,  // 緋 #CC543A
  benihiwada: 14,  // 紅檜皮 #884C3A
  hiwada: 14,  // 檜皮 #854836
  benihi: 14,  // 紅緋 #F75C2F
  terigaki: 14,  // 照柿 #C46243
  kakishibu: 15,  // 柿渋 #A35E47
  bengara: 16,  // 弁柄 #9A5034
  tokigaracha: 16,  // ときがら茶 #DB8E71
  araisyu: 17,  // 洗朱 #FB966E
  karacha: 17,  // 唐茶 #B47157
  sohi: 17,  // 纁 #ED784A
  benikeshinezumi: 17,  // 紅消鼠 #52433D
  edocha: 18,  // 江戸茶 #AF5F3C
  momoshiocha: 18,  // 百塩茶 #724938
  kabacha: 18,  // 樺茶 #B35C37
  akakoh: 18,  // 赤香 #E3916E
  haizakura: 19,  // 灰桜 #D7C4BB
  ohni: 19,  // 黄丹 #F05E1C
  ensyucha: 19,  // 遠州茶 #CA7853

  // ── Orange · amber · brown (cha-kei)
  shishi: 20,  // 宍 #F0A986
  sodenkaracha: 20,  // 宗伝唐茶 #A0674B
  kaba: 20,  // 樺 #C1693C
  kurumi: 20,  // 胡桃 #947A6D
  tobi: 21,  // 鳶 #724832
  kokikuchinashi: 21,  // 深支子 #FB9966
  kurikawacha: 22,  // 栗皮茶 #6A4028
  suzumecha: 22,  // 雀茶 #8F5A3C
  kurotobi: 23,  // 黒鳶 #554236
  araigaki: 23,  // 洗柿 #E79460
  taisya: 25,  // 代赭 #A36336
  kogecha: 26,  // 焦茶 #563F2E
  akashirotsurubami: 26,  // 赤白橡 #E1A679
  sharegaki: 26,  // 洒落柿 #FFBA84
  akakuchiba: 27,  // 赤朽葉 #C78550
  umezome: 27,  // 梅染 #E9A368
  kanzo: 28,  // 萱草 #FC9F4D
  usugaki: 28,  // 薄柿 #ECB88A
  kohrozen: 29,  // 黄櫨染 #7D532C
  tonocha: 29,  // 礪茶 #985F2A
  biwacha: 29,  // 枇杷茶 #B17844
  sencha: 30,  // 煎茶 #855B32
  beniukon: 30,  // 紅鬱金 #E98B2A
  kohaku: 30,  // 琥珀 #CA7A2C
  chojicha: 31,  // 丁子茶 #96632E
  chojizome: 32,  // 丁子染 #B07736
  fushizome: 32,  // 柴染 #967249
  kuchiba: 32,  // 朽葉 #E2943B
  kincha: 32,  // 金茶 #C7802D
  kyara: 33,  // 伽羅 #78552B
  usukoh: 33,  // 薄香 #EBB471
  tonoko: 35,  // 砥粉 #D7B98E
  ohdo: 35,  // 黄土 #B68E55
  shiracha: 35,  // 白茶 #BC9F77
  susutake: 36,  // 煤竹 #6E552F
  kobicha: 36,  // 媚茶 #876633
  binrojizome: 36,  // 檳榔子染 #3A3226
  ginsusutake: 37,  // 銀煤竹 #82663A
  kenpohzome: 38,  // 憲法染 #43341B
  kitsune: 38,  // 狐 #9B6E23
  shirotsurubami: 38,  // 白橡 #DCB879
  kigaracha: 39,  // 黄唐茶 #C18A26
  yamabuki: 39,  // 山吹 #FFB11B
  yamabukicha: 40,  // 山吹茶 #D19826
  kuwacha: 40,  // 桑茶 #C99833
  torinoko: 40,  // 鳥の子 #DAC9A6
  hajizome: 41,  // 櫨染 #DDA52D
  tamago: 41,  // 玉子 #F9BF45
  tamamorokoshi: 41,  // 玉蜀黍 #E8B647
  namakabe: 41,  // 生壁 #7D6C46
  usuki: 41,  // 浅黄 #FAD689
  kitsurubami: 42,  // 黄橡 #BA9132
  hanaba: 42,  // 花葉 #F7C242
  kikuchiba: 42,  // 黄朽葉 #D9AB42
  kuchinashi: 42,  // 梔子 #F6C555
  rikyushiracha: 42,  // 利休白茶 #B4A582
  aku: 42,  // 灰汁 #877F6C
  karashi: 44,  // 芥子 #CAAD5F
  ukon: 45,  // 鬱金 #EFBB24
  higosusutake: 45,  // 肥後煤竹 #8D742A
  tohoh: 46,  // 籐黄 #FFC408
  rikyucha: 46,  // 利休茶 #897D55
  rokohcha: 46,  // 路考茶 #74673E
  nataneyu: 48,  // 菜種油 #A28C37
  kariyasu: 49,  // 刈安 #E9CD4C
  nanohana: 49,  // 菜の花 #F7D94C

  // ── Yellow (ki-kei)
  uguisucha: 50,  // 鶯茶 #6C6024
  kimirucha: 50,  // 黄海松茶 #867835
  mirucha: 50,  // 海松茶 #62592C
  mushikuri: 50,  // 蒸栗 #D9CD90
  kihada: 51,  // 黄蘗 #FBE251
  aokuchiba: 53,  // 青朽葉 #ADA142
  ominaeshi: 56,  // 女郎花 #DDD23B
  hiwacha: 56,  // 鶸茶 #A5A051
  uguisu: 58,  // 鶯 #6C6A2D
  rikancha: 60,  // 璃寛茶 #616138
  hiwa: 62,  // 鶸 #BEC23F
  yanagicha: 63,  // 柳茶 #939650
  kikujin: 63,  // 麹塵 #B1B479
  koke: 65,  // 苔 #838A2D
  aikobicha: 65,  // 藍媚茶 #4B4E2A
  miru: 68,  // 海松 #5B622E
  sensaicha: 70,  // 千歳茶 #4D5139
  baikocha: 73,  // 梅幸茶 #89916B

  // ── Green (midori-kei)
  iwaicha: 80,  // 岩井茶 #646A58
  hiwamoegi: 81,  // 鶸萌黄 #90B44B
  moegi: 84,  // 萌黄 #7BA23F
  yanagizome: 88,  // 柳染 #91AD70
  urayanagi: 90,  // 裏柳 #B5CAA0
  yanagisusutake: 92,  // 柳煤竹 #4A593D
  matsuba: 95,  // 松葉 #42602D
  nae: 99,  // 苗 #86C166
  aoni: 99,  // 青丹 #516E41
  yanaginezumi: 107, // 柳鼠 #808F7C
  usuao: 123, // 薄青 #91B493
  chitosemidori: 131, // 千歳緑 #36563C
  onandocha: 136, // 御納戸茶 #465D4C
  oitake: 139, // 老竹 #6A8372
  tokiwa: 141, // 常磐 #1B813E
  byakuroku: 141, // 白緑 #A8D8B9
  wakatake: 147, // 若竹 #5DAC81
  tokusa: 148, // 木賊 #2D6D4B
  midori: 151, // 緑 #227D51
  sabiseiji: 152, // 錆青磁 #86A697
  rokusyoh: 160, // 緑青 #24936E
  aimirucha: 162, // 藍海松茶 #0F4C3A
  veludo: 163, // ビロード #096148
  mushiao: 164, // 虫襖 #20604F

  // ── Teal · cyan (asagi-kei)
  tetsu: 165, // 鉄 #26453D
  aotake: 167, // 青竹 #00896C
  sabitetsuonando: 167, // 錆鉄御納戸 #405B55
  tonocha2: 170, // 沈香茶 #4F726C
  aomidori: 171, // 青緑 #00AA90
  korainando: 174, // 高麗納戸 #305A56
  onando: 174, // 御納戸 #0C4842
  seiji: 177, // 青磁 #69B0AC
  mizuasagi: 178, // 水浅葱 #66BAB7
  seiheki: 179, // 青碧 #268785
  byakugun: 182, // 白群 #78C2C4
  omeshicha: 182, // 御召茶 #376B6D
  kamenozoki: 186, // 瓶覗 #A5DEE4
  fukagawanezumi: 187, // 深川鼠 #77969A
  tetsuonando: 187, // 鉄御納戸 #255359
  sabiasagi: 188, // 錆浅葱 #6699A1
  asagi: 188, // 浅葱 #33A6B8
  ai: 188, // 藍 #0D5661
  mizu: 189, // 水 #81C7D4
  shinbashi: 191, // 新橋 #0089A7
  sabionando: 192, // 錆御納戸 #336774
  hanaasagi: 194, // 花浅葱 #1E88A8
  ainezumi: 194, // 藍鼠 #566C73
  hanada: 195, // 縹 #006284
  masuhana: 196, // 舛花 #577C8A
  omeshionando: 197, // 御召御納戸 #2E5C6E
  noshimehana: 198, // 熨斗目花 #2B5F75
  tsuyukusa: 198, // 露草 #2EA9DF
  sora: 199, // 空 #58B2DC
  chigusa: 199, // 千草 #3A8FB7
  wasurenagusa: 203, // 勿忘草 #7DB9DE
  gunjyo: 203, // 群青 #51A8DD
  ruri: 208, // 瑠璃 #005CAF

  // ── Blue · indigo (ai-kei)
  kachi: 212, // 褐 #08192D
  kon: 213, // 紺 #0F2540
  rurikon: 215, // 瑠璃紺 #0B346E
  konjyo: 223, // 紺青 #113285
  benimidori: 226, // 紅碧 #7B90D2
  fujinezumi: 232, // 藤鼠 #6E75A4
  benikakehana: 239, // 紅掛花 #4E4F97
  konkikyo: 243, // 紺桔梗 #211E55
  fuji: 249, // 藤 #8B81C3
  tetsukon: 252, // 鉄紺 #261E47
  futaai: 253, // 二藍 #70649A
  ouchi: 253, // 楝 #9B90C2

  // ── Purple · violet (murasaki-kei)
  fujimurasaki: 262, // 藤紫 #8A6BBE
  kikyo: 262, // 桔梗 #6A4C9C
  shion: 263, // 紫苑 #8F77B5
  usu: 273, // 薄 #B28FCE
  hashita: 277, // 半 #986DB2
  kokimurasaki: 281, // 深紫 #4A225D
  edomurasaki: 282, // 江戸紫 #77428D
  sumire: 282, // 菫 #66327C
  shikon: 283, // 紫紺 #3C2F41
  messhi: 284, // 滅紫 #533D5B
  ayame: 286, // 菖蒲 #6F3381
  murasaki: 289, // 紫 #592C63
  benifuji: 293, // 紅藤 #B481BB

  // ── Magenta · grape · deep rose (budoh-kei)
  kakitsubata: 315, // 杜若 #622954
  ebizome: 317, // 蒲葡 #6D2E5B
  botan: 321, // 牡丹 #C1328E
  budohnezumi: 325, // 葡萄鼠 #5E3D50
  kurobeni: 327, // 黒紅 #3F2B36
  umemurasaki: 329, // 梅紫 #A8497A
  tsutsuji: 331, // 躑躅 #E03C8A
  nasukon: 332, // 茄子紺 #572A3F
  nadeshiko: 339, // 撫子 #DC9FB4
  karakurenai: 341, // 韓紅花 #D0104C
  kohbai: 343, // 紅梅 #E16B8C
  suoh: 346, // 蘇芳 #8E354A
  ikkonzome: 346, // 一斥染 #F4A7B9
  nakabeni: 346, // 中紅 #DB4D6D
  kurenai: 346, // 紅 #CB1B45
  nisemurasaki: 346, // 似紫 #562E37
  momo: 347, // 桃 #F596AA
  usubeni: 348, // 薄紅 #E87A90
  taikoh: 349, // 退紅 #F8C3CD
  ichigo: 350, // 苺 #B5495B
  imayoh: 350, // 今様 #D05A6E
  murasakitobi: 350, // 紫鳶 #60373E
  kuwazome: 352, // 桑染 #64363C
  sakura: 356, // 桜 #FEDFE1
  enji: 357, // 燕脂 #9F353A
  akabeni: 359, // 赤紅 #CB4042

  // ── Neutrals — grey · black · white signals
  shironeri: -3, // 白練 #FCFAF2
  gofun: -3, // 胡粉 #FFFFFB
  kurotsurubami: -2, // 黒橡 #0B1013
  sumi: -2, // 墨 #1C1C1C
  kuro: -2, // 黒 #080808
  ro: -2, // 呂 #0C0C0C
  fujisusutake: -1, // 藤煤竹 #574C57
  hatobanezumi: -1, // 鳩羽鼠 #72636E
  shironezumi: -1, // 白鼠 #BDC0BA
  ginnezumi: -1, // 銀鼠 #91989F
  namari: -1, // 鉛 #787878
  hai: -1, // 灰 #828282
  sunezumi: -1, // 素鼠 #787D7B
  rikyunezumi: -1, // 利休鼠 #707C74
  nibi: -1, // 鈍 #656765
  aonibi: -1, // 青鈍 #535953
  dobunezumi: -1, // 溝鼠 #4F4F48
  aisumicha: -1, // 藍墨茶 #373C38
  keshizumi: -1, // 消炭 #434343
};

// ── Time-of-day keywords → hour ──────────────────────────────────
export const TIME_WORDS: Record<string, number> = {
  midnight: 0, night: 22, evening: 20, dusk: 18, sunset: 18,
  afternoon: 14, noon: 12, morning: 8, dawn: 5, sunrise: 6, twilight: 19,
};

// ── Common stopwords (stripped before scoring) ──────────────────
export const STOPWORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with',
  'by','from','up','about','into','as','is','are','was','were','be','been',
  'being','have','has','had','do','does','did','will','would','should','could',
  'may','might','must','shall','can','it','its','this','that','these','those',
  'i','me','my','we','our','you','your','he','she','they','them','their',
  'what','which','who','how','when','where','why','all','any','some','no',
  'not','so','if','then','than','more','most','very','just','also','only',
  'even','while','after','before','since','until','though','although','because',
  'get','got','make','made','take','took','use','used','come','came','go','went',
  'see','saw','know','knew','think','thought','want','need','like','look',
  'im','ive','id','ill','thats','its','dont','doesnt','didnt','wouldnt',
  'couldnt','shouldnt','havent','hasnt','hadnt','isnt','arent','wasnt','werent',
]);
