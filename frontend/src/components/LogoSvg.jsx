'use client';
export default function LogoSvg({ color = "#7f1d1d", armColor = "#2a2526", size = 120, withBackground = false }) {
  return (
    <div role="img" aria-label="The Two Planner logo" style={{ display: "inline-flex", width: `${size}px`, height: `${size * 0.7}px`, alignItems: "center", justifyContent: "center", backgroundColor: withBackground ? "#5a5e27" : "transparent" }}>
      <svg viewBox="0 0 160 90" width="100%" height="100%" aria-hidden="true">
        <text x="80" y="48" textAnchor="middle" fill={color} fontFamily="Georgia, serif" fontSize="50" fontStyle="italic" letterSpacing="-4">Two</text>
        <path d="M31 64c26 10 72 10 98 0" fill="none" stroke={armColor} strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
        <text x="80" y="82" textAnchor="middle" fill={armColor} fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="3">PLANNER</text>
      </svg>
    </div>
  );
}
