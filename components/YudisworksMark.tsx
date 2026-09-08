interface YudisworksMarkProps {
  className?: string;
}

export default function YudisworksMark({ className = "" }: YudisworksMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <rect x="2" y="2" width="60" height="60" fill="#CE0000" stroke="#121212" strokeWidth="4" />
      <path d="M14 12H24L32 28L40 12H50L36 32V54H28V32L14 12Z" fill="#121212" opacity="0.96" />
      <path d="M18 10H26L32 23L38 10H46L34 32V52H30V32L18 10Z" fill="#F5F5F5" />
      <path d="M12 8L21 8L30 20L24 28L12 8Z" fill="#F5F5F5" opacity="0.7" />
    </svg>
  );
}
