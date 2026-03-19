const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105"
        style={{ opacity: 0.35 }}
        src="/autoops-bg.mp4"
      />
      {/* Very subtle edge fade — keeps video bright in center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, hsl(220 20% 3% / 0.5) 100%)',
        }}
      />
    </div>
  );
};

export default BackgroundVideo;
