import { Link } from "react-router-dom";
import type { Producto } from "../../types/producto.types";

interface Props {
  data: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

const ProductoTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Precio</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((producto) => (
          <tr key={producto.id} className="border-t">
            <td className="p-2">{producto.nombre}</td>
            <td className="p-2">${producto.precio_base}</td>
            <td className="p-2">{producto.stock_cantidad}</td>
            <td className="p-2 flex gap-2">
                <Link
                  to={`/productos/${producto.id}`}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Ver
                </Link>
                <button
                  onClick={() => onEdit(producto)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(producto.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductoTable;