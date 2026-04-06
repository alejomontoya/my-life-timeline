import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  onCreateCategory,
}) {
  const { t } = useTranslation();
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("#8c6d3f");

  const handleCreateCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    const newCat = onCreateCategory(name, newCatColor);
    if (newCat) {
      setNewCatName("");
      setNewCatColor("#8c6d3f");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="lt-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lt-modal">
        <button className="lt-modal-close" onClick={onClose}>
          ×
        </button>
        <div>
          <p className="lt-modal-eyebrow">{t("modal.newCategory")}</p>
        </div>

        <div>
          <p className="lt-section-label">{t("modal.existingCategories")}</p>
          <div className="lt-cat-wrap">
            {categories.length === 0 ? (
              <span className="lt-cat-none">{t("modal.noCategories")}</span>
            ) : (
              categories.map((cat) => (
                <span
                  key={cat.id}
                  className="lt-cat-chip"
                  style={{
                    background: cat.bg,
                    borderColor: cat.border,
                    color: cat.text,
                  }}
                >
                  {cat.name}
                </span>
              ))
            )}
          </div>
        </div>

        <div>
          <p className="lt-section-label">{t("modal.createNewCategory")}</p>
          <div className="lt-new-cat-row">
            <input
              className="lt-new-cat-input"
              placeholder={t("modal.categoryNamePlaceholder")}
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
              autoFocus
            />
            <input
              type="color"
              className="lt-new-cat-color"
              value={newCatColor}
              onChange={(e) => setNewCatColor(e.target.value)}
            />
            <button
              className="lt-new-cat-btn"
              onClick={handleCreateCategory}
              disabled={!newCatName.trim()}
            >
              + {t("modal.create")}
            </button>
          </div>
        </div>

        <div className="lt-modal-actions">
          <button className="lt-btn-cancel" onClick={onClose}>
            {t("modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
