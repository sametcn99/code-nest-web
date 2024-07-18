import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "YOUR_API_KEY";

if (!apiKey) {
  throw Error(
    "API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.",
  );
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prePrompot =
  "Verilen dokümandaki kod parçacıklarının işlevselliğini ve genel mantığını ayrıntılı bir şekilde açıklayabilir misiniz? Eğer birden fazla kod parçacığı varsa, bu parçacıkların birbirleriyle olan ilişkilerini ve nasıl bir araya gelerek bütünsel bir işlevsellik sağladıklarını detaylandırabilir misiniz? Ayrıca, her bir kod parçacığının hangi amaçla kullanıldığını ve dokümanın genel amacıyla nasıl uyumlu olduğunu da açıklar mısınız?";

/**
 * Generates text based on the given prompt using Google's Generative AI model.
 * @param {string} prompt - The prompt to generate text from.
 * @returns {Promise<string>} The generated text.
 * @throws Will throw an error if the API call fails or if the response is invalid.
 */
export async function generateText(prompt: string) {
  try {
    const response = await model.generateContent(`${prePrompot}\n${prompt}`);

    if (!response || !response.response || !response.response.text) {
      throw Error("Invalid response structure from Generative AI model.");
    }

    return response.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw Error("Failed to generate text. Please try again later.");
  }
}
