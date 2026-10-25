export function Arrow({ className = 'btn__arrow' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
