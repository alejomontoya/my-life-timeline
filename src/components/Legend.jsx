import { useTranslation } from "react-i18next";

export default function Legend({ categories }) {
  const { t } = useTranslation();
  
  if (categories.length === 0) return null;

  return (
    <div className="lt-legend">
      <span className="lt-legend-label">{t("legend.categories")}</span>
      {categories.map((cat) => (
        <span
          key={cat.id}
          className="lt-legend-tag"
          style={{
            background: cat.bg,
            borderColor: cat.border,
            color: cat.text,
          }}
        >
          {cat.name}
        </span>
      ))}
    </div>
  );
}
