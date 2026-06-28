'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { MO, ML, monthly } from '@/data/monthly';
Chart.register(...registerables);

function fmtK(n: number) {
  return n >= 0 ? `+${Math.round(n / 10000)}万` : `-${Math.abs(Math.round(n / 10000))}万`;
}

const CD_BASE = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: '#8eb4cc', font: { size: 10 }, boxWidth: 10 } } },
  scales: {
    x: { ticks: { color: '#4d7a96', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
    y: { ticks: { color: '#4d7a96', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
  },
};

const FILL_RATES = [
  { label: "40'HQ 平均積載量", is40: true,  avg: 21.2, pct: Math.round(21.2 / 37.5 * 100), target: '30〜45', note: "40'HQのみシップメント実績（35本）" },
  { label: "20' 平均積載量",   is40: false, avg: 10.4, pct: Math.round(10.4 / 18   * 100), target: '16〜20', note: "20'のみシップメント実績（47本）" },
];

export default function DashboardTab() {
  const cbmRef    = useRef<HTMLCanvasElement>(null);
  const profitRef = useRef<HTMLCanvasElement>(null);
  const contRef   = useRef<HTMLCanvasElement>(null);
  const charts    = useRef<Chart[]>([]);

  useEffect(() => {
    charts.current.forEach(c => c.destroy());
    charts.current = [];

    if (cbmRef.current) {
      charts.current.push(new Chart(cbmRef.current, {
        type: 'bar',
        data: {
          labels: ML,
          datasets: [
            { label: '集荷CBM', data: MO.map(m => monthly[m].cbm), backgroundColor: 'rgba(14,123,191,.7)', borderColor: '#0e7bbf', borderWidth: 1, borderRadius: 4 },
            { label: '戦略航路CBM（神戸→MAA）', data: MO.map(m => monthly[m].stratCBM), backgroundColor: 'rgba(245,158,11,.65)', borderColor: '#f59e0b', borderWidth: 1, borderRadius: 4 },
          ],
        },
        options: { ...CD_BASE, plugins: { ...CD_BASE.plugins, tooltip: { callbacks: { label: (c: TooltipItem<'bar'>) => `${c.dataset.label}: ${Number(c.raw).toFixed(1)} m³` } } } } as any,
      }));
    }

    if (profitRef.current) {
      charts.current.push(new Chart(profitRef.current, {
        type: 'line',
        data: {
          labels: ML,
          datasets: [{
            label: '月次利益(円)',
            data: MO.map(m => monthly[m].profit),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34,197,94,.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#22c55e',
          }],
        },
        options: {
          ...CD_BASE,
          plugins: { ...CD_BASE.plugins, tooltip: { callbacks: { label: (c: TooltipItem<'line'>) => `¥${Math.round(Number(c.raw)).toLocaleString()}` } } },
          scales: { ...CD_BASE.scales, y: { ...CD_BASE.scales.y, ticks: { ...CD_BASE.scales.y.ticks, callback: (v: unknown) => `${Number(v) >= 0 ? '+' : ''}${(Number(v) / 10000).toFixed(0)}万` } } },
        } as any,
      }));
    }

    if (contRef.current) {
      charts.current.push(new Chart(contRef.current, {
        type: 'bar',
        data: {
          labels: ML,
          datasets: [
            { label: "20' (割高)", data: MO.map(m => monthly[m].f20), backgroundColor: 'rgba(249,115,22,.7)', borderRadius: 3 },
            { label: "40'HQ (推奨)", data: MO.map(m => monthly[m].f40h), backgroundColor: 'rgba(14,180,168,.8)', borderRadius: 3 },
          ],
        },
        options: {
          ...CD_BASE,
          scales: { ...CD_BASE.scales, x: { ...CD_BASE.scales.x, stacked: true }, y: { ...CD_BASE.scales.y, stacked: true, ticks: { ...CD_BASE.scales.y.ticks, callback: (v: unknown) => `${v}本` } } },
        } as any,
      }));
    }

    return () => { charts.current.forEach(c => c.destroy()); };
  }, []);

  const totalCBM    = MO.reduce((s, m) => s + monthly[m].cbm, 0);
  const totalCont   = MO.reduce((s, m) => s + monthly[m].cont, 0);
  const totalF40h   = MO.reduce((s, m) => s + monthly[m].f40h, 0);
  const totalProfit = MO.reduce((s, m) => s + monthly[m].profit, 0);
  const totalShip   = MO.reduce((s, m) => s + monthly[m].ship, 0);

  return (
    <div>
      {/* Goal Banner */}
      <div className="goal-banner">
        <div className="goal-title">🎯 テーマA ゴール｜JIFFAシェア達成ロードマップ</div>
        <div className="goal-main">インド向けJIFFAシェア 5.4% → 3年で 12% へ</div>
        <div className="goal-road">
          {[
            { val: '5.4%', yr: '現状 2025年度', sub: '約3,350t/年', cls: 'cur', subColor: 'var(--gold)' },
            { val: '7%',   yr: '初年度 2026年度', sub: '4,340t/年',  cls: 'now', subColor: 'var(--teal-lt)' },
            { val: '10%',  yr: '2年度 2027年度',  sub: '6,200t/年',  cls: '',    subColor: 'var(--text3)', valColor: 'var(--text2)' },
            { val: '12%',  yr: '3年度 2028年度',  sub: '7,440t/年',  cls: '',    subColor: 'var(--text3)', valColor: 'var(--text2)' },
          ].map((g, i) => (
            <div key={i} className={`gs ${g.cls}`}>
              <div className="gs-val" style={g.valColor ? { color: g.valColor } : {}}>{g.val}</div>
              <div className="gs-yr">{g.yr}</div>
              <div style={{ fontSize: 9, color: g.subColor, marginTop: 1 }}>{g.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="g4">
        <div className="card card-sm">
          <div className="ct"><i className="ti ti-package" />直近5ヶ月 総CBM</div>
          <div className="kv" style={{ color: 'var(--ocean-lt)' }}>{totalCBM.toFixed(0)}</div>
          <div className="kl">m³（2026年1〜5月）</div>
          <div className="kd up"><i className="ti ti-trending-up" />月平均 {(totalCBM / 5).toFixed(0)} m³</div>
        </div>
        <div className="card card-sm">
          <div className="ct"><i className="ti ti-container" />総コンテナ本数</div>
          <div className="kv" style={{ color: 'var(--teal-lt)' }}>{totalCont}</div>
          <div className="kl">本（20&apos;: {totalCont - totalF40h}本 ／ 40HQ: {totalF40h}本）</div>
          <div className="prog-track" style={{ marginTop: 8 }}>
            <div className="prog-fill" style={{ width: `${Math.round(totalF40h / totalCont * 100)}%`, background: 'var(--teal)' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>40HQ比率 {Math.round(totalF40h / totalCont * 100)}%</div>
        </div>
        <div className="card card-sm">
          <div className="ct"><i className="ti ti-cash" />累計利益</div>
          <div className="kv" style={{ color: 'var(--green)' }}>{fmtK(totalProfit)}</div>
          <div className="kl">円（5ヶ月合計）</div>
          <div className="kd nt">月平均 ¥{Math.round(totalProfit / 5 / 10000)}万</div>
        </div>
        <div className="card card-sm">
          <div className="ct"><i className="ti ti-ship" />シップメント数</div>
          <div className="kv" style={{ color: 'var(--gold)' }}>{totalShip}</div>
          <div className="kl">件（月平均{(totalShip / 5).toFixed(1)}件）</div>
          <div className="kd up">月最多：5月 21件</div>
        </div>
      </div>

      {/* FOB/CIF */}
      <div className="g2">
        <div className="card card-sm">
          <div className="ct"><i className="ti ti-percentage" />FOB/CIF比率 ― Chennai(MAA) <span style={{ fontSize: 9, color: 'var(--text3)' }}>2026年5月実績</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div className="kv" style={{ color: 'var(--teal)', fontSize: 26 }}>65%</div>
              <div className="kl">CIF比率</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
                <span style={{ color: 'var(--teal-lt)', fontWeight: 600 }}>CIF ✅ KB収入あり</span>
                <span style={{ color: 'var(--orange)', fontWeight: 600 }}>FOB KB収入なし</span>
              </div>
              <div className="fob-bar">
                <div className="fob-cif" style={{ width: '65%' }}>CIF 65%</div>
                <div className="fob-fob" style={{ width: '35%' }}>FOB 35%</div>
              </div>
            </div>
          </div>
          <div className="info-box ib-teal"><span style={{ color: 'var(--teal-lt)', fontWeight: 700 }}>✅ CIF集荷：KB収入 $40/RT（約¥6,400）が入る</span><br />推計CIF：約635m³→KB収入約¥406万/5ヶ月相当</div>
          <div className="info-box ib-orange" style={{ marginBottom: 0 }}><span style={{ color: 'var(--orange)', fontWeight: 700 }}>📦 FOB集荷：KBはゼロ。ただし40&apos;HQ物量確保に不可欠</span><br />推計FOB：約342m³　目安：$20〜25/CBM</div>
        </div>
        <div className="card card-sm">
          <div className="ct"><i className="ti ti-percentage" />FOB/CIF比率 ― Nhava Sheva(NSA) <span style={{ fontSize: 9, color: 'var(--text3)' }}>2026年5月実績</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div className="kv" style={{ color: 'var(--red)', fontSize: 26 }}>60%</div>
              <div className="kl">FOB比率</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
                <span style={{ color: 'var(--teal-lt)', fontWeight: 600 }}>CIF ✅ KB収入あり</span>
                <span style={{ color: 'var(--red)', fontWeight: 600 }}>FOB KB収入なし ⚠️</span>
              </div>
              <div className="fob-bar">
                <div className="fob-cif" style={{ width: '40%' }}>CIF 40%</div>
                <div className="fob-fob-red" style={{ width: '60%' }}>FOB 60%</div>
              </div>
            </div>
          </div>
          <div className="info-box ib-teal"><span style={{ color: 'var(--teal-lt)', fontWeight: 700 }}>✅ CIF集荷：KB収入 $40/RT（約¥6,400）が入る</span><br />推計CIF：約297m³→KB収入約¥190万/5ヶ月相当<br /><span style={{ color: 'var(--gold)', fontWeight: 600 }}>NSAはCIF切替が最優先課題！</span></div>
          <div className="info-box ib-red" style={{ marginBottom: 0 }}><span style={{ color: 'var(--red)', fontWeight: 700 }}>⚠️ FOB比率60%：KBゼロで収益圧迫。ただし物量確保には必要</span><br />推計FOB：約445m³　目安：$15〜20/CBM</div>
        </div>
      </div>

      {/* Charts */}
      <div className="g2">
        <div className="card"><div className="ct"><i className="ti ti-chart-bar" />月別集荷CBM推移</div><div style={{ position: 'relative', height: 180 }}><canvas ref={cbmRef} /></div></div>
        <div className="card"><div className="ct"><i className="ti ti-chart-line" />月別利益推移</div><div style={{ position: 'relative', height: 180 }}><canvas ref={profitRef} /></div></div>
      </div>
      <div className="g2">
        <div className="card"><div className="ct"><i className="ti ti-chart-bar" />コンテナ種別月別内訳</div><div style={{ position: 'relative', height: 180 }}><canvas ref={contRef} /></div></div>
        <div className="card">
          <div className="ct"><i className="ti ti-activity" />コンテナ積載効率</div>
          <div className="info-box ib-gold" style={{ marginBottom: 10, fontSize: 11 }}>
            💡 <strong style={{ color: 'var(--gold)' }}>40&apos;HQが収益の鍵：</strong>仕入コスト¥378,100固定。CBMが増えるほど1RTコストが下がる。20&apos;は¥334,800で割高。
          </div>
          {FILL_RATES.map((d, i) => {
            const pc = d.pct >= 75 ? 'var(--green)' : d.pct >= 55 ? 'var(--gold)' : 'var(--red)';
            const jdg = d.pct >= 75 ? '良好' : d.pct >= 55 ? '改善余地あり' : '要強化';
            return (
              <div key={i}>
                <div className="ub">
                  <div className="ul" style={{ fontSize: 11 }}>{d.label}</div>
                  <div className="ut"><div className={d.is40 ? 'uf40' : 'uf20'} style={{ width: `${Math.min(d.pct, 100)}%` }} /></div>
                  <div className="up_" style={{ color: pc }}>{d.pct}%</div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 11, marginLeft: 124, lineHeight: 1.6 }}>
                  平均 <strong style={{ color: pc }}>{d.avg} m³</strong>/本　<span style={{ color: pc, fontWeight: 600 }}>{jdg}</span><br />
                  <span>{d.note}　目標：{d.target}m³</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Table */}
      <div className="card">
        <div className="sh"><h3>📋 月別サマリー</h3></div>
        <table className="dtbl">
          <thead>
            <tr><th>月</th><th>CBM</th><th>件数</th><th>コンテナ</th><th>20&apos;</th><th>40&apos;HQ</th><th>40HQ比率</th><th>月次利益</th><th>評価</th></tr>
          </thead>
          <tbody>
            {MO.map(m => {
              const d = monthly[m];
              const r40 = Math.round(d.f40h / d.cont * 100);
              return (
                <tr key={m}>
                  <td><strong>{m.replace('2026-', '')}月</strong></td>
                  <td><strong>{d.cbm.toFixed(1)}</strong></td>
                  <td>{d.ship}件</td>
                  <td>{d.cont}本</td>
                  <td>{d.f20}本</td>
                  <td>{d.f40h}本</td>
                  <td><span className={`pill ${r40 >= 50 ? 'p-green' : 'p-gold'}`}>{r40}%</span></td>
                  <td><span className={`pill ${d.profit >= 0 ? 'p-green' : 'p-red'}`}>{fmtK(d.profit)}</span></td>
                  <td>{d.cbm > 400 ? '🟢 良好' : d.cbm > 300 ? '🟡 普通' : '🔴 要強化'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
