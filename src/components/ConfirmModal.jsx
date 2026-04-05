import { useTranslation } from "react-i18next";

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText,
  cancelText,
  type = "warning"
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const icons = {
    warning: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
    danger: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    info: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  };

  const colors = {
    warning: { bg: "#fef3e2", border: "#d4923a", text: "#7a4e10", icon: "#d4923a" },
    danger: { bg: "#fde8e8", border: "#d44040", text: "#7a1010", icon: "#d44040" },
    info: { bg: "#e8f2fe", border: "#3a80d4", text: "#0d3e7a", icon: "#3a80d4" },
  };

  const colorScheme = colors[type] || colors.warning;

  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div 
          className="confirm-icon"
          style={{ background: colorScheme.bg, color: colorScheme.icon }}
        >
          {icons[type] || icons.warning}
        </div>
        
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>
        
        <div className="confirm-actions">
          <button className="confirm-btn-cancel" onClick={onCancel}>
            {cancelText || t("confirm.cancel")}
          </button>
          <button 
            className="confirm-btn-confirm" 
            onClick={onConfirm}
            style={{ 
              background: colorScheme.border,
              borderColor: colorScheme.border 
            }}
          >
            {confirmText || t("confirm.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
