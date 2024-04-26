export interface Toast {
  message: string;
  type?: Toast.Type;
  position?: Toast.Position;
  duration?: number;
  action?: {
    title: string;
    onPress: () => void;
  };
}

export namespace Toast {
  export type Type = "success" | "error";
  export type Position = "top" | "bottom";
}

export interface ToastService {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  hideToast: () => void;
}
