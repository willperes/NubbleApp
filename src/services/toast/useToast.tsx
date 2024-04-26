import React, { createContext, useContext, useState } from "react";

import { Toast } from "@components";

interface Toast {
  message: string;
  type?: "success" | "error";
  duration?: number;
  action?: {
    title: string;
    onPress: () => void;
  };
}

interface ToastService {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastService>({
  toast: null,
  showToast: () => {},
  hideToast: () => {},
});

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [toast, setToast] = useState<ToastService["toast"]>(null);

  function showToast(_toast: ToastService["toast"]) {
    setToast(_toast);
  }

  function hideToast() {
    setToast(null);
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastService {
  const { toast, showToast, hideToast } = useContext(ToastContext);

  return {
    toast,
    showToast,
    hideToast,
  };
}
