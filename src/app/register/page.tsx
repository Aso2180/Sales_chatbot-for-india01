'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? '登録に失敗しました');
    } else {
      router.push('/login?registered=1');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: 'var(--surface2)',
        border: '1px solid var(--border2)',
        borderRadius: 'var(--radius)',
        padding: 32,
        boxShadow: '0 4px 24px rgba(0,60,120,0.12)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 48, height: 48,
            background: 'var(--ocean)',
            borderRadius: 12,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            marginBottom: 12,
          }}>🚢</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>インド向け混載 営業支援アプリ</div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>新規アカウント登録</div>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: '名前（ニックネーム可）', value: name,     setter: setName,     type: 'text',     placeholder: '例：田中' },
            { label: 'メールアドレス',         value: email,    setter: setEmail,    type: 'email',    placeholder: 'example@company.com' },
            { label: 'パスワード（8文字以上）', value: password, setter: setPassword, type: 'password', placeholder: '' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>
                {f.label}
              </label>
              <input
                type={f.type}
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                placeholder={f.placeholder}
                required
                style={{
                  width: '100%',
                  background: 'var(--surface3)',
                  border: '1px solid var(--border2)',
                  borderRadius: 8,
                  padding: '9px 12px',
                  fontSize: 13,
                  color: 'var(--text)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          ))}

          {error && (
            <div style={{
              padding: '8px 12px',
              background: 'rgba(239,68,68,.1)',
              border: '1px solid rgba(239,68,68,.3)',
              borderRadius: 7,
              fontSize: 12,
              color: 'var(--red)',
              marginBottom: 14,
            }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'var(--surface3)' : 'var(--ocean)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontSize: 13,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              marginBottom: 14,
            }}
          >
            {loading ? '登録中...' : 'アカウントを作成'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text3)' }}>
          既にアカウントをお持ちの方は{' '}
          <Link href="/login" style={{ color: 'var(--ocean)' }}>ログイン</Link>
        </div>
      </div>
    </div>
  );
}
