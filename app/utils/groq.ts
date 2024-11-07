import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
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
      model: "llama3-70b-8192",
    });
    return reply.choices[0].message.content;
  } catch (error) {
    console.error("Error in requestToAI:", error);
    throw error;
  }
};
