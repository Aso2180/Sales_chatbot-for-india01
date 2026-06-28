'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ACTIONS = [
  { n: 1, t: 'Bidの積極応札（TJ4はインド向けCIF比率6%と低い。2026年5月実績）', o: 'TJ1〜4の各営業セグメント' },
  { n: 2, t: 'GGL・OECLのFOB案件受注率アップ（2か月に1回程度の定期会議で定点観測・働きかけ）', o: '事業部＆ノミネチーム' },
  { n: 3, t: 'インド税関データを使用した既存顧客の深堀り', o: '事業部' },
  { n: 4, t: 'KF・FSのFOBシッパーリストを使った新規開拓', o: 'TJ1〜4の各営業セグメント' },
  { n: 5, t: 'TJ4のCIF集荷（現状インド向けCIF比率が極めて少ない）', o: 'TJ4／事業部' },
  { n: 6, t: '売りやすい売値設定（OF$30、IL$40？）', o: '事業部（2026年6月中にヒアリング）' },
];

export default function GoalsTab() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['2025年度（現状）', '2026年度（初年度）', '2027年度', '2028年度（目標）'],
        datasets: [{
          label: '目標トン数/年',
          data: [3350, 4340, 6200, 7440],
          backgroundColor: [
            'rgba(94,114,142,.6)', 'rgba(14,123,191,.8)',
            'rgba(14,180,168,.8)', 'rgba(34,197,94,.8)',
          ],
          borderRadius: 5,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#4d7a96', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { ticks: { color: '#4d7a96', font: { size: 10 }, callback: (v) => `${Number(v).toLocaleString()}t` }, grid: { color: 'rgba(255,255,255,0.04)' } },
        },
      },
    });
    return () => { chartInstance.current?.destroy(); };
  }, []);

  return (
    <div>
      <div className="g2">
        <div className="card">
          <div className="ct"><i className="ti ti-target" />年度別トン数目標</div>
          <div style={{ position: 'relative', height: 160 }}>
            <canvas ref={chartRef} />
          </div>
          <div className="info-box ib-gray" style={{ marginTop: 10, marginBottom: 0, fontSize: 11, lineHeight: 1.7 }}>
            初年度は戦略2サービス赤字許容 → 2年目から黒字化が投資基準。<br />
            JIFFA全体インド向け：約62,000トン/年
          </div>
        </div>
        <div className="card">
          <div className="ct"><i className="ti ti-checklist" />アクションプラン（テーマA 全6項目）</div>
          {ACTIONS.map(a => (
            <div key={a.n} className="act-item">
              <div className="act-n">{a.n}</div>
              <div>
                <div className="act-txt">{a.t}</div>
                <div className="act-own">👤 {a.o}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="ct"><i className="ti ti-bulb" />投資方針（鶏先行）</div>
        <div className="g2">
          <div className="info-box ib-red" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', marginBottom: 5 }}>📍 現状の課題</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.7 }}>
              • 名古屋→Nhava Sheva向けサービスが無い<br />
              • 神戸→Chennai向けは物量不足でノーサービスがしばしば発生<br />
              • サービス不安定による顧客離脱リスク
            </div>
          </div>
          <div className="info-box ib-teal" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal-lt)', marginBottom: 5 }}>✅ 対応策</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.7 }}>
              • 名古屋発NSA向け混載サービスを<strong>新規開設</strong>（初期は神戸へトラック回送）<br />
              • 神戸発Chennai向けは<strong>赤字でも混載バンを仕立て</strong>安定供給優先<br />
              • 初年度赤字許容 → 2年目から黒字化
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
