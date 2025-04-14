import { HeroCard } from '../HeroCard';

export function HeroSelectionComponent() {
  const heroes = [
    { name: "Pixel Swordsman", type: "Warrior", img: "/assets/swordsman.png" },
    { name: "Mystic Archer", type: "Ranger", img: "/assets/archer.png" },
    { name: "Fire Mage", type: "Wizard", img: "/assets/wizard.png" },
  ];

  return (
    <section className="bg-black py-12 px-4 text-white">
      <h2 className="text-center text-xl md:text-2xl text-pink-400 mb-10 animate-flicker">
        💠 Select Your Hero
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {heroes.map((hero, i) => (
          <HeroCard key={i} {...hero} />
        ))}
      </div>
    </section>
  );
}
