import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    // 🔁 MOCK MODE
    if (process.env.NODE_ENV === 'development' || process.env.MOCK_MODE === 'true') {
        const lastUserMessage = messages.findLast((msg: any) => msg.role === 'user')?.content || '';

        const mockReply = getMockReply(lastUserMessage);

        return NextResponse.json({
            reply: {
                role: 'assistant',
                content: mockReply,
            },
        });
    }
    // 🧠 REAL API CALL
    try {

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages,
            temperature: 0.7,
        });

        return NextResponse.json({ reply: completion.choices[0].message });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return NextResponse.json({ error: 'Failed to generate reply' });
    }
}

// ✨ Helper function to customize mock replies
function getMockReply(input: string): string {
  if (input.toLowerCase().includes('idea')) {
    return '🧠 Let’s turn that idea into something the world needs.';
  }
  if (input.toLowerCase().includes('price')) {
    return '💸 Let’s brainstorm a Good / Better / Best pricing tier.';
  }
  if (input.toLowerCase().includes('validate')) {
    return '✅ We can design a quick landing page and 3 social posts to test your idea.';
  }

  return `🤖 [Mock Reply] You said: "${input}". Let's build your digital product together!`;
}
