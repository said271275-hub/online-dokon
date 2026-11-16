import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm transition-all duration-300 animate-slide-up ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-200'
                : isError
                ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-200'
                : 'bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-950/80 dark:border-indigo-800 dark:text-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
