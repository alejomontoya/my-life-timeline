import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ConfigModal({ isOpen, yearStart, yearEnd, onClose, onApply }) {
  const { t } = useTranslation();
  const [draftStart, setDraftStart] = useState(yearStart);
  const [draftEnd, setDraftEnd] = useState(yearEnd);

  const handleApply = () => {
    const s = parseInt(draftStart);
    const e = parseInt(draftEnd);
    if (!s || !e || s >= e || s < 1800 || e > 2100) return;
    onApply(s, e);
  };

  if (!isOpen) return null;

  return (
    <div
      className="lt-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lt-config-modal">
        <button className="lt-modal-close" onClick={onClose}>
          ×
        </button>
        <p className="lt-config-title">{t("config.title")}</p>

        <div className="lt-range-row">
          <div className="lt-range-field">
            <span className="lt-range-label">{t("config.from")}</span>
            <input
              className="lt-range-input"
              type="number"
              value={draftStart}
              onChange={(e) => setDraftStart(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              min="1800"
              max="2100"
            />
          </div>
          <span className="lt-range-sep">–</span>
          <div className="lt-range-field">
            <span className="lt-range-label">{t("config.to")}</span>
            <input
              className="lt-range-input"
              type="number"
              value={draftEnd}
              onChange={(e) => setDraftEnd(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              min="1800"
              max="2100"
            />
          </div>
        </div>

        <div className="lt-modal-actions">
          <button className="lt-btn-cancel" onClick={onClose}>
            {t("config.cancel")}
          </button>
          <button className="lt-btn-save" onClick={handleApply}>
            {t("config.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}
