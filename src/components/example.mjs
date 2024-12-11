import 'dotenv/config'; // Load environment variables
import OpenAI from 'openai';

console.log('Loaded API Key:', process.env.OPENAI_API_KEY); // Check if API key is loaded

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use API key from environment variable
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say this is a test!' }],
      temperature: 0.7,
    });

    console.log('AI Response:', completion.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
