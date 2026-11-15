// Synthesised bomb-blast sound (no audio file needed).

export function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const Ctor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  return Ctor ? new Ctor() : null;
}

function noiseBuffer(ctx: AudioContext, seconds: number, decay: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  }

  return buffer;
}

export function playBlast(ctx: AudioContext) {
  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.value = 0.95;

  const compressor = ctx.createDynamicsCompressor();
  master.connect(compressor);
  compressor.connect(ctx.destination);

  // 1. Rumbling blast body
  const body = ctx.createBufferSource();
  body.buffer = noiseBuffer(ctx, 1.8, 2.2);

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(5500, now);
  lowpass.frequency.exponentialRampToValueAtTime(140, now + 1.5);

  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(1, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

  body.connect(lowpass);
  lowpass.connect(bodyGain);
  bodyGain.connect(master);
  body.start(now);

  // 2. Deep thump
  const thump = ctx.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(170, now);
  thump.frequency.exponentialRampToValueAtTime(42, now + 0.7);

  const thumpGain = ctx.createGain();
  thumpGain.gain.setValueAtTime(1.2, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 1);

  thump.connect(thumpGain);
  thumpGain.connect(master);
  thump.start(now);
  thump.stop(now + 1.1);

  // 3. Sharp initial crack
  const crack = ctx.createBufferSource();
  crack.buffer = noiseBuffer(ctx, 0.12, 3);

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 900;

  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(0.9, now);
  crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  crack.connect(highpass);
  highpass.connect(crackGain);
  crackGain.connect(master);
  crack.start(now);
}