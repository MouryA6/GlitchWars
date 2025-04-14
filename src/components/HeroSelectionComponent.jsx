// src/components/HeroSelectionComponent.jsx
import { useNavigate } from 'react-router-dom';

export function HeroSelectionComponent() {
  const navigate = useNavigate();

  const heroes = [
    { name: 'Pixel Knight', image: '/assets/swordsman.png' },
    { name: 'Retro Mage', image: '/assets/wizard.png' },
    { name: 'Archer', image: '/assets/archer.png' },
    // Add more heroes as needed
  ];

  return (
    <section className="text-center py-20">
      {/* 🔙 Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 font-pixel bg-green-700 text-white border-2 border-green-500 rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-105"
        >
          ← BACK
        </button>
      </div>

      <h2 className="text-3xl mb-6">Select Your Hero</h2>
      <div className="flex justify-center flex-wrap gap-8">
        {heroes.map((hero) => (
          <div key={hero.name} className="w-48">
            <img src={hero.image} alt={hero.name} className="mb-2" />
            <p>{hero.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
