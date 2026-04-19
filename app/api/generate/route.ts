import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { fields, prompt } = await req.json();

    const fieldLines = Object.entries(fields)
      .map(([key, value]) => `${key}: ${value ?? "N/A"}`)
      .join("\n");

    const messages = [
      {
        role: "system",
        content: "You are a wealth management analyst. Calculate total net worth, asset allocation percentages, and debt-to-asset ratio. Compare allocation to age-based benchmarks (e.g., Rule of 100, target-date models). Provide diversification recommendations, FIRE progress assessment, and a 5-year net worth projection.",
      },
      {
        role: "user",
        content: `${prompt}\n\n**Input Data:**\n${fieldLines}`,
      },
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `API error: ${err}` }, { status: 500 });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
