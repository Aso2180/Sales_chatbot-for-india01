import { PRODUCTS } from '@/data/products';

export default function ProductsTab() {
  return (
    <div>
      <div className="info-box ib-red" style={{ marginBottom: 14, fontSize: 11, lineHeight: 1.7 }}>
        🔴 <strong>BIS認証対象品目は急拡大中（2024年時点600品目超）。</strong>
        認証なしでは輸入・販売・流通が一切不可。取得に平均6ヶ月。製造者自身が申請（輸入者代行不可）。<br />
        船積み2〜3ヶ月前には必ず対象可否を確認してください。
      </div>
      <div className="prod-grid">
        {PRODUCTS.map((p, i) => {
          const lc = p.level.includes('🔴') ? 'var(--red)' : p.level.includes('🟠') ? 'var(--orange)' : 'var(--gold)';
          return (
            <div key={i} className="prod-card">
              <div className="prod-lv" style={{ color: lc }}>{p.level}</div>
              <div className="prod-cat">{p.cat}</div>
              <div className="prod-detail">{p.detail}</div>
              <div style={{ marginTop: 7, fontSize: 10, color: 'var(--text3)' }}>{p.authority}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
