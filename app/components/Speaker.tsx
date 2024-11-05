export default function Speaker() {
  return (
    <>
      <div className="relative w-10 h-10 rounded-full bg-decoration flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0.5 rounded-full bg-card animate-speaker" />
        <div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-card from-30% to-decoration flex items-center justify-center animate-speaker "
          style={{
            boxShadow:
              "inset 0 2px 10px rgba(0,0,0,0.5), inset 0 -2px 10px rgba(255,255,255,0.2)",
          }}
        >
          <div
            className="w-1/4 h-1/4 rounded-full bg-gradient-to-br from-decoration from-30% to-card animate-dust-cap"
            style={{
              boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </div>
    </>
  );
}
