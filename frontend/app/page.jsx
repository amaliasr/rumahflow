'use client';

import { useEffect } from 'react';

/**
 * React owns the application mount and lifecycle; the browser controller owns
 * the accessible, server-driven workspace within it. The controller is loaded
 * only in the browser so the static App Router export never evaluates DOM APIs.
 */
export default function HomePage() {
  useEffect(() => {
    let cancelled = false;
    let unmount;

    import('./rumahflow-client').then(({ mountRumahFlow }) => {
      if (!cancelled) unmount = mountRumahFlow();
    });

    return () => {
      cancelled = true;
      unmount?.();
    };
  }, []);

  return (
    <>
      <div id="app">
        <div className="boot" role="status">
          <span className="boot-mark">R</span>
          <p>Menyiapkan ruang keuangan Anda…</p>
        </div>
      </div>
      <dialog id="modal" aria-labelledby="modal-title" />
      <div id="toasts" className="toasts" aria-live="polite" />
    </>
  );
}
