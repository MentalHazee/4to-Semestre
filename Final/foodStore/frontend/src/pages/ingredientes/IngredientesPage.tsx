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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-950/20 border border-brand-red/50 p-4 rounded-xl text-red-200 text-center">
        Error al cargar los ingredientes. Verificá la conexión con la API.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-brand-red flex items-center gap-3 uppercase italic tracking-tighter">
            <Salad size={36} className="text-brand-red" /> Ingredientes
          </h1>
          <p className="text-zinc-500 mt-1 uppercase text-[10px] font-bold tracking-widest">Gestioná los ingredientes y sus alérgenos.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-brand-red hover:brightness-110 text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand-red/40 active:scale-95"
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