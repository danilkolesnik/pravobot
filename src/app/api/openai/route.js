import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { sample } = await req.json();

    const prompt = `
      Форматуй текст таким чином, щоб усі відмінки всього тексту були у відповідності. У жодному разі не чіпай кастомні елементи розмітки. Поверни строку в повному розмірі.
      
      Ось текст:
      ${sample}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a text helper' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
      n: 1,
    });

    const generatedSample = response.choices[0].message.content;

    return NextResponse.json({ generatedSample });

  } catch (error) {
    console.error('Error in generating sample:', error);
    return NextResponse.json({ error: error.message || 'An error occurred while generating pain points' }, { status: 500 });
  }
  
}
