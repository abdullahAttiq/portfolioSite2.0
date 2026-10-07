// Line icons drawn on a 24px grid, stroke inherits currentColor.
const paths = {
  user: (
    <>
      <circle cx="12" cy="5.5" r="3" />
      <path d="M12 8.5v7M7 11.5h10M12 15.5l-4 6M12 15.5l4 6" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  stack: (
    <>
      <rect x="4" y="4" width="16" height="4.5" rx="1" />
      <rect x="4" y="9.75" width="16" height="4.5" rx="1" />
      <rect x="4" y="15.5" width="16" height="4.5" rx="1" />
    </>
  ),
  retry: (
    <>
      <path d="M5 12a7 7 0 1 0 2.2-5.1" />
      <path d="M5 4.5v4h4" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6L6 18" />,
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3.5M21 12v2.5" />
    </>
  ),
  chain: (
    <>
      <rect x="2.5" y="8.5" width="9" height="7" rx="3.5" />
      <rect x="12.5" y="8.5" width="9" height="7" rx="3.5" />
      <path d="M9 12h6" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  back: <path d="M20 12H5M11 6l-6 6 6 6" />,
  down: <path d="M12 4v14M6 12l6 6 6-6M5 21h14" />,
  ext: <path d="M8 16L17 7M9 7h8v8" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  chat: <path d="M4 20l1.4-4.2A8 8 0 1 1 8.6 19L4 20z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13c0-1.7 1-2.6 2.4-2.6 1.4 0 2.1.9 2.1 2.6v3.5" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.2c0-.9.1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.3 3.1 5.3 3.4 5.3 3.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.8c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  file: (
    <>
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z" />
      <path d="M14 3v5h5" />
    </>
  ),
  x_social: <path d="M4 4l16 16M20 4L4 20" />,
};

export default function Icon({ name, size = 18, strokeWidth = 1.6, className, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {paths[name]}
    </svg>
  );
}
