import React, { useEffect, useRef, useState } from "react";

/**
 * Reveal — purely presentational scroll-in animation wrapper.
 *
 * Progressive enhancement only: if IntersectionObserver is unavailable or the
 * user prefers reduced motion, the content renders fully visible (the `reveal`
 * class is never applied). No business logic, no data — visual polish only.
 */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Reveal = ({ className = "", delay = 0, children, ...rest }) => {
  const ref = useRef(null);
  const [enabled] = useState(
    () => typeof IntersectionObserver !== "undefined" && !prefersReducedMotion()
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  const classes = [
    enabled ? "reveal" : "",
    enabled && visible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Reveal;
