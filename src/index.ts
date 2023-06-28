import { chatbotSetup } from './chatbot';
import { PromptDefinition } from './chatbot/types';

(async function () {
  const promptsMap: Array<PromptDefinition> = [
    {
      prompt: 'turn on the bedroom light',
      code: '1',
      callback: (str) => console.info(str, 'turn on the bedroom light***')
    },
    {
      prompt: 'turn off the bedroom light',
      code: '2',
      callback: (str) => console.info(str, 'turn off the bedroom light***')
    },
    {
      prompt: 'turn on the bathroom light',
      code: '3',
      callback: (str) => console.info(str, 'turn on the bathroom light***')
    },
    {
      prompt: 'turn off the bathroom light',
      code: '4',
      callback: (str) => console.info(str, 'turn off the bathroom light***')
    },
    {
      prompt: 'open the dining room window',
      code: '5',
      callback: (str) => console.info(str, 'open the dining room window***')
    },
    {
      prompt: 'open the bedroom window',
      code: '6',
      callback: (str) => console.info(str, 'open the bedroom window***')
    }
  ];

  const promptRoom = 'dining room';
  const c = chatbotSetup({ promptRoom, promptsMap });
  const response = await c('turn on the bedroom light');

  console.info('Response', response);
})()
  .then(() => console.info('Done!'))
  .catch((err) => console.error(err));
