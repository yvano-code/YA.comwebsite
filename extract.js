const fs = require('fs');
const lines = fs.readFileSync('/Users/bebrilliant/.gemini/antigravity/brain/3f521b94-cace-49cf-91d0-766afd412d85/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

for (const line of lines) {
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    if (data.content && data.content.includes('export function MobileAnimatedLogo')) {
      fs.writeFileSync('original-mobile-animated-logo.tsx', data.content);
      break;
    }
  } catch(e) {}
}
