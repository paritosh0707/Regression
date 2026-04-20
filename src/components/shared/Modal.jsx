import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, width = 720 }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.15)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="bg-white animate-fadeIn flex flex-col"
        style={{
          width,
          maxWidth: '90vw',
          maxHeight: '85vh',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        }}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-borderSoft">
          <h2 className="ds-h2">{title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-appleGrayHover transition-colors">
            <X size={16} className="text-[#4C4C4C]" />
          </button>
        </div>
        <div className="flex-1 overflow-auto px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
