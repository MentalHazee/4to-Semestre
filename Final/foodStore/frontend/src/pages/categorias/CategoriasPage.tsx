import { useState } from "react";
import type { Categoria, CategoriaCreate } from "../../types/categoria.types";

import { useCategorias } from "../../hooks/useCategorias";
import { useDeleteCategoria } from "../../hooks/useDeleteCategoria";
import { useCreateCategoria } from "../../hooks/useCreateCategoria";
import { useUpdateCategoria } from "../../hooks/useUpdateCategoria";

import CategoriaTable from "../../components/categorias/CategoriaTable";
import CategoriaForm from "../../components/categorias/CategoriaForm";
import Modal from "../../components/ui/Modal";
import { Plus, LayoutGrid } from "lucide-react";

const CategoriasPage = () => {
  // 🔹 Queries
  const { data, isLoading, isError } = useCategorias();

  // 🔹 Mutations
  const deleteMutation = useDeleteCategoria();
  const createMutation = useCreateCategoria();
  const updateMutation = useUpdateCategoria();

  // 🔹 UI State
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Categoria | null>(null);

  // 🔹 Handlers
  const handleCreate = () => {
    setSelected(null);
    setIsOpen(true);
  };

  const handleEdit = (categoria: Categoria) => {
    setSelected(categoria);
    setIsOpen(true);
  };

  const handleSubmit = (formData: CategoriaCreate) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-center">
        Error al cargar las categorías.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center gap-3">
            <LayoutGrid size={36} className="text-blue-500" /> Categorías
          </h1>
          <p className="text-zinc-500 mt-1">Organizá tu menú por categorías y jerarquías.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} /> Nueva Categoría
        </button>
      </div>

      <CategoriaTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={(id) => {
          if (confirm("¿Seguro que querés borrar esta categoría?")) {
            deleteMutation.mutate(id);
          }
        }}
      />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selected ? "Editar Categoría" : "Nueva Categoría"}
      >
        <CategoriaForm
          initialData={selected}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default CategoriasPage;