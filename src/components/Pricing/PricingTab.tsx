export default function PricingTab() {
  return (
    <div>
      <div className="g2">
        <div className="card">
          <div className="ct"><i className="ti ti-building-store" />当社仕入コスト（ONE買値）</div>
          <table className="dtbl">
            <thead>
              <tr>
                <th>仕向地</th><th>コンテナ</th><th>O.Freight</th>
                <th>諸チャージ</th><th>円貨Total(¥160/$)</th><th>混載効率</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chennai(MAA)</td>
                <td><span className="pill p-blue">20&apos;</span></td>
                <td>$1,800</td><td>$15</td>
                <td style={{ color: 'var(--red-lt)' }}>¥334,800</td><td>12/TEU</td>
              </tr>
              <tr>
                <td>Chennai(MAA)</td>
                <td><span className="pill p-green">40&apos;HQ</span></td>
                <td>$1,950</td><td>$20</td>
                <td style={{ color: 'var(--green)' }}>¥378,100</td><td>24/FEU</td>
              </tr>
              <tr>
                <td>Nhava Sheva(NSA)</td>
                <td><span className="pill p-blue">20&apos;</span></td>
                <td>$1,800</td><td>$15</td>
                <td style={{ color: 'var(--red-lt)' }}>¥334,800</td><td>12/TEU</td>
              </tr>
              <tr>
                <td>Nhava Sheva(NSA)</td>
                <td><span className="pill p-green">40&apos;HQ</span></td>
                <td>$1,950</td><td>$20</td>
                <td style={{ color: 'var(--green)' }}>¥378,100</td><td>24/FEU</td>
              </tr>
            </tbody>
          </table>
          <div className="info-box ib-red" style={{ marginTop: 10, marginBottom: 0 }}>
            ⚠️ <strong>20&apos;は割高構造：</strong>20&apos;と40&apos;HQのコスト差¥43,300だが積載量は
            20&apos; 16〜20m³ vs 40&apos;HQ 30〜45m³。物量を集めて40&apos;HQに積み込むことが収益最大化の鍵。
          </div>
        </div>

        <div className="card">
          <div className="ct"><i className="ti ti-users" />競合比較（同業者からの卸値 per RT）</div>
          <table className="dtbl">
            <thead>
              <tr><th>競合</th><th>O.Freight</th><th>諸チャージ</th><th>ローカル</th><th>円貨Total</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>NTL</strong></td><td>$60</td><td>$40</td><td>¥6,000〜7,000</td><td style={{ color: 'var(--green)' }}>¥22,000</td></tr>
              <tr><td><strong>セイノー</strong></td><td>$40</td><td>$80</td><td>¥7,000</td><td style={{ color: 'var(--green)' }}>¥26,200</td></tr>
              <tr><td><strong>ECU</strong></td><td>$70</td><td>$68</td><td>¥7,000</td><td>¥29,080</td></tr>
            </tbody>
          </table>
          <div className="info-box ib-gray" style={{ marginTop: 10, marginBottom: 0, fontSize: 11, lineHeight: 1.7 }}>
            📌 <strong style={{ color: 'var(--teal-lt)' }}>KB収入はCIFのみ：</strong>港止め $40/RT（¥6,400）、内陸 $75/BL（¥12,000）<br />
            📌 <strong style={{ color: 'var(--orange)' }}>FOBはKBゼロ</strong>だが40&apos;HQ物量確保に不可欠（積載効率向上でコスト分散）<br />
            📌 FOB比率実績：Chennai 35% / Nhava Sheva 60%（NSAはCIF切替が急務）<br />
            📌 FOBレート：JBP→Chennai $20〜25/CBM　JBP→NSA $15〜20/CBM
          </div>
        </div>
      </div>

      <div className="card">
        <div className="ct"><i className="ti ti-coin" />売値ガイドライン案（底値参照値 ― Bidを除く）per RT</div>

        <div style={{ marginBottom: 14 }}>
          <div className="price-sect-ttl">【港止め：MAA / NSA】</div>
          <table className="dtbl">
            <thead>
              <tr>
                <th>顧客区分</th><th>O.Freight</th><th>PSS</th><th>ドル計</th>
                <th>ローカルチャージ合計</th><th>└ CFS</th><th>└ THC</th><th>└ EDC</th>
                <th>円計</th><th>KB</th><th>収入TTL/RT</th>
                <th>20&apos;コスト</th><th>40&apos;コスト</th><th>判定</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BCO</strong></td>
                <td>$60</td><td>$60</td><td>$120</td>
                <td style={{ fontWeight: 700 }}>¥7,500</td>
                <td style={{ color: 'var(--text3)' }}>¥5,000</td>
                <td style={{ color: 'var(--text3)' }}>¥1,500</td>
                <td style={{ color: 'var(--text3)' }}>¥1,000</td>
                <td>¥26,700</td><td>¥6,400</td>
                <td style={{ color: 'var(--green)', fontWeight: 700 }}>¥33,100</td>
                <td style={{ color: 'var(--red)' }}>¥27,914</td>
                <td style={{ color: 'var(--green)' }}>¥17,504</td>
                <td><span className="pill p-green">40&apos;HQ○</span></td>
              </tr>
              <tr>
                <td><strong>同業者</strong></td>
                <td>$40</td><td>$40</td><td>$80</td>
                <td style={{ fontWeight: 700 }}>¥6,500</td>
                <td style={{ color: 'var(--text3)' }}>¥4,000</td>
                <td style={{ color: 'var(--text3)' }}>¥1,500</td>
                <td style={{ color: 'var(--text3)' }}>¥1,000</td>
                <td>¥19,300</td><td>¥6,400</td>
                <td style={{ color: 'var(--gold)', fontWeight: 700 }}>¥25,700</td>
                <td style={{ color: 'var(--red)' }}>¥27,914</td>
                <td style={{ color: 'var(--green)' }}>¥17,504</td>
                <td><span className="pill p-gold">40&apos;HQ要確認</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div className="price-sect-ttl">【内陸仕向地 BCO向け】</div>
          <table className="dtbl">
            <thead>
              <tr><th>仕向地</th><th>ドル計</th><th>ローカル</th><th>円計</th><th>KB</th><th>収入TTL/RT</th><th>20&apos;コスト</th><th>40&apos;コスト</th><th>判定</th></tr>
            </thead>
            <tbody>
              {[
                { dest: 'Bangalore', usd: '$160', local: '¥7,500', jpy: '¥33,100', kb: '¥4,000', ttl: '¥37,100', c20: '¥30,314', c40: '¥19,904', badge: '40\'HQ◎', cls: 'p-green', c20c: 'red', c40c: 'green' },
                { dest: 'Hyderabad', usd: '$170', local: '¥7,500', jpy: '¥34,700', kb: '¥4,000', ttl: '¥38,700', c20: '¥31,114', c40: '¥20,704', badge: '40\'HQ◎', cls: 'p-green', c20c: 'red', c40c: 'green' },
                { dest: 'Garhi / Patparganj / TKD / AMD', usd: '$190', local: '¥7,500', jpy: '¥37,900', kb: '¥4,000', ttl: '¥41,900', c20: '¥34,314〜', c40: '¥23,904〜', badge: '40\'HQ◎', cls: 'p-green', c20c: 'orange', c40c: 'green' },
                { dest: 'Ludhiana', usd: '$240', local: '¥7,500', jpy: '¥45,900', kb: '¥4,000', ttl: '¥49,900', c20: '¥41,514', c40: '¥31,104', badge: '40\'HQ◎', cls: 'p-green', c20c: 'orange', c40c: 'green' },
              ].map((r, i) => (
                <tr key={i}>
                  <td>{r.dest}</td>
                  <td>{r.usd}</td><td>{r.local}</td><td>{r.jpy}</td><td>{r.kb}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>{r.ttl}</td>
                  <td style={{ color: `var(--${r.c20c})` }}>{r.c20}</td>
                  <td style={{ color: `var(--${r.c40c})` }}>{r.c40}</td>
                  <td><span className={`pill ${r.cls}`}>{r.badge}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-box ib-gold" style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 5 }}>⭐ 戦略航路は価格より物量優先</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.7 }}>
            <strong>神戸(UKB)→Chennai(MAA)：</strong>物量が不足しているので兎に角取りに行く<br />
            <strong>名古屋(NGO)→Nhava Sheva(NSA)：</strong>新規サービス開始予定。レートに関係なく物量を確保して安定したサービスにする
          </div>
        </div>
      </div>
    </div>
  );
}
