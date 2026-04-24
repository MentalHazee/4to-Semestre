import { useParams, useNavigate } from "react-router-dom";
import { useProductoById } from "../../hooks/useProductoById";
import { ArrowLeft, Package, ShieldAlert, Tag, Salad } from "lucide-react";

const ProductoDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: producto, isLoading, isError } = useProductoById(Number(id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isError || !producto) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl text-red-200 text-center max-w-lg mx-auto mt-10">
        <ShieldAlert className="mx-auto mb-3 text-red-500" size={48} />
        <h2 className="text-xl font-bold">Error de Carga</h2>
        <p className="opacity-70 mt-1">No pudimos encontrar el producto solicitado.</p>
        <button onClick={() => navigate("/productos")} className="mt-4 text-sm font-bold underline">Volver al listado</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 min-h-[80vh] flex flex-col justify-center">
      {/* Cabecera */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Volver a la tienda</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex-1 rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 flex items-center justify-center group shadow-2xl">
            {producto.imagenes_url && producto.imagenes_url.length > 0 ? (
              <img 
                src={producto.imagenes_url[0]} 
                alt={producto.nombre} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            ) : (
              <Package size={80} className="text-zinc-800" />
            )}
          </div>
          
          {/* Miniaturas (si hay más de una) */}
          <div className="grid grid-cols-4 gap-3">
             {producto.imagenes_url?.slice(1).map((url, i) => (
               <div key={i} className="aspect-square rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950">
                 <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
               </div>
             ))}
          </div>
        </div>

        {/* Columna Derecha: Información y Compra */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">{producto.nombre}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{producto.descripcion || "Este producto artesanal está preparado con los mejores estándares de calidad."}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-6xl font-black text-brand-red italic tracking-tighter font-mono">${producto.precio_base.toLocaleString()}</span>
          </div>

          <div className="h-px bg-zinc-900 w-full"></div>

          {/* Categorías */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-brand-red uppercase tracking-widest flex items-center gap-2">
              <Tag size={14} /> Categorías
            </h3>
            <div className="flex flex-wrap gap-2">
              {producto.categorias?.map(cat => (
                <span key={cat.id} className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-black uppercase tracking-wider">
                  {cat.nombre}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredientes */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-brand-red uppercase tracking-widest flex items-center gap-2">
              <Salad size={14} /> Ingredientes
            </h3>
            <div className="flex flex-wrap gap-2">
              {producto.ingredientes?.map(ing => (
                <span 
                  key={ing.id} 
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-black uppercase tracking-wider"
                >
                  {ing.nombre}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900">
            <p className="text-xs text-zinc-500 uppercase font-black tracking-[0.2em]">
              Disponibilidad: <span className="text-brand-red ml-2">{producto.stock_cantidad} unidades</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetallePage;