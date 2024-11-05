export default function AudioWave() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center justify-center gap-[2px] w-full h-full">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`wave-bar bg-muted h-[10px] w-[2px] opacity-70 dela ${`animate-wave${
                (i % 4) + 1
              }`}`}
              style={{
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
