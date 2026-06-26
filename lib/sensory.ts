let audioCtx: AudioContext | null = null;

let isUnlocked = false;

export const initSensory = () => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  // iOS Safari trick: to bypass the hardware Silent/Ring switch, we MUST play an HTML5 <audio> element.
  // This forces iOS to switch the audio session category from "Ambient/Ringer" to "Media".
  if (!isUnlocked) {
    try {
      // 1-sample silent WAV data URI
      const silentWav = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
      const audioEl = new Audio(silentWav);
      audioEl.loop = true; // Keep playing silently to hold the Media session open
      audioEl.play().catch(() => {});

      // Add professional metadata so if it shows in the iOS Control Center, it looks intentional
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'YA. Experience',
          artist: 'YA.com'
        });
      }
    } catch (e) {
      console.error(e);
    }
    
    if (audioCtx) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      // Use an almost unnoticeable volume instead of 0 so Safari doesn't optimize it out
      gain.gain.value = 0.001;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.01);
    }
    
    isUnlocked = true;
    
    // Preload the Babas sample so it's ready when hovered
    preloadBabas();
  }
};

export const playSciFiSound = (type: 'whoosh' | 'blip' | 'rumble' | 'rewind', panX: number = 0) => {
  if (!audioCtx) return;
  const ctx = audioCtx;
  const time = ctx.currentTime;

  const panner = ctx.createPanner();
  try {
    panner.panningModel = 'HRTF';
  } catch (e) {
    panner.panningModel = 'equalpower';
  }
  panner.distanceModel = 'inverse';
  panner.refDistance = 1;
  panner.maxDistance = 10000;
  panner.rolloffFactor = 1;
  
  panner.positionX.setValueAtTime(panX * 2, time);
  panner.positionY.setValueAtTime(0, time);
  panner.positionZ.setValueAtTime(1, time);

  const masterGain = ctx.createGain();
  panner.connect(masterGain);
  masterGain.connect(ctx.destination);

  if (type === 'blip') {
    // Futuristic Deep Blip (for each letter spelling out)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    
    osc.frequency.setValueAtTime(400, time);
    osc.frequency.exponentialRampToValueAtTime(50, time + 0.1);
    
    masterGain.gain.setValueAtTime(0, time);
    masterGain.gain.linearRampToValueAtTime(0.8, time + 0.01);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(panner);
    osc.start(time);
    osc.stop(time + 0.16);

  } else if (type === 'whoosh') {
    // Soft, gentle airy sweep (less harsh than before)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.5);

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(350, time);
    osc2.frequency.exponentialRampToValueAtTime(120, time + 0.5);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.linearRampToValueAtTime(200, time + 0.5);
    
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(panner);

    masterGain.gain.setValueAtTime(0, time);
    // Softer, slower attack, and much lower peak volume (0.12)
    masterGain.gain.linearRampToValueAtTime(0.12, time + 0.15);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.61);
    osc2.stop(time + 0.61);

  } else if (type === 'rewind') {
    // Reverse/Rewind effect: Reversed whoosh (sucks inward)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(250, time + 0.5);

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(120, time);
    osc2.frequency.exponentialRampToValueAtTime(350, time + 0.5);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, time);
    filter.frequency.linearRampToValueAtTime(800, time + 0.5);
    
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(panner);

    masterGain.gain.setValueAtTime(0.001, time);
    // Slow build up, then fast cut off
    masterGain.gain.exponentialRampToValueAtTime(0.12, time + 0.4);
    masterGain.gain.linearRampToValueAtTime(0, time + 0.5);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.51);
    osc2.stop(time + 0.51);

  } else if (type === 'rumble') {

    // Deep sub rumble (for jumbling)
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.linearRampToValueAtTime(30, time + 0.3);

    masterGain.gain.setValueAtTime(0, time);
    masterGain.gain.linearRampToValueAtTime(0.6, time + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    osc.connect(panner);
    osc.start(time);
    osc.stop(time + 0.31);
  }
};

