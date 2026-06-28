import Anthropic from '@anthropic-ai/sdk';
import { randomUUID } from 'crypto';
import { auth } from '@/lib/auth';
import { runQuery } from '@/lib/neo4j';
import { buildSystemPrompt } from '@/lib/prompts/advisor';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { messages, conversationId } = await req.json();
    const userId   = session.user.id as string;
    const userName = session.user.name ?? '';

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: buildSystemPrompt(userName),
      messages,
    });

    const assistantText = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    // Neo4jに会話履歴を保存
    const convId = conversationId ?? randomUUID();
    const lastMsg = messages[messages.length - 1];

    await runQuery(
      `MERGE (u:User {id: $userId})
       MERGE (c:Conversation {id: $convId})
         ON CREATE SET c.startedAt = datetime()
       SET c.lastActive = datetime()
       MERGE (u)-[:HAS_CONVERSATION]->(c)
       CREATE (mu:Message {
         id: $muId, role: 'user', content: $userContent,
         timestamp: datetime()
       })
       CREATE (ma:Message {
         id: $maId, role: 'assistant', content: $assistantContent,
         timestamp: datetime()
       })
       CREATE (c)-[:HAS_MESSAGE]->(mu)
       CREATE (c)-[:HAS_MESSAGE]->(ma)`,
      {
        userId,
        convId,
        muId: randomUUID(),
        userContent: lastMsg.content,
        maId: randomUUID(),
        assistantContent: assistantText,
      }
    );

    return Response.json({ content: assistantText, conversationId: convId });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
