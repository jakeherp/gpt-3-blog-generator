import getConfig from "next/config";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const {
  serverRuntimeConfig: { OPENAI_API_KEY },
} = getConfig();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const BASE_PROMPT =
  "Write me a detailed, technical blog post that informs software engineers about the following topic: ";

const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
  const { input } = req.body;

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${BASE_PROMPT}${input}`,
    temperature: 0.85,
    max_tokens: 2000,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
