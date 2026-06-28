'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
import ChatPanel from '@/components/Chat/ChatPanel';

const DashboardTab  = dynamic(() => import('@/components/Dashboard/DashboardTab'),  { ssr: false });
const RoutesTab     = dynamic(() => import('@/components/Routes/RoutesTab'),         { ssr: false });
const PricingTab    = dynamic(() => import('@/components/Pricing/PricingTab'),       { ssr: false });
const GoalsTab      = dynamic(() => import('@/components/Goals/GoalsTab'),           { ssr: false });
const ChecklistTab  = dynamic(() => import('@/components/Checklist/ChecklistTab'),   { ssr: false });
const StatesTab     = dynamic(() => import('@/components/States/StatesTab'),         { ssr: false });
const ProductsTab   = dynamic(() => import('@/components/Products/ProductsTab'),     { ssr: false });
const TroublesTab   = dynamic(() => import('@/components/Troubles/TroublesTab'),     { ssr: false });

const TABS = [
  { id: 'dash',      label: '集荷ダッシュボード', icon: 'ti-chart-bar'       },
  { id: 'routes',    label: '航路別分析',          icon: 'ti-map'             },
  { id: 'pricing',   label: '売値ガイドライン',    icon: 'ti-coin'            },
  { id: 'goals',     label: 'ゴール＆アクション',  icon: 'ti-target'          },
  { id: 'checklist', label: '船積み手順',          icon: 'ti-checklist'       },
  { id: 'states',    label: '州別規制',            icon: 'ti-building'        },
  { id: 'products',  label: '品目別規制',          icon: 'ti-package'         },
  { id: 'troubles',  label: 'トラブル対処',        icon: 'ti-alert-triangle'  },
] as const;

type TabId = typeof TABS[number]['id'];

interface Props {
  userName: string;
}

export default function MainApp({ userName }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('dash');

  return (
    <>
      <div className="hdr">
        <div className="hdr-logo">🚢</div>
        <div>
          <div className="hdr-title">インド向け混載 営業支援アプリ</div>
          <div className="hdr-sub">集荷ダッシュボード × 船積みガイド × AIアドバイザー</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="hdr-badge">🤖 AI搭載 ・ データ基準：2026年1〜5月</div>
          <div style={{ fontSize: 11, color: 'var(--text2)' }}>👤 {userName}</div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{
              fontSize: 10,
              padding: '3px 10px',
              borderRadius: 20,
              border: '1px solid var(--border2)',
              background: 'transparent',
              color: 'var(--text3)',
              cursor: 'pointer',
            }}
          >
            ログアウト
          </button>
        </div>
      </div>

      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`ti ${tab.icon}`} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="layout">
        <div className="content">
          {activeTab === 'dash'      && <DashboardTab />}
          {activeTab === 'routes'    && <RoutesTab />}
          {activeTab === 'pricing'   && <PricingTab />}
          {activeTab === 'goals'     && <GoalsTab />}
          {activeTab === 'checklist' && <ChecklistTab />}
          {activeTab === 'states'    && <StatesTab />}
          {activeTab === 'products'  && <ProductsTab />}
          {activeTab === 'troubles'  && <TroublesTab />}
        </div>
        <ChatPanel userName={userName} />
      </div>
    </>
  );
}
