'use client';

let ctx: AudioContext | undefined;

/**
 * Play a gentle beep to highlight status changes.
 */
export function playStatusSound() {
  if (typeof window === 'undefined') return;

  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return;

  ctx = ctx ?? new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = 880;
  gain.gain.value = 0.05;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.12);
  osc.addEventListener('ended', () => {
    osc.disconnect();
    gain.disconnect();
  });
}
