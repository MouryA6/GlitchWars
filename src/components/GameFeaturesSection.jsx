export function GameFeaturesSection() {
  const features = [
    'Pixel-perfect graphics',
    'Dynamic gameplay',
    'Epic soundtrack',
    'Multiplayer mode',
  ];

  return (
    <section className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-12">
      <h2 className="text-xl text-pink-500 mb-4">🛠️ Game Features</h2>
      <ul className="list-disc list-inside text-cyan-400 space-y-1">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}
