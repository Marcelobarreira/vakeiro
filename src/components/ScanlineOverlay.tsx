export function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0,240,255,0.04) 0, rgba(0,240,255,0.04) 1px, transparent 1px, transparent 3px)',
      }}
    />
  );
}
