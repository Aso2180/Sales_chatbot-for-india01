import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/prompts/advisor';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, userName } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: buildSystemPrompt(userName),
      messages,
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return Response.json({ error: 'Unexpected response type' }, { status: 500 });
    }

    return Response.json({ content: content.text });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
