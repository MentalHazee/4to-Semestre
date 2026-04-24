import logo from "./assets/logo.png";

function App() {
  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-6">
      <div className="text-center space-y-8">
        <img src={logo} alt="Rock N Burger" className="w-80 h-auto mx-auto" />
        <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">
          Frontend listo • Tailwind v4 + TanStack Query
        </p>
        <div className="pt-8">
           <div className="inline-block px-8 py-3 border-2 border-brand-red text-brand-red font-black uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all cursor-default">
             Dashboard Activo
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;