'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_CHIPS = [
  '新規顧客に何からアプローチすれば良いか相談したい',
  '顧客からの運賃の問い合わせへの対応を相談したい',
  '神戸→Chennai向けの集荷が思うように進まない',
  '顧客からインドへの輸送の注意事項を聞かれた',
  '今月の自分の数字がチーム目標にどう貢献しているか知りたい',
  '上司への報告のポイントを相談したい',
];

function now_() {
  return new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const msgsEndRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ messages: newMessages, userName }),
      });
      const data = await res.json();
      const reply = data.content ?? 'すみません、うまく取得できませんでした。もう一度お試しください。';

      // 名前の自動抽出（初回返答でユーザーが名前を名乗った場合）
      if (!userName && txt.includes('です') && txt.length < 20) {
        const match = txt.match(/^(.+?)(?:です|と申します)/);
        if (match) setUserName(match[1]);
      }

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: '通信エラーが発生しました。もう一度お試しください。' }]);
    }
    setLoading(false);
  }

  return (
    <div className="chat-panel">
      <div className="chat-hdr">
        <span className="dot-live" />
        <span style={{ fontSize: 15, color: 'var(--ocean-lt)' }}>🤖</span>
        AIアドバイザー
      </div>

      <div className="chat-msgs" id="chatMsgs">
        {/* 初期メッセージ */}
        <div className="m-bot">
          <div className="m-av">🤖</div>
          <div>
            <div className="m-bbl">
              はじめまして。インド向け混載サービスのAIアドバイザーです。<br /><br />
              まず、お名前かニックネームを教えていただけますか？<br />
              より的確なアドバイスができるよう、会話を重ねながら一緒に考えていきます。
            </div>
            <div className="m-time">{now_()}</div>
          </div>
        </div>

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
          <button key={i} className="chip" onClick={() => send(chip)}>
            {chip.length > 14 ? chip.slice(0, 14) + '…' : chip}
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
