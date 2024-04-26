import { create } from "zustand";

import { ToastService } from "./toastTypes";

const useToastStore = create<ToastService>(set => ({
  toast: null,
  showToast: toast => set({ toast }),
  hideToast: () => set({ toast: null }),
}));

export function useToastZustand(): ToastService["toast"] {
  return useToastStore(state => state.toast);
}

export function useToastZustandService(): Pick<
  ToastService,
  "showToast" | "hideToast"
> {
  return useToastStore(state => ({
    showToast: state.showToast,
    hideToast: state.hideToast,
  }));
}
