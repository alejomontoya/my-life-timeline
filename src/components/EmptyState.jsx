import { useTranslation } from "react-i18next";

export default function EmptyState({ onLoadExample, onOpenAdd, yearStart }) {
  const { t } = useTranslation();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="empty-state-title">{t("empty.title")}</h2>
      <p className="empty-state-text">{t("empty.text")}</p>
      <div className="empty-state-actions">
        <button
          className="empty-btn-primary"
          onClick={() => onOpenAdd(yearStart)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t("empty.addFirst")}
        </button>
        <button className="empty-btn-secondary" onClick={onLoadExample}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          {t("empty.seeExample")}
        </button>
      </div>
    </div>
  );
}
