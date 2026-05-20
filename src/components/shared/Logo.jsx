export default function Logo({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#064E3B"/>
          <stop offset="100%" stopColor="#1E293B"/>
        </linearGradient>
        <linearGradient id="leafGrad" x1="24" y1="6" x2="32" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logoBg)"/>
      <path d="M12 29V11h3.2v7.4l7.2-7.4h4l-7.4 7.6L26.6 29h-4l-5.2-7.6-2.2 2.3V29H12z" fill="white" opacity="0.95"/>
      <path d="M28 7c3.5 2 5 5.5 4 9-1.5-1-3.5-1.5-5.5-.8 0-3.2 0.5-5.8 1.5-8.2z" fill="url(#leafGrad)" opacity="0.9"/>
      <path d="M28.5 7.5c0 0 1 3.5 0.5 6.5" stroke="#6EE7B7" strokeWidth="0.6" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}
