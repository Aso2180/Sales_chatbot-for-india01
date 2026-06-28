import { CHECKLIST, HBL_ITEMS, CFS_ITEMS } from '@/data/checklist';

export default function ChecklistTab() {
  return (
    <div>
      <div className="info-box ib-blue" style={{ marginBottom: 14 }}>
        <strong>🚢 船積み前チェックリスト（日本発インド向け）</strong><br />
        <span style={{ fontSize: 11, color: 'var(--text2)' }}>
          🔴 船積み前に必ず確認・早期着手が必要　🟠 余裕を持って対応推奨　🟡 通常手続き
        </span>
      </div>

      <div className="g2">
        <div className="card">
          <div className="ct"><i className="ti ti-file-check" />HBL必須記載事項（全インド共通）</div>
          {HBL_ITEMS.map((kv, i) => (
            <div key={i} style={{ marginBottom: 8, padding: 8, background: 'var(--surface3)', borderRadius: 7 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal-lt)', marginBottom: 3 }}>{kv.k}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.6 }}>{kv.v}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="ct"><i className="ti ti-building-bank" />CFS通関の特徴（インド特有）</div>
          {CFS_ITEMS.map((kv, i) => (
            <div key={i} style={{ marginBottom: 8, padding: 8, background: 'var(--surface3)', borderRadius: 7 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ocean-lt)', marginBottom: 3 }}>{kv.k}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.6 }}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="ct"><i className="ti ti-list-numbers" />全STEPチェックリスト</div>
        {CHECKLIST.map(c => {
          const ncls = c.p === '🔴' ? 'red' : c.p === '🟠' ? 'org' : 'yel';
          return (
            <div key={c.step} className="cl-item">
              <div className={`cl-num ${ncls}`}>{c.step}</div>
              <div style={{ flex: 1 }}>
                <div className="cl-priority">{c.timing}</div>
                <div className="cl-title">{c.item}</div>
                <div className="cl-detail">{c.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
