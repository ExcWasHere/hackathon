import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_GROQ_API_KEY;
// const GROQ_API = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

export const requestToAI = async (content: string) => {
  try {
    const reply = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
    return reply.choices[0].message.content;
  } catch (error) {
    console.error("Error in requestToAI:", error);
    throw error;
  }
};
