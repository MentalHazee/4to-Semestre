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
    <div className="overflow-hidden rounded-2xl border border-brand-red/20 bg-zinc-950/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-brand-red/10 border-b border-brand-red/20">
          <tr>
            <th className="p-5 text-xs font-black text-brand-red uppercase tracking-widest">Producto</th>
            <th className="p-5 text-xs font-black text-brand-red uppercase tracking-widest text-center">Precio</th>
            <th className="p-5 text-xs font-black text-brand-red uppercase tracking-widest text-center">Stock</th>
            <th className="p-5 text-xs font-black text-brand-red uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-red/10">
          {data.map((producto) => (
            <tr key={producto.id} className="group hover:bg-brand-red/5 transition-all duration-300">
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red group-hover:scale-105 transition-transform overflow-hidden shadow-lg shadow-black">
                    {producto.imagenes_url && producto.imagenes_url.length > 0 ? (
                        <img src={producto.imagenes_url[0]} alt={producto.nombre} className="w-full h-full object-cover" />
                    ) : (
                        <Package size={24} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-white text-xl uppercase tracking-tighter leading-none mb-2">{producto.nombre}</span>
                    <div className="flex flex-wrap gap-1">
                      {producto.categorias?.slice(0, 2).map(cat => (
                        <span key={cat.id} className="text-[10px] font-black px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/20 uppercase">
                          {cat.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-5 text-center">
                <span className="inline-flex items-center gap-1 font-mono text-brand-red font-black bg-brand-red/10 px-3 py-1 rounded-lg border border-brand-red/20 shadow-inner">
                  <DollarSign size={14} /> {producto.precio_base.toLocaleString()}
                </span>
              </td>
              <td className="p-5 text-center">
                <div className="flex flex-col items-center">
                    <span className={`text-lg font-black ${producto.stock_cantidad > 5 ? 'text-zinc-100' : 'text-brand-red animate-pulse'}`}>
                    {producto.stock_cantidad}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Unidades</span>
                </div>
              </td>
              <td className="p-5">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <Link
                    to={`/productos/${producto.id}`}
                    className="p-2.5 rounded-xl bg-zinc-900 text-white border border-zinc-800 hover:bg-brand-red hover:border-brand-red transition-all shadow-lg"
                    title="Ver Detalle"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    onClick={() => onEdit(producto)}
                    className="p-2.5 rounded-xl bg-zinc-900 text-white border border-zinc-800 hover:bg-brand-red hover:border-brand-red transition-all shadow-lg"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(producto.id)}
                    className="p-2.5 rounded-xl bg-brand-red/20 text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white transition-all shadow-lg"
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
              <td colSpan={4} className="p-16 text-center">
                <div className="flex flex-col items-center gap-4 text-zinc-700">
                    <Package size={64} className="opacity-10" />
                    <p className="font-black uppercase tracking-widest text-lg">El inventario está vacío. ¡Ponéte las pilas!</p>
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