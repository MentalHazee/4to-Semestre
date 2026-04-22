import { useState } from "react";
import type { Ingrediente } from "../../types/ingrediente.types";
import type { IngredienteCreate } from "../../types/ingrediente.types";

import { useIngredientes } from "../../hooks/useIngredientes";
import { useDeleteIngrediente } from "../../hooks/useDeleteIngrediente";
import { useCreateIngrediente } from "../../hooks/useCreateIngrediente";
import { useUpdateIngrediente } from "../../hooks/useUpdateIngrediente";

import IngredienteTable from "../../components/ingredientes/IngredientesTable";
import IngredienteForm from "../../components/ingredientes/IngredientesForm";
import Modal from "../../components/ui/Modal";

const IngredientesPage = () => {
  // 🔹 Queries
  const { data, isLoading, isError } = useIngredientes();

  // 🔹 Mutations
  const deleteMutation = useDeleteIngrediente();
  const createMutation = useCreateIngrediente();
  const updateMutation = useUpdateIngrediente();

  // 🔹 UI State
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Ingrediente | null>(null);

  // 🔹 Handlers
  const handleCreate = () => {
    setSelected(null);
    setIsOpen(true);
  };

  const handleEdit = (ingrediente: Ingrediente) => {
    setSelected(ingrediente);
    setIsOpen(true);
  };

  const handleSubmit = (formData: IngredienteCreate) => {
    if (selected) {
      updateMutation.mutate(
        { id: selected.id, payload: formData },
        {
          onSuccess: () => alert("Ingrediente actualizado"),
          onError: () => alert("Error al actualizar"),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => alert("Ingrediente creado"),
        onError: () => alert("Error al crear"),
      });
    }

    setIsOpen(false);
  };

  // 🔹 Estados
  if (isLoading) {
    return <p className="text-gray-500">Cargando ingredientes...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar datos</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ingredientes</h1>

      {/* Botón crear */}
      <button
        onClick={handleCreate}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Nuevo Ingrediente
      </button>

      {/* Tabla */}
      <IngredienteTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selected ? "Editar Ingrediente" : "Nuevo Ingrediente"}
      >
        <IngredienteForm
          initialData={selected}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default IngredientesPage;