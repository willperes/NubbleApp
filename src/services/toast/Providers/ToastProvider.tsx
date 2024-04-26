import React, { createContext, useState } from "react";

import { Toast } from "@components";

import { ToastService } from "../toastTypes";

export const ToastContext = createContext<ToastService>({
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