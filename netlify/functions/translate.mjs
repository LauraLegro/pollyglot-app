import OpenAI from "openai";

export default async (req) => {
  const { text, language } = await req.json();

  const openai = new OpenAI({
    apiKey: Netlify.env.get("OPENAI_API_KEY"),
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a professional translator. Translate the user's text into the language they request. Respond with only the translated text — no explanations, no extra words.",
      },
      {
        role: "user",
        content: `Translate the following text into ${language}: ${text}`,
      },
    ],
    temperature: 0,
  });

  const translation = response.choices[0].message.content;

  return new Response(JSON.stringify({ translation }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/translate",
};
