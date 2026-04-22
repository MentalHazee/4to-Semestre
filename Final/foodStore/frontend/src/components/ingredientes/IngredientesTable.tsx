import type { Ingrediente } from "../../types/ingrediente.types";

interface Props {
  data: Ingrediente[];
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: number) => void;
}

const IngredienteTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((ingrediente) => (
          <tr key={ingrediente.id} className="border-t">
            <td className="p-2">{ingrediente.nombre}</td>
            <td className="p-2 flex gap-2">
              <button
                onClick={() => onEdit(ingrediente)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(ingrediente.id)}
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

export default IngredienteTable;