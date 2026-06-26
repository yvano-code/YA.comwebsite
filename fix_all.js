const fs = require('fs');

let code = fs.readFileSync('components/animated-logo.tsx', 'utf8');

// 1. Add playRocketSound to imports
code = code.replace(
  'import { playSciFiSound } from "@/lib/sensory";',
  'import { playSciFiSound, playRocketSound } from "@/lib/sensory";'
);

// 2. GoodYuteLogo signature
code = code.replace(
  'export function GoodYuteLogo({ isHovered, onAnimationComplete }: { isHovered: boolean, onAnimationComplete?: () => void }) {',
  'export function GoodYuteLogo({ isHovered, onAnimationComplete, isVertical = false }: { isHovered: boolean, onAnimationComplete?: () => void, isVertical?: boolean }) {'
);

// 3. GoodYuteLogo dot control shift
code = code.replace(
  'dotControls.start({ x: "1.25em", transition: { duration: 0.5, ease: "easeOut" } })',
  'dotControls.start({ x: isVertical ? "1.85em" : "1.25em", transition: { duration: 0.5, ease: "easeOut" } })'
);

// 4. AwardWinnerLogo signature
code = code.replace(
  'export function AwardWinnerLogo({ isHovered, onAnimationComplete }: { isHovered: boolean, onAnimationComplete?: () => void }) {',
  'export function AwardWinnerLogo({ isHovered, onAnimationComplete, isVertical = false }: { isHovered: boolean, onAnimationComplete?: () => void, isVertical?: boolean }) {'
);

// 5. AwardWinnerLogo getInitialPos usage
code = code.replace(
  'const csInitial = "CANADIAN SCREEN".split("").map(() => getInitialPos());',
  'const csInitial = useMemo(() => "CANADIAN SCREEN".split("").map(() => getInitialPos(isVertical)), [isVertical]);'
);
code = code.replace(
  'const awInitial = "AWARD WINNER".split("").map(() => getInitialPos());',
  'const awInitial = useMemo(() => "AWARD WINNER".split("").map(() => getInitialPos(isVertical)), [isVertical]);'
);
code = code.replace(
  'const csaInitial = getInitialPos();',
  'const csaInitial = useMemo(() => getInitialPos(isVertical), [isVertical]);'
);

// 6. getInitialPos definition update
code = code.replace(
  'const getInitialPos = () => ({',
  `const getInitialPos = (isVertical: boolean = false) => {
  if (isVertical) {
    return {
      rotate: (Math.random() - 0.5) * 180,
      x: (Math.random() - 0.5) * 80 + "vw",
      y: (Math.random() - 0.5) * 80 + "vh"
    }
  }
  return {`
);
code = code.replace(
  `  x: (Math.random() - 0.5) * 60,
  y: (Math.random() - 0.5) * 60
});`,
  `  x: (Math.random() - 0.5) * 60,
  y: (Math.random() - 0.5) * 60
  }
};`
);

// 7. AwardWinnerLogo fontSize container
code = code.replace(
  `        letterSpacing: "0.15em",
      }}`,
  `        letterSpacing: "0.15em",
        fontSize: isVertical ? "12vh" : "inherit"
      }}`
);

// 8. AwardWinnerLogo explosion clamp text
code = code.replace(
  `fontSize: "clamp(24px, 5.5vw, 64px)", // slightly smaller to accommodate wide tracking`,
  `fontSize: isVertical ? "clamp(24px, 7vw, 44px)" : "clamp(24px, 5.5vw, 64px)", // larger on mobile per user request`
);

// 9. Rocket overflow visible
code = code.replace(
  `<svg viewBox="0 0 80 100" className={className} fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">`,
  `<svg viewBox="0 0 80 100" className={className} fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>`
);
code = code.replace(
  `<svg viewBox="0 0 80 100" className={className} fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">`,
  `<svg viewBox="0 0 80 100" className={className} fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>`
);
code = code.replace(
  `<svg viewBox="0 0 30 100" className={className} fill="currentColor">`,
  `<svg viewBox="0 0 30 100" className={className} fill="currentColor" style={{ overflow: "visible" }}>`
);

// 10. Rocket sounds
code = code.replace('setCountdown(3)', 'setCountdown(3)\n        playRocketSound("beep")');
code = code.replace('setCountdown(2)', 'setCountdown(2)\n        playRocketSound("beep")');
code = code.replace('setCountdown(1)', 'setCountdown(1)\n        playRocketSound("beep")');
code = code.replace('// Ignite engine', '// Ignite engine\n        playRocketSound("eruption")');
code = code.replace('// 2. EXPLOSION and Vertical Burst!', '// 2. EXPLOSION and Vertical Burst!\n        playRocketSound("blastoff")');
code = code.replace('// Retrorockets fire!', '// Retrorockets fire!\n        playRocketSound("landing")');

fs.writeFileSync('components/animated-logo.tsx', code);
console.log('All patches applied cleanly.');
