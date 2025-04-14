export function HeroCard({ name, type, img }) {
  return (
    <div className="bg-zinc-900 border-4 border-dashed border-cyan-500 hover:border-pink-500 transition-all rounded-xl p-4 text-center shadow-lg group">
      <img src={img} alt={name} className="mx-auto w-24 h-24 mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-lg text-green-400 mb-1">{name}</h3>
      <p className="text-sm text-cyan-300">{type}</p>
    </div>
  );
}
