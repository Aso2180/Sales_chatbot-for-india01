'use client';

import { useState } from 'react';
import { STATES, StateData } from '@/data/states';

function alcBadge(level: StateData['alcLevel']) {
  if (level === '全面禁酒') return <span className="alc-badge alc-red">全面禁酒🔴</span>;
  if (level === '専売制') return <span className="alc-badge alc-org">専売制🟠</span>;
  return <span className="alc-badge alc-gry">免許制</span>;
}

export default function StatesTab() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = STATES.filter(s =>
    !search ||
    s.jp.includes(search) ||
    s.en.toLowerCase().includes(search.toLowerCase()) ||
    s.port.includes(search) ||
    s.industry.includes(search)
  );

  return (
    <div>
      <div className="search-wrap">
        <i className="ti ti-search" />
        <input
          className="search-inp"
          placeholder="州名・港名・産業で絞り込み..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="info-box ib-gold" style={{ marginBottom: 14, fontSize: 11 }}>
        ⭐ 禁酒州（酒類輸入・搬入完全禁止）：
        <strong style={{ color: 'var(--red)' }}>グジャラート・ビハール・ナガランド・ミゾラム（外国産）・ラクシャドウィープ</strong>
        　クリックで詳細表示
      </div>
      <div className="state-grid">
        {filtered.map(s => (
          <div
            key={s.no}
            className={`sc ${expanded === s.no ? 'expanded' : ''}`}
            onClick={() => setExpanded(expanded === s.no ? null : s.no)}
          >
            <div className="sc-head">
              <div className="sc-name">{s.jp}</div>
              <span className="sc-type">{s.type}</span>
              {alcBadge(s.alcLevel)}
            </div>
            <div className="sc-body">
              <strong style={{ color: 'var(--text2)' }}>港・ICD：</strong>{s.port.split('\n')[0]}<br />
              <strong style={{ color: 'var(--text2)' }}>産業：</strong>{s.industry}
            </div>
            {expanded === s.no && (
              <div className="sc-expand">
                <div style={{ marginBottom: 7 }}>
                  <strong style={{ color: 'var(--ocean-lt)' }}>🚢 入港港・ICD</strong><br />
                  <span style={{ color: 'var(--text2)' }}>{s.port}</span>
                </div>
                <div style={{ marginBottom: 7 }}>
                  <strong style={{ color: 'var(--teal-lt)' }}>🚛 内陸輸送</strong><br />
                  <span style={{ color: 'var(--text2)' }}>{s.inland}</span>
                </div>
                <div style={{ marginBottom: 7 }}>
                  <strong style={{ color: 'var(--gold)' }}>🍶 アルコール規制</strong><br />
                  <span style={{ color: 'var(--text2)' }}>{s.alcohol}</span>
                </div>
                <div style={{ marginBottom: 7 }}>
                  <strong style={{ color: 'var(--text2)' }}>⚠️ 船積み規制・注意事項</strong><br />
                  <span style={{ color: 'var(--text2)' }}>{s.rules}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text2)' }}>📋 必要書類</strong><br />
                  <span style={{ color: 'var(--text3)' }}>{s.docs}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
