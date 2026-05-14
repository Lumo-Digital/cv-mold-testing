import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';

export default function ToasterSetup() {
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right'>(
    typeof window !== 'undefined' && window.innerWidth >= 768
      ? 'bottom-right'
      : 'bottom-center'
  );

  useEffect(() => {
    (window as unknown as Record<string, unknown>).toast = toast;

    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) =>
      setPosition(e.matches ? 'bottom-right' : 'bottom-center');

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return <Toaster position={position} richColors closeButton />;
}
