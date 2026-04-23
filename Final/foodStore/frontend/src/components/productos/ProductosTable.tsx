import { Link } from "react-router-dom";
import type { Producto } from "../../types/producto.types";
import { Edit2, Trash2, Eye, Package, DollarSign, Layers } from "lucide-react";

interface Props {
  data: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

const ProductoTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
      <table className="w-full text-left">
        <thead className="bg-zinc-900/50 border-b border-zinc-800">
          <tr>
            <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-widest">Producto</th>
            <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-widest text-center">Precio</th>
            <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-widest text-center">Stock</th>
            <th className="p-5 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {data.map((producto) => (
            <tr key={producto.id} className="group hover:bg-zinc-800/30 transition-all duration-300">
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                    {producto.imagenes_url && producto.imagenes_url.length > 0 ? (
                        <img src={producto.imagenes_url[0]} alt={producto.nombre} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <Package size={24} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 text-lg">{producto.nombre}</span>
                    <div className="flex gap-2 mt-1">
                      {producto.categorias?.slice(0, 2).map(cat => (
                        <span key={cat.id} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {cat.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-5 text-center">
                <span className="inline-flex items-center gap-1 font-mono text-emerald-400 font-bold bg-emerald-950/20 px-3 py-1 rounded-lg border border-emerald-500/20">
                  <DollarSign size={12} /> {producto.precio_base.toLocaleString()}
                </span>
              </td>
              <td className="p-5 text-center">
                <div className="flex flex-col items-center">
                    <span className={`text-sm font-black ${producto.stock_cantidad > 5 ? 'text-zinc-300' : 'text-amber-500'}`}>
                    {producto.stock_cantidad}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Unidades</span>
                </div>
              </td>
              <td className="p-5">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <Link
                    to={`/productos/${producto.id}`}
                    className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-violet-600 hover:text-white transition-all shadow-lg"
                    title="Ver Detalle"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    onClick={() => onEdit(producto)}
                    className="p-2.5 rounded-xl bg-zinc-800 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(producto.id)}
                    className="p-2.5 rounded-xl bg-zinc-800 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="p-12 text-center">
                <div className="flex flex-col items-center gap-3 text-zinc-600">
                    <Package size={48} className="opacity-20" />
                    <p className="italic">No hay productos en el inventario.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoTable;