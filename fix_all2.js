const fs = require('fs');

let code = fs.readFileSync('components/animated-logo.tsx', 'utf8');

// 1. Add imports
if (!code.includes('playSciFiSound')) {
  code = code.replace(
    'import { motion, useAnimation, AnimatePresence, useSpring, useTransform, MotionValue } from "framer-motion"',
    'import { motion, useAnimation, AnimatePresence, useSpring, useTransform, MotionValue } from "framer-motion"\nimport { playSciFiSound, playRocketSound } from "@/lib/sensory";'
  );
}

// 2. Fix GoodYuteLogo dotControls
code = code.replace(
  'dotControls.start({ x: isVertical ? "1.85em" : "1.25em", transition: { duration: 0.5, ease: "easeOut" } })',
  'dotControls.start({ x: isVertical ? "-0.8em" : "1.25em", transition: { duration: 0.5, ease: "easeOut" } })'
);

// If the previous replacement (1.85em) wasn't applied, also check the base HEAD version:
code = code.replace(
  'dotControls.start({ x: "1.25em", transition: { duration: 0.5, ease: "easeOut" } })',
  'dotControls.start({ x: isVertical ? "-0.8em" : "1.25em", transition: { duration: 0.5, ease: "easeOut" } })'
);


// 3. Replace TumblerLogo completely
const tumblerContent = fs.readFileSync('tumbler_dump.txt', 'utf8');
const tumblerStart = 'export function TumblerLogo({ isHovered, onAnimationComplete }: { isHovered: boolean, onAnimationComplete?: () => void }) {';
const tumblerEnd = 'export function RocketLogo';

const startIndex = code.indexOf(tumblerStart);
if (startIndex !== -1) {
  const endIndex = code.indexOf(tumblerEnd, startIndex);
  if (endIndex !== -1) {
    // Only replace the FIRST occurrence (we reverted to HEAD so there is only one)
    code = code.substring(0, startIndex) + tumblerContent + '\n\n' + code.substring(endIndex);
  } else {
    console.log("Could not find TumblerLogo end");
  }
} else {
  console.log("Could not find TumblerLogo start");
}

fs.writeFileSync('components/animated-logo.tsx', code);
console.log('Fixes applied successfully.');
