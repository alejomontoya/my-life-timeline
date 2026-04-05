import { useState } from "react";
import { useTranslation } from "react-i18next";

function getInitialState(modal, events, categories) {
  if (!modal) return { text: "", catId: null };
  if (modal.editIndex !== null) {
    const ev = (events[modal.year] || [])[modal.editIndex];
    return { text: ev?.text || "", catId: ev?.catId ?? null };
  }
  return { text: "", catId: categories[0]?.id ?? null };
}

export default function EventModal({
  modal,
  events,
  categories,
  onClose,
  onSave,
  onCreateCategory,
}) {
  const { t } = useTranslation();
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("#8c6d3f");
  
  const initial = getInitialState(modal, events, categories);
  const [inputText, setInputText] = useState(initial.text);
  const [selCatId, setSelCatId] = useState(initial.catId);

  const handleSave = () => {
    if (!inputText.trim()) return;
    onSave(inputText.trim(), selCatId);
  };

  const handleCreateCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    const newCat = onCreateCategory(name, newCatColor);
    if (newCat) {
      setSelCatId(newCat.id);
      setNewCatName("");
    }
  };

  if (!modal) return null;

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
          <p className="lt-modal-eyebrow">
            {modal.editIndex !== null ? t("modal.editEvent") : t("modal.newEvent")}
          </p>
          <p className="lt-modal-year">{modal.year}</p>
        </div>

        <input
          className="lt-modal-input"
          placeholder={t("modal.eventPlaceholder")}
          value={inputText}
          autoFocus
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        <div>
          <p className="lt-section-label">{t("modal.category")}</p>
          <div className="lt-cat-wrap">
            <span
              className={`lt-cat-none${selCatId === null ? " selected" : ""}`}
              onClick={() => setSelCatId(null)}
            >
              {t("modal.noCategory")}
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className={`lt-cat-chip${selCatId === cat.id ? " selected" : ""}`}
                style={{
                  background: cat.bg,
                  borderColor: cat.border,
                  color: cat.text,
                }}
                onClick={() => setSelCatId(cat.id)}
              >
                {cat.name}
              </span>
            ))}
          </div>
          <div className="lt-new-cat-row">
            <input
              className="lt-new-cat-input"
              placeholder={t("modal.newCategory")}
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
            />
            <input
              type="color"
              className="lt-new-cat-color"
              value={newCatColor}
              onChange={(e) => setNewCatColor(e.target.value)}
            />
            <button className="lt-new-cat-btn" onClick={handleCreateCategory}>
              + {t("modal.create")}
            </button>
          </div>
        </div>

        <div className="lt-modal-actions">
          <button className="lt-btn-cancel" onClick={onClose}>
            {t("modal.cancel")}
          </button>
          <button
            className="lt-btn-save"
            onClick={handleSave}
            disabled={!inputText.trim()}
          >
            {modal.editIndex !== null ? t("modal.save") : t("modal.addEvent")}
          </button>
        </div>
      </div>
    </div>
  );
}
