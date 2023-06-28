import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai';
import { OPENAI_API_KEY } from '../commons/env';
import { PromptDefinition } from './types';

// https://platform.openai.com/docs/api-reference/chat/create?lang=node.js

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

const openAi = new OpenAIApi(configuration);

export function chatbotSetup({
  promptsMap,
  promptRoom,
  contentSetup = [],
  promptLang = 'spanish or english',
  role = 'user'
}: {
  promptsMap: Array<PromptDefinition>;
  promptRoom: string;
  contentSetup?: string[];
  promptLang?: string;
  role?: ChatCompletionRequestMessageRoleEnum;
}) {
  const _contentSetup = [
    ...contentSetup,
    `Only respond with what you are instructed, do not explain or show additional messages. Limit your response to the minimum expression. Do not include anything other than what I ask.`,
    // `If you don't understand the command or don't know how to respond, answer with "#INVALID-COMMAND"`,
    `When asked to perform multiple actions at once, respond with what you should respond for each action, separated by "comma" (,).`,
    `Understand the context. For example, if I say "I want to leave", then open the door; if I say "it's dark", then turn on the light.`
  ];

  return async function (prompt: string) {
    const content = `
You are a home assistant.
You will answer following the next rules:
${promptsMap
    .map(
      (p) =>
        `  - When I ask for "${p.prompt}", your answer will be "#${p.code}#"`
    )
    .join('\n')}

Setup:
${_contentSetup.map((p) => `  - ${p}`).join('\n')}

Place:
  - I am at following room: ${promptRoom}

The prompt (in ${promptLang}) is the following:
${prompt}
`;

    console.info('content:', content);
    console.info('role:', role);

    const completion = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role,
          content
        }
      ]
    });

    const response: string[] = [];

    completion.data.choices.forEach((choice) => {
      if (choice.message?.content) {
        response.push(choice.message?.content);
      }
    });

    const strResp = response.join('\n');

    for (const p of promptsMap) {
      if (strResp.includes(`#${p.code}#`)) {
        await p.callback(strResp);
      }
    }

    return response;
  };
}
