'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ScrollSection({ children, className, id }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={clsx('section-fade', className)}>
      {children}
    </section>
  );
}
