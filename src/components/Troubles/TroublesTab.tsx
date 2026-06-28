import { TROUBLES, TROUBLE_ICONS } from '@/data/troubles';

export default function TroublesTab() {
  return (
    <div>
      <div className="info-box ib-gray" style={{ marginBottom: 14, fontSize: 11 }}>
        💡 インド向け輸送でよく発生するトラブルと、その原因・回避策をまとめています。事前に把握しておくことで多くのリスクを防ぐことができます。
      </div>
      {TROUBLES.map((t, i) => {
        const fi = t.freq.includes('高頻度') || t.freq.includes('極めて') ? 'p-red'
          : t.freq.includes('中頻度') ? 'p-gold' : 'p-gray';
        return (
          <div key={i} className="trouble-item">
            <div className="trouble-hdr">
              <div className="trouble-icon">{TROUBLE_ICONS[i] ?? '⚠️'}</div>
              <div>
                <div className="trouble-title">{t.title}</div>
                <div className="trouble-freq">
                  <span className={`pill ${fi}`}>{t.freq}</span>
                </div>
              </div>
            </div>
            <div className="trouble-body">
              <div>
                <div className="trouble-lbl">発生原因</div>
                <div style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{t.cause}</div>
              </div>
              <div>
                <div className="trouble-lbl" style={{ color: 'var(--teal)' }}>回避策・対処法</div>
                <div style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{t.solution}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
