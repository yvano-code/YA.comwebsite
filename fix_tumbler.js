const fs = require('fs');

let code = fs.readFileSync('components/animated-logo.tsx', 'utf8');

// 1. Signature
code = code.replace(
  'export function TumblerLogo({ isHovered, onAnimationComplete }: { isHovered: boolean, onAnimationComplete?: () => void }) {',
  'export function TumblerLogo({ isHovered, onAnimationComplete, isVertical = false }: { isHovered: boolean, onAnimationComplete?: () => void, isVertical?: boolean }) {'
);

// 2. Spill & Jumble
code = code.replace(
  `  // Random positions for the "spilling out" phase
  const getRandomSpill = () => {
    // Spill outwards from center
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 60 + 20
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20, // slightly upwards
      rotate: (Math.random() - 0.5) * 180,
      scale: Math.random() * 0.4 + 0.8,
    }
  }

  // Random positions for the "jumble" phase (landed)
  const getRandomJumble = () => {
    // Pile up loosely at the bottom
    return {
      x: (Math.random() - 0.5) * 120,
      y: Math.random() * 20 + 10,
      rotate: (Math.random() - 0.5) * 120,
      scale: 1,
    }
  }`,
  `  // Random positions for the "spilling out" phase
  const getRandomSpill = () => {
    if (isVertical) {
      return {
        x: \`\${(Math.random() - 0.5) * 70}vw\`,
        y: \`\${(Math.random() - 0.5) * 70}vh\`,
        rotate: (Math.random() - 0.5) * 180,
        scale: Math.random() * 0.3 + 0.8,
      }
    }
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 60 + 20
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20,
      rotate: (Math.random() - 0.5) * 180,
      scale: Math.random() * 0.4 + 0.8,
    }
  }

  // Random positions for the "jumble" phase (landed)
  const getRandomJumble = () => {
    if (isVertical) {
      return {
        x: \`\${(Math.random() - 0.5) * 60}vw\`,
        y: \`\${(Math.random() * 30) + 15}vh\`,
        rotate: (Math.random() - 0.5) * 120,
        scale: 1,
      }
    }
    return {
      x: (Math.random() - 0.5) * 120,
      y: Math.random() * 20 + 10,
      rotate: (Math.random() - 0.5) * 120,
      scale: 1,
    }
  }`
);

// 3. Hover in
code = code.replace(
  `        // 1. Spilling out like toys
        if (isCancelled) return
        await controls.start((i) => ({
          ...getRandomSpill(),
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.01 }
        }))
        
        if (!hoverRef.current || isCancelled) return
        
        // 2. Spell correctly briefly
        await controls.start((i) => ({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 200, damping: 12, mass: 0.8 }
        }))`,
  `        // 1. Spilling out like toys
        if (isCancelled) return
        playSciFiSound('whoosh', 0)
        await controls.start((i) => ({
          ...getRandomSpill(),
          opacity: 1,
          width: "auto",
          transition: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.01 }
        }))
        
        if (!hoverRef.current || isCancelled) return
        
        // 2. Spell correctly briefly
        const verticalVariant = Math.floor(Math.random() * 3)
        await controls.start((i) => {
          let xValue = 0;
          let yValue = isVertical ? \`\${(i - 6.5) * 6}vh\` : 0;

          if (isVertical) {
            if (verticalVariant === 0) {
              xValue = 0;
            } else if (verticalVariant === 1) {
              xValue = \`\${Math.sin(i * 0.8) * 20}vw\`;
            } else if (verticalVariant === 2) {
              if (i <= 4) {
                xValue = \`-15vw\`;
                yValue = \`\${(i - 2) * 6}vh\`;
              } else if (i >= 6 && i <= 12) {
                xValue = \`15vw\`;
                yValue = \`\${(i - 9) * 6}vh\`;
              } else if (i === 13) {
                xValue = \`15vw\`;
                yValue = \`\${(13 - 9) * 6}vh\`;
              }
            }
          }

          return {
            x: xValue,
            y: yValue,
            rotate: 0,
            scale: 1,
            opacity: 1,
            width: "auto",
            transition: { type: "spring", stiffness: 200, damping: 12, mass: 0.8 }
          }
        })`
);

// 4. Hover out
code = code.replace(
  `        // Mouse removed: go back to "YA."
        controls.start((i) => {
          if (isYA(i)) {
            return {
              x: 0, 
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              width: "auto",
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }
          } else {
            return {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0,
              opacity: 0,
              width: 0,
              transition: { duration: 0.3 }
            }
          }
        })`,
  `        // Mouse removed: go back to "YA."
        controls.start((i) => {
          if (isYA(i)) {
            return {
              x: isVertical ? (isY(i) ? '-0.8em' : isA(i) ? '0' : '0.8em') : 0, 
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              width: "auto",
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }
          } else {
            return {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0,
              opacity: 0,
              width: isVertical ? "auto" : 0,
              transition: { duration: 0.3 }
            }
          }
        })`
);

fs.writeFileSync('components/animated-logo.tsx', code);
console.log('TumblerLogo fixed successfully.');
