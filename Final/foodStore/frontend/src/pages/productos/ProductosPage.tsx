import { useState } from "react";

import type { Producto, ProductoCreate } from "../../types/producto.types";

import { useProductos } from "../../hooks/useProductos";
import { useDeleteProducto } from "../../hooks/useDeleteProducto";
import { useCreateProducto } from "../../hooks/useCreateProducto";
import { useUpdateProducto } from "../../hooks/useUpdateProducto";

import ProductoTable from "../../components/productos/ProductosTable";
import ProductoForm from "../../components/productos/ProductosForm";
import Modal from "../../components/ui/Modal";

const ProductosPage = () => {
  // 🔹 Queries
  const { data, isLoading, isError } = useProductos();

  // 🔹 Mutations
  const deleteMutation = useDeleteProducto();
  const createMutation = useCreateProducto();
  const updateMutation = useUpdateProducto();

  // 🔹 UI State
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Producto | null>(null);

  // 🔹 Handlers
  const handleCreate = () => {
    setSelected(null);
    setIsOpen(true);
  };

  const handleEdit = (producto: Producto) => {
    setSelected(producto);
    setIsOpen(true);
  };

  const handleSubmit = (formData: ProductoCreate) => {
    if (selected) {
      updateMutation.mutate(
        { id: selected.id, payload: formData },
        {
          onSuccess: () => alert("Producto actualizado"),
          onError: () => alert("Error al actualizar"),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => alert("Producto creado"),
        onError: () => alert("Error al crear"),
      });
    }

    setIsOpen(false);
  };

  // 🔹 Estados
  if (isLoading) {
    return <p className="text-gray-500">Cargando productos...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar datos</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Botón crear */}
      <button
        onClick={handleCreate}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Nuevo Producto
      </button>

      {/* Tabla */}
      <ProductoTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selected ? "Editar Producto" : "Nuevo Producto"}
      >
        <ProductoForm
          initialData={selected}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default ProductosPage;