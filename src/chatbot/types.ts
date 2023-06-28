export interface PromptDefinition {
  prompt: string;
  code: string;
  callback: (str: string) => Promise<void> | void;
}
