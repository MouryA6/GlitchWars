export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white font-pixel px-6 relative z-20">
      {/* 👾 Pixel icon */}
      <img src="/assets/pixel-icon.png" alt="Pixel Icon" className="w-12 h-12 mb-6 animate-bounce" />

      {/* 🧱 Title */}
      <h1 className="text-[28px] md:text-[36px] lg:text-[48px] leading-tight mb-4">
        WELCOME TO <br /> PIXEL WORLD
      </h1>

      {/* 🌟 Subtitle (non-pixel font for contrast) */}
      <p className="text-sm md:text-base text-gray-300 font-sans mb-8">
        A pixel-perfect journey begins here
      </p>

      {/* 🎮 Pixel-style CTA Button */}
      <button className="border-[3px] border-pink-500 border-dashed px-6 py-3 text-sm md:text-base text-white bg-black hover:bg-pink-500 hover:text-black transition-all duration-300">
        START GAME
      </button>
    </section>
  );
}
