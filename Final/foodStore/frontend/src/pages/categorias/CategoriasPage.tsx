import { useState } from "react";
import type { Categoria } from "../../types/categoria.types";
import type { CategoriaCreate } from "../../types/categoria.types";

import { useCategorias } from "../../hooks/useCategorias";
import { useDeleteCategoria } from "../../hooks/useDeleteCategoria";
import { useCreateCategoria } from "../../hooks/useCreateCategoria";
import { useUpdateCategoria } from "../../hooks/useUpdateCategoria";

import CategoriaTable from "../../components/categorias/CategoriaTable";
import CategoriaForm from "../../components/categorias/CategoriaForm";
import Modal from "../../components/ui/Modal";

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
          onSuccess: () => alert("Categoría actualizada"),
          onError: () => alert("Error al actualizar"),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => alert("Categoría creada"),
        onError: () => alert("Error al crear"),
      });
    }

    setIsOpen(false);
  };

  // 🔹 Estados
  if (isLoading) {
    return <p className="text-gray-500">Cargando categorías...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar datos</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>

      {/* Botón crear */}
      <button
        onClick={handleCreate}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Nueva Categoría
      </button>

      {/* Tabla */}
      <CategoriaTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      {/* Modal */}
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