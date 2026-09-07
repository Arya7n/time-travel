export function Gears() {
  return (
    <div className="gears" aria-hidden>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="38" cy="40" r="18" strokeWidth="3" />
        <circle cx="38" cy="40" r="6" />
        <circle cx="70" cy="62" r="12" strokeWidth="3" />
        <circle cx="70" cy="62" r="4" />
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2
          const x1 = 38 + Math.cos(a) * 18
          const y1 = 40 + Math.sin(a) * 18
          const x2 = 38 + Math.cos(a) * 24
          const y2 = 40 + Math.sin(a) * 24
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" />
        })}
      </svg>
    </div>
  )
}
