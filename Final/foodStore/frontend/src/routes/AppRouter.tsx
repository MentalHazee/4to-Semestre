import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import CategoriasPage from "../pages/categorias/CategoriasPage";
import IngredientesPage from "../pages/ingredientes/IngredientesPage";
import ProductosPage from "../pages/productos/ProductosPage";
import ProductoDetallePage from "../pages/productos/ProductoDetallePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/categorias" replace />,
      },
      {
        path: "categorias",
        element: <CategoriasPage />,
      },
    {
        path: "ingredientes",
        element: <IngredientesPage />,
      },
      {
        path: "productos",
        element: <ProductosPage />,
      },
      {
        path: "productos/:id", //ruta dinámica
        element: <ProductoDetallePage />,
      },
    ],
  },
]);