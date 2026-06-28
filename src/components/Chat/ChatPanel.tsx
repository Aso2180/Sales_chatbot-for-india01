'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_CHIPS = [
  { label: '新規アプローチ', text: '新規顧客に何からアプローチすれば良いか相談したい' },
  { label: '運賃対応',       text: '顧客からの運賃の問い合わせへの対応を相談したい' },
  { label: '集荷が進まない', text: '神戸→Chennai向けの集荷が思うように進まない' },
  { label: '注意事項の相談', text: '顧客からインドへの輸送の注意事項を聞かれた' },
  { label: '目標への貢献',   text: '今月の自分の数字がチーム目標にどう貢献しているか知りたい' },
  { label: '上司への報告',   text: '上司への報告のポイントを相談したい' },
];

function now_() {
  return new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
}

interface Props {
  userName: string;
}

export default function ChatPanel({ userName }: Props) {
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState('');
  const [loading, setLoading]             = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement>(null);

  // 会話履歴の復元
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch('/api/history');
        if (!res.ok) return;
        const data = await res.json();
        if (data.messages?.length > 0) {
          setMessages(data.messages.map((m: { role: 'user' | 'assistant'; content: string }) => ({
            role: m.role,
            content: m.content,
          })));
        }
      } catch {
        // 履歴取得失敗は無視
      } finally {
        setHistoryLoaded(true);
      }
    }
    loadHistory();
  }, []);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text?: string) {
    const txt = (text ?? input).trim();
    if (!txt || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: txt };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          conversationId,
        }),
      });
      const data = await res.json();
      const reply = data.content ?? 'すみません、うまく取得できませんでした。もう一度お試しください。';
      if (data.conversationId) setConversationId(data.conversationId);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: '通信エラーが発生しました。もう一度お試しください。' }]);
    }
    setLoading(false);
  }

  const showWelcome = historyLoaded && messages.length === 0;

  return (
    <div className="chat-panel">
      <div className="chat-hdr">
        <span className="dot-live" />
        <span style={{ fontSize: 15, color: 'var(--ocean-lt)' }}>🤖</span>
        AIアドバイザー
        {userName && (
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text3)' }}>
            👤 {userName}
          </span>
        )}
      </div>

      <div className="chat-msgs">
        {showWelcome && (
          <div className="m-bot">
            <div className="m-av">🤖</div>
            <div>
              <div className="m-bbl">
                {userName ? (
                  <>こんにちは、<strong>{userName}</strong>さん！<br /><br />インド向け混載サービスのAIアドバイザーです。今日はどんなことを相談しますか？</>
                ) : (
                  <>はじめまして。インド向け混載サービスのAIアドバイザーです。<br /><br />まず、お名前かニックネームを教えていただけますか？</>
                )}
              </div>
              <div className="m-time">{now_()}</div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'm-user' : 'm-bot'}>
            <div className="m-av">{m.role === 'user' ? '👤' : '🤖'}</div>
            <div>
              <div className="m-bbl" style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
              <div className="m-time">{now_()}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="m-bot">
            <div className="m-av">🤖</div>
            <div className="m-bbl">
              <div className="typing-dots">
                <div className="td" /><div className="td" /><div className="td" />
              </div>
            </div>
          </div>
        )}
        <div ref={msgsEndRef} />
      </div>

      <div className="quick-chips">
        {QUICK_CHIPS.map((chip, i) => (
          <button key={i} className="chip" onClick={() => send(chip.text)}>
            {chip.label}
          </button>
        ))}
      </div>

      <div className="chat-inp-wrap">
        <input
          className="chat-inp"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="相談内容を入力してください..."
        />
        <button className="chat-send" onClick={() => send()}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
