const fs = require('fs');

const headFile = require('child_process').execSync('git show HEAD:components/animated-logo.tsx', { encoding: 'utf8' });
const currentFile = fs.readFileSync('components/animated-logo.tsx', 'utf8');

function extractComponent(code, name) {
  const startStr = `export function ${name}`;
  const startIndex = code.indexOf(startStr);
  if (startIndex === -1) return null;
  // It starts right above with `const getInitialPos` maybe?
  // Actually, we also need to extract `getInitialPos`, `csInitial`, `awInitial`, `csaInitial`
  return null;
}
