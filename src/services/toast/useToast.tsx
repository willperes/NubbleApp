import { ToastService } from "./toastTypes";
import { useToastZustand, useToastZustandService } from "./useToastZustand";

export function useToast(): ToastService["toast"] {
  return useToastZustand();
}

export function useToastService(): Pick<
  ToastService,
  "showToast" | "hideToast"
> {
  return useToastZustandService();
}
