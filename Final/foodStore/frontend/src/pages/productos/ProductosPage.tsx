import { useState } from "react";
import type { Producto, ProductoCreate } from "../../types/producto.types";

import { useProductos } from "../../hooks/useProductos";
import { useDeleteProducto } from "../../hooks/useDeleteProducto";
import { useCreateProducto } from "../../hooks/useCreateProducto";
import { useUpdateProducto } from "../../hooks/useUpdateProducto";

import ProductoTable from "../../components/productos/ProductosTable";
import ProductoForm from "../../components/productos/ProductosForm";
import Modal from "../../components/ui/Modal";
import { Plus, Package } from "lucide-react";

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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-950/20 border border-brand-red/50 p-4 rounded-xl text-red-200 text-center">
        Error al cargar los productos.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-brand-red flex items-center gap-3 uppercase italic tracking-tighter">
            <Package size={36} className="text-brand-red" /> Productos
          </h1>
          <p className="text-zinc-500 mt-1 uppercase text-[10px] font-bold tracking-widest">Administrá tu catálogo de hamburguesas y combos.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-brand-red hover:brightness-110 text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand-red/40 active:scale-95"
        >
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      {/* Tabla */}
      <ProductoTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={(id) => {
          if (confirm("¿Seguro que querés borrar este producto?")) {
            deleteMutation.mutate(id);
          }
        }}
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