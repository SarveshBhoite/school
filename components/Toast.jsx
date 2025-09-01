import { useEffect } from 'react';

export default function Toast({ open, title = 'Done', message = '', type = 'success', onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  const tone = type === 'success'
    ? 'border-green-300 bg-green-50 text-green-800'
    : type === 'error'
    ? 'border-red-300 bg-red-50 text-red-800'
    : 'border-slate-300 bg-slate-50 text-slate-800';

  return (
    <div className="fixed inset-x-0 top-4 z-[9999] flex justify-center px-4">
      <div className={`w-full max-w-md rounded-xl border ${tone} shadow-md`}>
        <div className="flex items-start gap-3 p-3">
          <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-70" />
          <div className="flex-1">
            <p className="font-semibold leading-tight">{title}</p>
            {message && <p className="text-sm opacity-90">{message}</p>}
          </div>
          <button onClick={onClose} className="px-2 text-sm opacity-70 hover:opacity-100">✕</button>
        </div>
      </div>
    </div>
  );
}
