const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-25 scale-110"
        style={{ filter: 'blur(1px)' }}
        src="/autoops-bg.mp4"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, hsl(220 20% 3%) 80%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, hsl(220 20% 3% / 0.3) 0%, transparent 20%, transparent 80%, hsl(220 20% 3%) 100%)',
        }}
      />
    </div>
  );
};

export default BackgroundVideo;
