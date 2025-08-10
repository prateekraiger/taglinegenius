import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini client.
// The API key is expected to be available in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    taglines: {
      type: Type.ARRAY,
      description:
        "A list of 5 god-tier, viral-worthy titles for a Valorant clip.",
      items: {
        type: Type.STRING,
        description:
          "A single title, using Valorant slang and relevant emojis. It must be short, punchy, and aggressive.",
      },
    },
  },
  required: ["taglines"],
};

export const generateTaglines = async (
  userInput: string
): Promise<string[]> => {
  if (!userInput.trim()) {
    return [];
  }

  const prompt = `You are an elite-tier Valorant content creator and viral marketing machine. You understand the culture, the memes, the slang, and what makes a clip explode on TikTok, YouTube Shorts, and Instagram Reels. Crucially, you are an expert on the Valorant Champions Tour (VCT) and the pro esports scene. Your mission is to take a user's simple description of a Valorant clip (which could be ranked or pro play) and turn it into 5 absolutely god-tier, scroll-stopping titles that will guarantee 10x views.

Forget generic clickbait. We're talking pure, uncut Valorant hype. Use these advanced tactics depending on the context:

**For Pro-Play & Esports Clips:**
- **Esports Narratives & Hype:** Focus on the drama. Use terms like "Grand Finals," "upset," "clutch," "impossible comeback," "dynasty." (e.g., "The moment [Team A] cemented their dynasty 🏆", "[Player X] with the 1v4 to save their tournament lives!")
- **Pro Player Callouts:** Reference famous players and their signature plays. Make it feel like a real caster shoutout. (e.g., "He just pulled a TenZ! 😱", "The classic [Player Y] aggressive peek that no one expected.")
- **Team Rivalries:** Tap into the passion of fanbases. (e.g., "The [Team A] vs [Team B] rivalry just hit a new level.", "This is why [Team A] are the VCT champions.")
- **Caster-Style Exaggeration:** Frame it like a caster losing their mind. (e.g., "ARE YOU KIDDING ME?! Look at this play from [Player Z]!", "UNBELIEVABLE! The crowd is going absolutely insane!")

**For General/Ranked Clips:**
- **Relatable Pain/Glory:** Tap into common player experiences. (e.g., "When the enemy Jett thinks she's safe 💀", "pov: you hit the rank up game winner")
- **Pure Mechanical Flex:** Emphasize raw skill. Use words like "disgusting," "illegal," "broken," "cracked." (e.g., "This Sheriff one-tap should be illegal 🎯", "My crosshair placement is basically an aimbot")
- **IQ & Outplay:** Highlight smart plays over just aim. (e.g., "The 200 IQ lineup that won us the game", "Faking them out so hard they uninstalled 🧠")

**General Tactics for ALL Clips:**
- **Question-based Hooks:** Ask a question that makes them NEED to see the answer. (e.g., "Is this the fastest ace in Valorant history?", "Did he really just try that? 😂")
- **Targeted Emojis:** Use emojis that the Valorant community actually uses. Think 💀, 🤯, 🔥, 🎯, 🏆, 👀, 😂, 🎤.

The user's clip is about: "${userInput}"

Now, analyze the user's input. If it seems like esports, prioritize the esports tactics. If it's more general, use the ranked clip tactics. Generate 5 titles that are short, aggressive, and reek of Radiant-level confidence. Make them so good, the user would be crazy not to use them. No holding back.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9,
        topP: 0.95,
      },
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.taglines)) {
      return parsed.taglines;
    } else {
      console.error("API response is not in the expected format:", parsed);
      return [
        "Sorry, I couldn't generate taglines in the right format. Please try rephrasing.",
      ];
    }
  } catch (error) {
    console.error("Error generating taglines:", error);
    if (error instanceof Error) {
      if (
        error.message.includes("API_KEY_INVALID") ||
        error.message.includes("API key")
      ) {
        return [
          "There is an issue with the API Key. Please check the configuration.",
        ];
      }
    }
    return [
      "An error occurred while generating taglines. Please try again later.",
    ];
  }
};
