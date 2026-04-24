import { Outlet, NavLink } from "react-router-dom";
import { LayoutGrid, Salad, Package, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";

const MainLayout = () => {
  const menuItems = [
    { to: "/categorias", label: "Categorías", icon: <LayoutGrid size={20} />, color: "hover:text-brand-red" },
    { to: "/ingredientes", label: "Ingredientes", icon: <Salad size={20} />, color: "hover:text-brand-red" },
    { to: "/productos", label: "Productos", icon: <Package size={20} />, color: "hover:text-brand-red" },
  ];

  return (
    <div className="flex min-h-screen bg-transparent text-zinc-100 selection:bg-brand-red/30">
      {/* Sidebar Flotante */}
      <aside className="w-72 border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-xl flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex flex-col items-center mb-10 px-2">
          <img src={logo} alt="Rock N Burger" className="w-48 h-auto" />
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

        <div className="mt-auto pt-6 border-t border-zinc-900 px-2">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Estado del Servidor</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] text-emerald-400 font-mono">ROCKING: Port 8000</span>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-10 max-w-7xl mx-auto w-full">
        <div className="relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;