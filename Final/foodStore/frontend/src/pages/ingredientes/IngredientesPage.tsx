import { useState } from "react";
import type { Ingrediente, IngredienteCreate } from "../../types/ingrediente.types";

import { useIngredientes } from "../../hooks/useIngredientes";
import { useDeleteIngrediente } from "../../hooks/useDeleteIngrediente";
import { useCreateIngrediente } from "../../hooks/useCreateIngrediente";
import { useUpdateIngrediente } from "../../hooks/useUpdateIngrediente";

import IngredienteTable from "../../components/ingredientes/IngredientesTable";
import IngredienteForm from "../../components/ingredientes/IngredientesForm";
import Modal from "../../components/ui/Modal";
import { Plus, Salad } from "lucide-react";

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
          onSuccess: () => setIsOpen(false),
          onError: () => alert("Error al actualizar"),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsOpen(false),
        onError: () => alert("Error al crear"),
      });
    }
  };

  // 🔹 Estados
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-center">
        Error al cargar los ingredientes. Verificá la conexión con la API.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-3">
            <Salad size={36} className="text-emerald-500" /> Ingredientes
          </h1>
          <p className="text-zinc-500 mt-1">Gestioná los ingredientes y sus alérgenos.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
        >
          <Plus size={20} /> Nuevo Ingrediente
        </button>
      </div>

      {/* Tabla */}
      <IngredienteTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={(id) => {
            if(confirm("¿Estás seguro de eliminar este ingrediente?")) {
                deleteMutation.mutate(id);
            }
        }}
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