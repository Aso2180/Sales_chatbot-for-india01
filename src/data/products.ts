export interface ProductData {
  cat: string;
  authority: string;
  level: string;
  detail: string;
}

export const PRODUCTS: ProductData[] = [
  { cat: '電気・電子機器全般', authority: 'BIS（インド規格局）QCO', level: '🔴 強制認証必須', detail: 'BIS強制認証（スキームI/II/X）が義務化。家電・電源・電池・通信機器・照明・半導体等600品目超。認証なしでは輸入・販売・流通が一切不可。取得に平均6ヶ月。製造者自身が申請（輸入者代行不可）。' },
  { cat: '機械・電気設備（包装機械等）', authority: 'BIS スキームX（2024年8月通達）', level: '🔴 強制認証（2026年9月1日〜）', detail: 'Machinery and Electrical Equipment Safety Order 2024により産業機械全般が対象。2025年8月施行→2026年9月1日に延期。対象外品目はQCO発行省庁へのNOC申請が必要。' },
  { cat: '化学品・化学原料', authority: 'BIS認証（62品目以上）', level: '🟠 要認証（品目による）', detail: '2018年頃から化学品もBIS認証対象に拡大。2024年2月時点で62品目（肥料・ポリマー・繊維関連化学品含む）が対象。定期的なモニタリングを推奨。' },
  { cat: '鉄鋼製品', authority: 'BIS認証（ISマーク）鉄鋼省QCOポータル', level: '🔴 強制認証（全船積みで事前確認義務）', detail: '2023年10月以降：IS認証なしの鉄鋼製品は全船積みに対して鉄鋼省から事前確認（Clearance）取得が義務化。鉄鋼省のオンラインQCOポータルで申請。' },
  { cat: '食品・飲食料品・農産品', authority: 'FSSAI（食品安全標準局）FICSシステム', level: '🔴 輸入ライセンス必須', detail: 'FSSAIライセンス（中央ライセンス）の取得が必要。FoSCaSにてオンライン申請。輸入申告はFICS（Food Import Clearance System）をICEGATEと連携して行う。' },
  { cat: '酒類・アルコール飲料', authority: 'FSSAI（ラベル規制）各州Excise Dept', level: '🟠 州ごとに異なる', detail: 'FSSAIの酒類ラベル規制に準拠が必要。州専売制（TASMAC/BEVCO等）または州免許制。禁酒州（Gujarat・Bihar・Nagaland・Mizoram・Lakshadweep）は輸入完全禁止。輸入関税：基本関税150%+IGST。' },
  { cat: '医薬品・医療機器', authority: 'CDSCO（中央医薬品標準管理機構）', level: '🔴 輸入許可（Form-10）必須', detail: '医薬品はCDSCO発行の輸入許可（Form-10）が必須。製品ごとに申請。承認に数ヶ月〜1年かかる場合あり。医療機器：2017年規則に基づく登録・輸入ライセンス。' },
  { cat: '自動車・自動車部品', authority: 'CMVR（自動車法）ARAI/NATRIP', level: '🟠 車両は検査機関認証必須', detail: '完成車輸入：ARAI等での試験・証明書取得が必要。関税100%超。自動車部品：通常輸入可（BIS対象品目は別途確認）。' },
  { cat: '繊維・繊維製品', authority: 'アゾ染料規制（環境保護法）', level: '🟡 原産国による（日本は免除）', detail: '特定アゾ染料を含む繊維製品は輸入禁止。ただし日本原産品はAppendix 2X免除対象のため試験証明書不要。他国経由の場合は要注意。' },
  { cat: '植物・農産品・種子・果実', authority: '植物検疫（PQ）Plant Quarantine Order 2003', level: '🔴 植物検疫証明書必須', detail: '植物・農産品・種子・果実・木材・花卉等：農林水産省・植物防疫所が発行する植物検疫証明書が必須。インド側でPQ検査あり。不合格の場合は廃棄・返送。' },
  { cat: '危険品（DG）', authority: 'IMDG Code（国際海上危険物規則）', level: '🟠 種類・クラスによる', detail: 'IMDG Codeに従いクラス1〜9で分類・申告。危険物明細書（DGD）の作成義務。リチウムイオン電池（Class 9）：IMDG SP188要件を満たす場合のみ条件付きで一般貨物として輸送可能。' },
  { cat: '中古機械・設備', authority: 'DGFT 外国貿易政策', level: '🟠 要件による', detail: '中古機械の輸入は原則「Restricted」品目。DGFT発行の輸入ライセンスまたは特定免除が必要な場合あり。電子廃棄物（E-waste）は輸入禁止（E-waste Management Rules 2022）。' },
];
