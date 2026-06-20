# Update Graffiti Animation Sequence

The user wants to restructure the `GraffitiLogo` animation so that:
1. The brick wall background fades in first at the very beginning of the animation.
2. The Y character then performs its walking and spraying animation.
3. The "CITY SLICKER" text is sprayed letter-by-letter, rather than appearing all at once as a single image.
4. When the animation ends, everything fades out smoothly.

## Proposed Changes

### `animated-logo.tsx`

1. **Split `GraffitiText` SVG into controllable layers:**
   - I will pass animation controls as props to `GraffitiText`: `wallControls`, `muralBgControls`, and `letterControls`.
   - The `<rect fill="url(#brick)" />` will be animated by `wallControls`.
   - The halos, drips, abstract paths, and wildstyle arrow will be wrapped in a `<motion.g animate={muralBgControls}>`.
   - The "CITY SLICKER" text will be refactored to use `<motion.tspan>` for each letter, driven by `letterControls`. 

2. **Refactor Text Layers with `<motion.tspan>`:**
   - Currently, there are 4 layers of text (drop shadow, white outline, main fill, inner stroke).
   - For each layer, I'll split "CITY SLICKER" into an array of characters.
   - Each character will be a `<motion.tspan>` with a `custom={index}` prop, so the `letterControls` can stagger their appearance (e.g. `opacity: 1` with a delay based on `index`).

3. **Update Sequence Timing in `GraffitiLogo`:**
   - **Step 0:** Start `wallControls` to fade in the brick wall immediately on hover.
   - **Step 1:** Wait a beat, then start Y's anticipation squash and jump.
   - **Step 2:** Y walks to the wall and raises the spray arm.
   - **Step 3:** As Y sprays (puff bursts), animate `muralBgControls` to reveal the splatters and abstract background.
   - **Step 4:** Right after, trigger `letterControls.start(i => ({ opacity: 1, transition: { delay: i * 0.1 } }))` so the letters appear one by one while the spray puff is active.
   - **Step 5 (Reverse):** On unhover, fade out `wallControls`, `muralBgControls`, `letterControls`, and reset Y to the start.

## Verification Plan

- Run `npm run dev` and test the hover interaction on the "Graffiti" logo variation.
- Ensure the brick wall appears *before* Y walks over.
- Ensure the "CITY SLICKER" text appears letter by letter.
- Ensure the `mix-blend-darken` effect and high opacity are preserved for the text/mural to maintain seamless blending.
- Check the unhover sequence to ensure a smooth fade-out.
