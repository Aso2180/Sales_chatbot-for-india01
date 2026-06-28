import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { runQuery } from '@/lib/neo4j';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return Response.json({ error: '全ての項目を入力してください' }, { status: 400 });
    }
    if (password.length < 8) {
      return Response.json({ error: 'パスワードは8文字以上にしてください' }, { status: 400 });
    }

    // 既存ユーザー確認
    const existing = await runQuery(
      'MATCH (u:User {email: $email}) RETURN u',
      { email }
    );
    if (existing.length > 0) {
      return Response.json({ error: 'このメールアドレスは既に登録されています' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = randomUUID();

    await runQuery(
      `CREATE (u:User {
        id: $id,
        email: $email,
        name: $name,
        passwordHash: $passwordHash,
        createdAt: datetime()
      })`,
      { id, email, name, passwordHash }
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Register error:', error);
    return Response.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
