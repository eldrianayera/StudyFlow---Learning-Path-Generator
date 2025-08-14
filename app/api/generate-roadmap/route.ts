import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const topic = body.topic;

  if (!topic || typeof topic !== "string") {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const prompt = `Create an 8-week learning roadmap for the topic "${topic}". Each week should have 3-4 tasks. 
Return ONLY a JSON array in this format:

[
  {
    "title": "Week 1: ...",
    "tasks": ["task 1", "task 2", "task 3"]
  },
  {
    "title": "Week 2: ...",
    "tasks": ["task 1", "task 2", "task 3"]
  }
  ...
]

Do NOT include any extra text, code blocks, backticks, explanations, or markdown. Only return the JSON array. The "title" must start with "Week N: ..." and "tasks" must be an array of strings.`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    let roadmap;
    try {
      roadmap = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse roadmap. Ensure AI returned valid JSON." },
        { status: 500 }
      );
    }

    return NextResponse.json({ roadmap }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch from OpenAI" },
      { status: 500 }
    );
  }
}
