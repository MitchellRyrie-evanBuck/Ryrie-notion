import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://api.openai-proxy.com/v1"
});

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages,
  });

  return result.toDataStreamResponse();
}
