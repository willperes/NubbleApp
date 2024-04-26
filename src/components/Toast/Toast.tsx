import React, { useEffect } from "react";

import { useToast, useToastService } from "@services";

import { ToastContent } from "./components/ToastContent";

const DEFAULT_DURATION = 2000;

export function Toast() {
  const toast = useToast();
  const { hideToast } = useToastService();

  useEffect(() => {
    setTimeout(() => {
      hideToast();
    }, toast?.duration || DEFAULT_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (!toast) {
    return null;
  }

  return <ToastContent toast={toast} />;
}
