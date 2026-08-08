type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.7 3.5 11 8l-2.1 1.8a15.4 15.4 0 0 0 5.3 5.3L16 13l4.5 2.3v3.1c0 1.1-.9 2.1-2 2.1A15 15 0 0 1 3.5 5.6c0-1.2.9-2.1 2-2.1h3.2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
