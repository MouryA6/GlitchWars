export function PixelLootSection() {
  const lootItems = [
    { name: "Potion of Health", rarity: "common", img: "/assets/potion.png" },
    { name: "Golden Coin", rarity: "rare", img: "/assets/coin.png" },
    { name: "Ancient Scroll", rarity: "epic", img: "/assets/scroll.png" },
    { name: "Magic Gem", rarity: "rare", img: "/assets/gem.png" },
  ];

  return (
    <section className="bg-zinc-950 py-12 px-6 text-white">
      <h2 className="text-center text-xl md:text-2xl text-yellow-400 mb-10 animate-flicker">
        🧰 Your Pixel Loot
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {lootItems.map((item, i) => (
          <div
            key={i}
            className={`border-4 rounded-xl p-4 text-center transition-all hover:scale-105 ${
              item.rarity === 'epic'
                ? 'border-purple-500 shadow-[0_0_20px_#a855f7]'
                : item.rarity === 'rare'
                ? 'border-blue-400 shadow-[0_0_15px_#60a5fa]'
                : 'border-gray-500'
            }`}
          >
            <img src={item.img} alt={item.name} className="mx-auto w-16 h-16 mb-2" />
            <p className="text-xs">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
