export interface StateData {
  no: number;
  jp: string;
  en: string;
  type: string;
  region: string;
  port: string;
  inland: string;
  alcohol: string;
  rules: string;
  docs: string;
  industry: string;
  alcLevel: '全面禁酒' | '専売制' | '免許制';
}

export const STATES: StateData[] = [
  { no:1, jp:'マハーラーシュトラ州', en:'Maharashtra', type:'州', region:'西インド', port:'Nhava Sheva (JNPT) 3端末：GTI/JNPT/NSICT', inland:'鉄道・トラック 入港〜引取：7〜14日', alcohol:'免許制（FL-1/FL-2/FL-3）飲酒年齢：ビール/ワイン21歳/スピリッツ25歳', rules:'Stamp Duty（印紙税）あり（Assessable Value+関税額の0.1%）。FCL/LCL問わずCFS費用発生。SVB登録必要（親子・兄弟企業間取引）。30日以内に通関しないと政府倉庫移送。', docs:'IEC番号・GSTIN・PAN・委任状・インボイス+PL（輸入者押印）・FL-3（酒類）・FSSAI（食品）', industry:'自動車・化学品・繊維・医薬品・機械', alcLevel:'免許制' },
  { no:2, jp:'グジャラート州', en:'Gujarat', type:'州', region:'西インド', port:'Mundra港・Pipavav港・Kandla港', inland:'鉄道（CONCOR・DFC）・トラック', alcohol:'【全面禁酒】Gujarat Prohibition Act 1949。GIFT City内レストランのみ2023年末から例外。酒類の輸入・搬入は一切不可。', rules:'【酒類絶対禁止】酒類入りコンテナは発見次第没収・罰則。DFCでDelhi向け高速輸送可能。Pipavav→ICD TKDダイレクト鉄道（約24日）。危険品は事前代理店確認必須。', docs:'IEC番号・GSTIN・PAN・危険品：事前代理店承認・DGD　酒類：絶対不可', industry:'石油化学・繊維・塩・宝石・機械部品', alcLevel:'全面禁酒' },
  { no:3, jp:'タミル・ナードゥ州', en:'Tamil Nadu', type:'州', region:'南インド', port:'Chennai港（CCTL/CITPL）・Kattupalli港（Maersk）・Tuticorin港', inland:'鉄道・保税トラック。Chennai→Bangalore：保税トラックで3〜5日', alcohol:'【州専売制（TASMAC独占）】TASMAC以外の酒類輸入・販売不可。', rules:'CFS群は港北方10〜20km。Kattupalli港が近年増加中。Bangalore・Hyderabad向けは保税トラックで転送。FSSAI検査港。自動車部品（スズキ・現代・日産工場集積）の輸入需要大。', docs:'IEC番号・GSTIN・PAN・酒類：TASMACとの事前商業契約・食品：FSSAI・農産品：植物検疫証明書', industry:'自動車・自動車部品・機械・電子部品・繊維', alcLevel:'専売制' },
  { no:4, jp:'カルナータカ州', en:'Karnataka', type:'州', region:'南インド（内陸）', port:'ICD Bangalore（Whitefield等）→Chennai or JNPT経由', inland:'保税トラック（Chennai CFS→Bangalore ICD）3〜5日', alcohol:'免許制（Karnataka Excise Act）', rules:'バンガロールはインド最大のIT集積地。電子機器・精密機器は静電気対策・緩衝材重要。医薬品はCDSCO輸入許可必須。NTLバンガロール拠点あり。', docs:'IEC番号・GSTIN・PAN・医薬品：CDSCO輸入許可(Form-10)・電子機器：BIS認証', industry:'IT機器・電子部品・医薬品・工作機械', alcLevel:'免許制' },
  { no:5, jp:'デリー（首都圏連邦直轄地域）', en:'Delhi (NCT)', type:'連邦直轄地域', region:'北インド', port:'ICD Tughlakabad（TKD）←Pipavav鉄道（約24日）\nICD Patparganj（PPG）←Nhava Sheva経由（約30日）', inland:'鉄道（CONCOR直結）。Pipavav→TKD最速約24日', alcohol:'免許制（L-17：外国酒輸入許可）。ブランド・ラベルのExcise Dept登録必須。飲酒年齢25歳。', rules:'ICD TKDは鉄道直結・FCL比率高・引越し貨物対応。ICD PPGはLCL混載特化・即日デバンニング。国家予算発表（2月初旬）前後にICEGATEシステム停止→通関業務停止注意。L-17未取得ブランドはICD段階で差止め。', docs:'IEC番号・GSTIN・PAN・酒類：L-17ライセンス+ブランド登録・医薬品：CDSCO・BIS認証（電子機器）', industry:'電子機器・自動車部品・機械・IT機器・食品', alcLevel:'免許制' },
  { no:6, jp:'西ベンガル州', en:'West Bengal', type:'州', region:'東インド', port:'Kolkata港（ハルディア含む）Haldia Dock Complex（河川港）', inland:'鉄道・トラック・内陸水路', alcohol:'免許制（WB Excise Act）', rules:'河川港のため喫水制限（最大約8.5m）。大型コンテナ船入港不可。北東インド・ネパール・ブータン向け輸送ハブ。Kolkata SVBはNhava ShevaとSVBが別組織。', docs:'IEC番号・GSTIN・PAN・水産物：EIC証明・Kolkata SVB登録（関連会社間取引）', industry:'機械・鉄鋼・水産品・農産品', alcLevel:'免許制' },
  { no:7, jp:'ビハール州', en:'Bihar', type:'州', region:'東インド（内陸）', port:'内陸州。Kolkata港経由。ICD Patna', inland:'保税トラック（Kolkata→Patna：約700km）', alcohol:'【全面禁酒（2016年〜）】Bihar Prohibition and Excise Act 2016。違反者は最高終身刑（2022年最高裁判決）。例外なし。', rules:'【完全禁酒州（最も厳格）】積荷に酒類が含まれていないことを書類で証明できるようにすること。', docs:'IEC番号・GSTIN・PAN・酒類：絶対不可', industry:'農業機械・肥料・食品加工機械', alcLevel:'全面禁酒' },
  { no:8, jp:'ケーララ州', en:'Kerala', type:'州', region:'南インド', port:'Kochi港（ICTT Vallarpadam）・Vizhinjam港（2024年部分開港）', inland:'鉄道・トラック', alcohol:'【州専売制（BEVCO）】BEVCO以外の酒類輸入・販売不可。毎月1日が禁酒日。', rules:'Kochi港はICTT Vallarpadam（国際コンテナトランシップ端末）あり。スパイス・食品・水産物の取扱が多い。農産品は植物検疫証明書が必要。', docs:'IEC番号・GSTIN・PAN・農産品：植物検疫・食品：FSSAI・酒類：BEVCOとの契約', industry:'スパイス・食品・水産物・観光関連', alcLevel:'専売制' },
  { no:9, jp:'アーンドラ・プラデーシュ州', en:'Andhra Pradesh', type:'州', region:'南インド', port:'Visakhapatnam港・Krishnapatnam港（民間）', inland:'鉄道・トラック', alcohol:'免許制（AP State Beverages Corporation）', rules:'鉄鋼製品はBIS認証＋鉄鋼省からの事前確認取得が義務（2023年10月以降全船積みで）。Krishnapatnam港が近年成長中。', docs:'IEC番号・GSTIN・PAN・鉄鋼：BIS認証+鉄鋼省事前確認', industry:'鉄鋼・電力設備・農業機械', alcLevel:'免許制' },
  { no:10, jp:'テランガーナ州', en:'Telangana', type:'州', region:'南インド（内陸）', port:'ICD Hyderabad（サナタナガル等）→Chennai or JNPT経由', inland:'保税トラック（Chennai CFS→Hyderabad ICD）3〜6日', alcohol:'免許制（TS Excise Dept）', rules:'インド最大の製薬・バイオ産業集積地（ゲノム・バレー）。医薬品はCDSCO輸入許可（Form-10）が必須。申請に数ヶ月かかる場合あり。', docs:'IEC番号・GSTIN・PAN・医薬品：CDSCO輸入許可(Form-10)事前取得・医療機器：CDSCO登録', industry:'医薬品・バイオ技術・IT機器', alcLevel:'免許制' },
  { no:11, jp:'ミゾラム州', en:'Mizoram', type:'州', region:'北東インド（山岳）', port:'内陸山岳州。Kolkata→Guwahati→アイザール（トラック）', inland:'保税トラック（山岳道路・時間大幅変動）', alcohol:'【全面禁酒（外国産）】2019年〜。地元産ぶどうワインのみ例外。外国産アルコール全面禁止。', rules:'山岳道路のため輸送日数が大幅変動（乾季3〜5日、雨季・土砂崩れ時1〜2週間）。重量制限あり。大型機械は事前に輸送可否確認。', docs:'IEC番号・GSTIN・PAN・酒類：完全不可（外国産）', industry:'建設資材・農業機械・日用品', alcLevel:'全面禁酒' },
  { no:12, jp:'ナガランド州', en:'Nagaland', type:'州', region:'北東インド（山岳）', port:'内陸山岳州。Kolkata→Guwahati→コヒマ（トラック）', inland:'保税トラック（山岳道路）', alcohol:'【全面禁酒（最厳格）】NLTP Act 1989。輸入・所持・販売・輸出・製造すべて禁止。例外規定なし。', rules:'1989年より完全禁酒。山岳地域のため治安・輸送リスクに注意。輸送業者の現地確認が重要。', docs:'IEC番号・GSTIN・PAN・酒類：絶対不可', industry:'農業機械・建設資材・医療機器', alcLevel:'全面禁酒' },
  { no:13, jp:'ゴア州', en:'Goa', type:'州', region:'西インド', port:'Mormugao港（バルク・鉄鉱石中心）', inland:'トラック・鉄道（LCLはNhava Sheva or Chennai経由が多い）', alcohol:'許可制（比較的低税率・自由）周辺州より税率低い', rules:'Mormugao港はバルク中心でコンテナは少量。観光・高級リゾート向け輸入品需要あり。', docs:'IEC番号・GSTIN・PAN・酒類：ゴア州輸入ライセンス（取得容易）', industry:'観光用品・鉄鉱石・農産品', alcLevel:'免許制' },
  { no:14, jp:'ラクシャドウィープ', en:'Lakshadweep', type:'連邦直轄地域', region:'島嶼地域', port:'Kochi港経由（船便のみ）', inland:'フェリー（Kochi〜各島：200〜400km・2〜4日）', alcohol:'【全面禁酒】イスラム系住民多数。アルコール類の輸入・販売・消費は全面禁止。', rules:'全島でアルコール禁止。ILP（インナーライン許可証）必須。フェリーは週1〜2便程度。悪天候による欠航あり。', docs:'IEC番号・GSTIN・PAN・ILP必須・酒類：絶対不可', industry:'食料品・漁業設備・建設資材', alcLevel:'全面禁酒' },
];
