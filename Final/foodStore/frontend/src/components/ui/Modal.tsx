import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop con desenfoque */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Contenido del Modal */}
      <div className="relative w-full max-w-lg bg-zinc-950 border border-brand-red/20 rounded-3xl shadow-2xl shadow-brand-red/10 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-brand-red/10 bg-gradient-to-r from-brand-red/5 to-transparent">
          <h2 className="text-xl font-black uppercase tracking-widest text-brand-red">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-500 hover:text-white hover:bg-brand-red transition-all border border-zinc-800 hover:border-brand-red/50"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;