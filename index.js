import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const translateBtn = document.getElementById("translate");

translateBtn.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const selected = document.querySelector("input[name='language']:checked");

  if (!text.trim()) {
    alert("Please enter some text");
    return;
  }

  if (!selected) {
    alert("Please select a language");
    return;
  }
  const language = selected.value;
  const output = document.getElementById("output");

  output.textContent = "Translating...";

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
    max_tokens: 2000,
  });

  output.textContent = response.choices[0].message.content;
});
