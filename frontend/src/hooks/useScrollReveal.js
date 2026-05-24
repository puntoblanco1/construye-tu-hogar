import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

export function ScrollReveal({ children, animation = 'fade-up', delay = 0, className = '', ...props }) {
  const ref = useScrollReveal(props);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
