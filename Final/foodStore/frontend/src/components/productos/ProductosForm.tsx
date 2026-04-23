import { useState } from "react";
import { useCategorias } from "../../hooks/useCategorias";
import { useIngredientes } from "../../hooks/useIngredientes";
import type { Producto, ProductoCreate } from "../../types/producto.types";
import { X, Plus, ImageIcon } from "lucide-react";

interface Props {
  initialData?: Producto | null;
  onSubmit: (data: ProductoCreate) => void;
}

const ProductoForm = ({ initialData, onSubmit }: Props) => {
  const { data: categorias } = useCategorias();
  const { data: ingredientes } = useIngredientes();

  // Estados del formulario
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [precio, setPrecio] = useState(initialData?.precio_base || 0);
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");
  const [stock, setStock] = useState(initialData?.stock_cantidad || 0);
  
  // Relaciones
  const [categoriasIds, setCategoriasIds] = useState<number[]>(
    initialData?.categorias?.map((c) => c.id) || []
  );
  const [ingredientesIds, setIngredientesIds] = useState<number[]>(
    initialData?.ingredientes?.map((i) => i.id) || []
  );

  // Imágenes (Lista de URLs)
  const [imagenes, setImagenes] = useState<string[]>(initialData?.imagenes_url || []);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImagenes([...imagenes, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nombre,
      precio_base: precio,
      descripcion,
      stock_cantidad: stock,
      imagenes_url: imagenes,
      categorias_ids: categoriasIds,
      ingredientes_ids: ingredientesIds,
    });
  };

  const toggleSelection = (id: number, currentList: number[], setList: React.Dispatch<React.SetStateAction<number[]>>) => {
    setList(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-zinc-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-400">Nombre del Producto</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 outline-none"
            placeholder="Ej: Hamburguesa VIP"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-400">Precio Base</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 outline-none"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-400">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 focus:ring-2 focus:ring-violet-500 outline-none h-24"
          placeholder="Describí el producto..."
        />
      </div>

      {/* Gestión de Imágenes */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
          <ImageIcon size={16} /> Imágenes (URLs)
        </label>
        <div className="flex gap-2">
          <input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 outline-none"
            placeholder="https://imagen.com/foto.jpg"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-zinc-800 hover:bg-zinc-700 p-2.5 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          {imagenes.map((url, index) => (
            <div key={index} className="flex items-center justify-between bg-zinc-800/50 p-2 rounded-md border border-zinc-700">
              <span className="text-xs truncate max-w-[150px]">{url}</span>
              <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-400 hover:text-red-300">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Categorías */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-violet-400 uppercase tracking-wider">Categorías</h3>
          <div className="max-h-40 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
            {categorias?.map((c) => (
              <label key={c.id} className="flex items-center gap-2 p-2 hover:bg-zinc-800/50 rounded-md cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={categoriasIds.includes(c.id)}
                  onChange={() => toggleSelection(c.id, categoriasIds, setCategoriasIds)}
                  className="w-4 h-4 rounded border-zinc-700 text-violet-600 focus:ring-violet-500 bg-zinc-900"
                />
                <span className="text-sm">{c.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ingredientes */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Ingredientes</h3>
          <div className="max-h-40 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
            {ingredientes?.map((i) => (
              <label key={i.id} className="flex items-center gap-2 p-2 hover:bg-zinc-800/50 rounded-md cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={ingredientesIds.includes(i.id)}
                  onChange={() => toggleSelection(i.id, ingredientesIds, setIngredientesIds)}
                  className="w-4 h-4 rounded border-zinc-700 text-emerald-600 focus:ring-emerald-500 bg-zinc-900"
                />
                <span className="text-sm">{i.nombre}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-900/20 active:scale-[0.98]">
        {initialData ? "Actualizar Producto" : "Crear Producto Mágico"}
      </button>
    </form>
  );
};

export default ProductoForm;