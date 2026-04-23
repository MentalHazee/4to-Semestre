import { Outlet, NavLink } from "react-router-dom";
import { LayoutGrid, Salad, Package, ShoppingBag, ChevronRight } from "lucide-react";

const MainLayout = () => {
  const menuItems = [
    { to: "/categorias", label: "Categorías", icon: <LayoutGrid size={20} />, color: "hover:text-blue-400" },
    { to: "/ingredientes", label: "Ingredientes", icon: <Salad size={20} />, color: "hover:text-emerald-400" },
    { to: "/productos", label: "Productos", icon: <Package size={20} />, color: "hover:text-violet-400" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30">
      {/* Sidebar Flotante */}
      <aside className="w-72 border-r border-zinc-800/50 bg-zinc-900/20 backdrop-blur-xl flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-violet-900/20">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">
            FOOD<span className="text-violet-500">STORE</span>
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 px-2">Menú Principal</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-zinc-800/50 text-white shadow-inner"
                    : `text-zinc-500 ${item.color} hover:bg-zinc-800/30`
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="transition-transform group-hover:scale-110 duration-300">
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800/50">
          <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-4 rounded-2xl border border-zinc-700/30">
            <p className="text-xs font-bold text-zinc-400 mb-1">Estado del Servidor</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] text-emerald-400 font-mono">ONLINE: Port 8000</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-10 max-w-7xl mx-auto w-full">
        <div className="relative">
          {/* Decoración de fondo sutil */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;