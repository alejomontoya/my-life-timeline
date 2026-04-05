import { useState, useCallback } from "react";

export function useToast() {
  const [toastState, setToastState] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToastState({ message, type, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToastState(null);
  }, []);

  return { toastState, showToast, hideToast };
}
