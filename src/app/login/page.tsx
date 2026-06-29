'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError('メールアドレスまたはパスワードが正しくありません');
    } else {
      router.push('/');
      router.refresh();
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
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>ログイン</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            }}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text3)' }}>
          アカウントをお持ちでない方は{' '}
          <Link href="/register" style={{ color: 'var(--ocean)' }}>新規登録</Link>
        </div>
      </div>
    </div>
  );
}
