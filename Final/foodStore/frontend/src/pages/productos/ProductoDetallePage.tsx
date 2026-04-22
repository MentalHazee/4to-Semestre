import { useParams, useNavigate } from "react-router-dom";
import { useProductoById } from "../../hooks/useProductoById";

const ProductoDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: producto, isLoading, isError } = useProductoById(Number(id));

  if (isLoading) {
    return <p className="text-gray-500 p-6">Cargando producto...</p>;
  }

  if (isError || !producto) {
    return <p className="text-red-500 p-6">Error al cargar el producto.</p>;
  }

  return (
    <div className="p-6 max-w-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline text-sm"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>

      <div className="flex flex-col gap-2 text-sm">
        {producto.descripcion && (
          <p><span className="font-semibold">Descripción:</span> {producto.descripcion}</p>
        )}
        <p><span className="font-semibold">Precio base:</span> ${producto.precio_base}</p>
        <p><span className="font-semibold">Stock:</span> {producto.stock_cantidad}</p>
        <p>
          <span className="font-semibold">Disponible:</span>{" "}
          {producto.disponible ? "Sí" : "No"}
        </p>
      </div>
    </div>
  );
};

export default ProductoDetallePage;