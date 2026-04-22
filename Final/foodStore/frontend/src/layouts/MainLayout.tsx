import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">FoodStore</h2>

        <nav className="flex flex-col gap-2">
          <Link to="/categorias">Categorías</Link>
          <Link to="/ingredientes">Ingredientes</Link>
          <Link to="/productos">Productos</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;