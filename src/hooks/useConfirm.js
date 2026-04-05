import { useState, useCallback } from "react";

export function useConfirm() {
  const [modalState, setModalState] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setModalState({
        ...options,
        onConfirm: () => {
          setModalState(null);
          resolve(true);
        },
        onCancel: () => {
          setModalState(null);
          resolve(false);
        },
      });
    });
  }, []);

  return { modalState, confirm };
}

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
