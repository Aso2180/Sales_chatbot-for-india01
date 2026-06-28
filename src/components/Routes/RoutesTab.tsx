'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { routes, RNAMES, RCOLS, STRAT, routeKeys } from '@/data/routes';
import { MO, ML, monthly } from '@/data/monthly';
Chart.register(...registerables);

function fmtK(n: number) {
  return n >= 0 ? `+${Math.round(n / 10000)}万` : `-${Math.abs(Math.round(n / 10000))}万`;
}

const CD = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: '#8eb4cc', font: { size: 10 }, boxWidth: 10 } } },
  scales: {
    x: { ticks: { color: '#4d7a96', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
    y: { ticks: { color: '#4d7a96', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
  },
};

export default function RoutesTab() {
  const cbmRef = useRef<HTMLCanvasElement>(null);
  const profitRef = useRef<HTMLCanvasElement>(null);
  const cbmChart = useRef<Chart | null>(null);
  const profitChart = useRef<Chart | null>(null);

  const rUKBMAA = routes['JPUKB-INMAA'];

  useEffect(() => {
    if (cbmRef.current) {
      if (cbmChart.current) cbmChart.current.destroy();
      cbmChart.current = new Chart(cbmRef.current, {
        type: 'line',
        data: {
          labels: ML,
          datasets: routeKeys.map((k, i) => ({
            label: RNAMES[k] ?? k,
            data: MO.map(m => routes[k].bm[m]?.cbm ?? 0),
            borderColor: RCOLS[i],
            backgroundColor: RCOLS[i] + '22',
            tension: 0.3,
            pointRadius: 3,
            fill: false,
            borderDash: STRAT.includes(k) ? [5, 3] : [],
            borderWidth: STRAT.includes(k) ? 2.5 : 1.5,
          })),
        },
        options: { ...CD, plugins: { ...CD.plugins, legend: { ...CD.plugins.legend, position: 'bottom' } } } as any,
      });
    }

    if (profitRef.current) {
      if (profitChart.current) profitChart.current.destroy();
      profitChart.current = new Chart(profitRef.current, {
        type: 'bar',
        data: {
          labels: ML,
          datasets: routeKeys.map((k, i) => ({
            label: RNAMES[k] ?? k,
            data: MO.map(m => routes[k].bm[m]?.p ?? 0),
            backgroundColor: RCOLS[i] + '99',
            borderRadius: 3,
          })),
        },
        options: {
          ...CD,
          plugins: { ...CD.plugins, legend: { ...CD.plugins.legend, position: 'bottom' } },
          scales: {
            ...CD.scales,
            x: { ...CD.scales.x, stacked: true },
            y: { ...CD.scales.y, stacked: true, ticks: { ...CD.scales.y.ticks, callback: (v: unknown) => `${Number(v) >= 0 ? '+' : ''}${(Number(v) / 10000).toFixed(0)}万` } },
          },
        } as any,
      });
    }

    return () => {
      cbmChart.current?.destroy();
      profitChart.current?.destroy();
    };
  }, []);

  const sortedRoutes = Object.entries(routes).sort((a, b) => b[1].cbm - a[1].cbm);

  return (
    <div>
      <div className="strat-grid">
        <div className="strat-card">
          <div className="strat-head">⭐ 戦略航路①（既存・投資フェーズ）</div>
          <div className="strat-route">神戸(UKB) → Chennai(MAA)</div>
          <div className="strat-note">物量不足でしばしばノーサービス。赤字でも混載バンを仕立て、サービス安定供給を最優先。</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 8 }}>
            <div><div style={{ fontSize: 14, fontWeight: 700 }}>{rUKBMAA.cbm.toFixed(0)} m³</div><div style={{ fontSize: 10, color: 'var(--text3)' }}>5ヶ月累計</div></div>
            <div><div style={{ fontSize: 14, fontWeight: 700 }}>{rUKBMAA.cont}本</div><div style={{ fontSize: 10, color: 'var(--text3)' }}>コンテナ</div></div>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--red)' }}>{fmtK(rUKBMAA.profit)}</div><div style={{ fontSize: 10, color: 'var(--text3)' }}>累計利益</div></div>
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'var(--gold)' }}>⚠️ 赤字許容中（戦略的投資フェーズ）</div>
        </div>
        <div className="strat-card">
          <div className="strat-head">⭐ 戦略航路②（新規・未開始）</div>
          <div className="strat-route">名古屋(NGO) → Nhava Sheva(NSA)</div>
          <div className="strat-note">新規サービス開設予定。まだ実績ゼロ。レート不問で物量確保を最優先とする。</div>
          <div className="info-box ib-red" style={{ marginBottom: 6, marginTop: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700 }}>🔴 現状：サービス未開始（実績ゼロ）</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 3, lineHeight: 1.6 }}>
              初期は神戸へのトラック回送前提でサービス開始を優先。<br />
              <strong style={{ color: 'var(--gold)' }}>レート不問で物量確保が最優先ミッション。</strong>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gold)' }}>→ 今すぐ名古屋の荷主・同業者へのアプローチを開始</div>
        </div>
      </div>

      <div className="route-grid">
        {sortedRoutes.map(([k, d]) => {
          const isS = STRAT.includes(k);
          const pc = d.profit >= 0 ? 'pos' : 'neg';
          return (
            <div key={k} className={`rc ${isS ? 'strategic' : ''}`}>
              <div className="rc-name">
                {RNAMES[k] ?? k}
                <span className={`pbadge ${pc}`}>{fmtK(d.profit)}</span>
              </div>
              <div className="rc-stats">
                <div><div className="rc-sv" style={{ color: 'var(--ocean-lt)' }}>{d.cbm.toFixed(0)}</div><div className="rc-sl">CBM合計</div></div>
                <div><div className="rc-sv">{d.cont}</div><div className="rc-sl">コンテナ</div></div>
                <div>
                  <div className="rc-sv" style={{ color: d.f40h / d.cont > 0.5 ? 'var(--teal-lt)' : 'var(--orange)' }}>
                    {Math.round(d.f40h / d.cont * 100)}%
                  </div>
                  <div className="rc-sl">40HQ比率</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="g2">
        <div className="card">
          <div className="ct"><i className="ti ti-chart-bar" />航路別月次CBM推移</div>
          <div style={{ position: 'relative', height: 200 }}><canvas ref={cbmRef} /></div>
        </div>
        <div className="card">
          <div className="ct"><i className="ti ti-cash" />航路別月次利益推移</div>
          <div style={{ position: 'relative', height: 200 }}><canvas ref={profitRef} /></div>
        </div>
      </div>

      <div className="card">
        <div className="ct"><i className="ti ti-table" />航路別月次データ</div>
        <table className="dtbl">
          <thead>
            <tr><th>航路</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>累計CBM</th><th>累計利益</th></tr>
          </thead>
          <tbody>
            {routeKeys.map(k => {
              const d = routes[k];
              const isS = STRAT.includes(k);
              return (
                <tr key={k}>
                  <td><strong style={isS ? { color: 'var(--gold)' } : {}}>{isS ? '⭐ ' : ''}{RNAMES[k] ?? k}</strong></td>
                  {MO.map(m => {
                    const md = d.bm[m];
                    if (!md || md.cbm === 0) return <td key={m} style={{ color: 'var(--text3)' }}>-</td>;
                    return (
                      <td key={m}>
                        <span style={{ fontSize: 11 }}>{md.cbm.toFixed(0)}m³</span><br />
                        <span style={{ fontSize: 10, color: md.p >= 0 ? 'var(--green)' : 'var(--red)' }}>{fmtK(md.p)}</span>
                      </td>
                    );
                  })}
                  <td><strong>{d.cbm.toFixed(0)}</strong></td>
                  <td><span style={{ color: d.profit >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{fmtK(d.profit)}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
