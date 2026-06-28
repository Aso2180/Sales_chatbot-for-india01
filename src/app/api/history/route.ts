import { auth } from '@/lib/auth';
import { runQuery } from '@/lib/neo4j';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id as string;

  // 最新の会話セッションのメッセージを取得（最大50件）
  const rows = await runQuery<{ role: string; content: string; timestamp: string }>(
    `MATCH (u:User {id: $userId})-[:HAS_CONVERSATION]->(c:Conversation)
     WITH c ORDER BY c.lastActive DESC LIMIT 1
     MATCH (c)-[:HAS_MESSAGE]->(m:Message)
     RETURN m.role AS role, m.content AS content, toString(m.timestamp) AS timestamp
     ORDER BY m.timestamp ASC
     LIMIT 50`,
    { userId }
  );

  return Response.json({ messages: rows });
}
