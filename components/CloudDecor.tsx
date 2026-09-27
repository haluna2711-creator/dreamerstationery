export function CloudDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute -left-8 top-6 h-24 w-24 text-lavender-light animate-float"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M40 130c-22 0-38-16-38-36s16-36 36-38c6-24 28-42 54-42 26 0 48 18 54 42 20 2 36 18 36 38s-16 36-38 36H40z" />
      </svg>
      <svg
        className="absolute right-2 top-24 h-16 w-16 text-bubblegum-light animate-float [animation-delay:1.5s]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M40 130c-22 0-38-16-38-36s16-36 36-38c6-24 28-42 54-42 26 0 48 18 54 42 20 2 36 18 36 38s-16 36-38 36H40z" />
      </svg>
      <svg
        className="absolute left-1/3 top-2 h-10 w-10 text-sun animate-float [animation-delay:2.5s]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5L12 2z" />
      </svg>
      <svg
        className="absolute right-1/4 bottom-4 h-8 w-8 text-mint animate-float [animation-delay:0.8s]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5L12 2z" />
      </svg>
    </div>
  );
}
