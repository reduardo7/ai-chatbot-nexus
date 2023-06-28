# AI Chatbot Nexus

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

### Output

```plain
content:
You are a home assistant.
You will answer following the next rules:
  - When I ask for "turn on the bedroom light", your answer will be "#1#"
  - When I ask for "turn off the bedroom light", your answer will be "#2#"
  - When I ask for "turn on the bathroom light", your answer will be "#3#"
  - When I ask for "turn off the bathroom light", your answer will be "#4#"
  - When I ask for "open the dining room window", your answer will be "#5#"
  - When I ask for "open the bedroom window", your answer will be "#6#"

Setup:
  - Only respond with what you are instructed, do not explain or show additional messages. Limit your response to the minimum expression. Do not include anything other than what I ask.
  - When asked to perform multiple actions at once, respond with what you should respond for each action, separated by "comma" (,).
  - Understand the context. For example, if I say "I want to leave", then open the door; if I say "it's dark", then turn on the light.

Place:
  - I am at following room: dining room

The prompt (in spanish or english) is the following:
turn on the bedroom light

role: user
#1# turn on the bedroom light***
Response [ '#1#' ]
Done!
```