export const playRocketSound = (type: 'beep' | 'eruption' | 'blastoff' | 'landing') => {
  if (!audioCtx) return;
  const ctx = audioCtx;
  const time = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);

  if (type === 'beep') {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, time);
    masterGain.gain.setValueAtTime(0, time);
    masterGain.gain.linearRampToValueAtTime(0.3, time + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    osc.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.25);
  } else if (type === 'eruption') {
    // Low rumble building up
    const bufferSize = ctx.sampleRate * 2.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(50, time);
    filter.frequency.linearRampToValueAtTime(300, time + 2.0); // opens up

    masterGain.gain.setValueAtTime(0, time);
    masterGain.gain.linearRampToValueAtTime(0.8, time + 1.8);
    masterGain.gain.linearRampToValueAtTime(0, time + 2.0);

    noise.connect(filter);
    filter.connect(masterGain);
    noise.start(time);
    noise.stop(time + 2.0);
  } else if (type === 'blastoff') {
    // Massive white noise explosion + pitch dive
    const bufferSize = ctx.sampleRate * 3.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + 2.5);

    masterGain.gain.setValueAtTime(0, time);
    masterGain.gain.linearRampToValueAtTime(1.0, time + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 2.5);

    noise.connect(filter);
    filter.connect(masterGain);
    noise.start(time);
    noise.stop(time + 2.6);
  } else if (type === 'landing') {
    // Engine turning off (pitch down synth)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(20, time + 0.8);

    masterGain.gain.setValueAtTime(0, time);
    masterGain.gain.linearRampToValueAtTime(0.4, time + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.linearRampToValueAtTime(100, time + 0.8);

    osc.connect(filter);
    filter.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.9);
  }
};

let babasBuffer: AudioBuffer | null = null;

const preloadBabas = async () => {
  if (!audioCtx) return;
  try {
    const res = await fetch('/sounds/good-yute-music.mp3');
    const arrayBuffer = await res.arrayBuffer();
    babasBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } catch(e) {
    console.error("Failed to load Babas sample", e);
  }
};

export const playBabasSample = () => {
  if (!audioCtx || !babasBuffer) return;
  
  const source = audioCtx.createBufferSource();
  source.buffer = babasBuffer;
  
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.8;
  
  source.connect(masterGain);
  masterGain.connect(audioCtx.destination);
  
  // Play exactly 4.5 seconds
  source.start(audioCtx.currentTime, 0, 4.5);
};

export const playBinauralShimmer = () => {
  if (!audioCtx) return;
  const ctx = audioCtx;
  const now = ctx.currentTime;
  
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.5;
  masterGain.connect(ctx.destination);

  // Frequencies for a beautiful "golden" chime / shimmer
  // E Lydian ethereal tones (E5, F#5, G#5, B5, C#6, E6)
  const freqs = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1661.22];

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    // Add slight random detune for a shimmering "chorus" effect
    osc.detune.value = (Math.random() - 0.5) * 15;

    const panner = ctx.createStereoPanner();
    
    // Binaural movement: LFO controlling the pan
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    // different frequencies so they pan independently, creating a 3D swirl
    lfo.frequency.value = 0.2 + Math.random() * 1.5; 
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.8; // Wide stereo spread
    
    lfo.connect(lfoGain);
    lfoGain.connect(panner.pan);
    lfo.start(now);
    
    const gain = ctx.createGain();
    
    // Smooth attack and long release
    const delay = i * 0.15; // Staggered entrances
    gain.gain.setValueAtTime(0, now + delay);
    gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 4);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(masterGain);
    
    osc.start(now + delay);
    osc.stop(now + delay + 4);
    lfo.stop(now + delay + 4);
  });
  
  // Also add a very soft, high-pitched "twinkle" wind that sweeps left to right
  const noiseBufferSize = ctx.sampleRate * 4;
  const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let j = 0; j < noiseBufferSize; j++) {
    data[j] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3000, now);
  filter.frequency.exponentialRampToValueAtTime(8000, now + 4);
  filter.Q.value = 15; // very resonant for a ringing wind sound
  
  const noisePanner = ctx.createStereoPanner();
  // Pan sweeps from -1 to 1 slowly
  noisePanner.pan.setValueAtTime(-1, now);
  noisePanner.pan.linearRampToValueAtTime(1, now + 4);
  
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.05, now + 1.5);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 4);
  
  noise.connect(filter);
  filter.connect(noisePanner);
  noisePanner.connect(noiseGain);
  noiseGain.connect(masterGain);
  
  noise.start(now);
  noise.stop(now + 4);
};
