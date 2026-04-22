import type { Categoria } from "../../types/categoria.types";

interface Props {
  data: Categoria[];
  onEdit: (cat: Categoria) => void;
  onDelete: (id: number) => void;
}

const CategoriaTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cat) => (
          <tr key={cat.id} className="border-t">
            <td className="p-2">{cat.nombre}</td>
            <td className="p-2 flex gap-2">
              <button
                onClick={() => onEdit(cat)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(cat.id)}
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

export default CategoriaTable;