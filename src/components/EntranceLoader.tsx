import { lazy, Suspense, useEffect, useState } from 'react';

const ScentSculpture = lazy(() => import('@/components/ScentSculpture'));

export function EntranceLoader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'done'>('loading');
  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimum = new Promise<void>(resolve => setTimeout(resolve, reduced ? 250 : 2200));
    let resolveMedia: () => void = () => {};
    const media = new Promise<void>(resolve => { resolveMedia = resolve; });
    const video = document.querySelector('video');
    if (!video || video.readyState >= 2) resolveMedia();
    video?.addEventListener('loadeddata', resolveMedia, { once: true });
    video?.addEventListener('error', resolveMedia, { once: true });
    const timeout = setTimeout(resolveMedia, 4500);
    void Promise.all([minimum, media, document.fonts.ready]).then(() => {
      if (cancelled) return;
      setPhase('leaving');
      fadeTimer = setTimeout(() => setPhase('done'), reduced ? 0 : 550);
    });
    const safety = setTimeout(() => {
      if (!cancelled) setPhase('done');
    }, 6000);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearTimeout(safety);
      clearTimeout(fadeTimer);
      video?.removeEventListener('loadeddata', resolveMedia);
      video?.removeEventListener('error', resolveMedia);
    };
  }, []);
  useEffect(() => {
    if (phase === 'done') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [phase]);
  if (phase === 'done') return null;
  return <div className="entrance-loader" data-phase={phase} role="status" aria-label="Loading Aurel fragrances" aria-live="polite">
    <div className="entrance-sculpture" aria-hidden="true">{mounted && <Suspense fallback={null}><ScentSculpture compact /></Suspense>}</div>
    <div className="entrance-brand">AUREL<span>.</span></div>
    <div className="entrance-caption">The art of fragrance</div>
    <div className="entrance-progress" aria-hidden="true"><span /></div>
  </div>;
}