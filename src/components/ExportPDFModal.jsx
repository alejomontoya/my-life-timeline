import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TimelinePDF from "./TimelinePDF";
import { exportToPDF } from "../hooks/useExportPDF";

export default function ExportPDFModal({
  isOpen,
  yearStart,
  yearEnd,
  events,
  categories,
  onClose,
}) {
  const { t } = useTranslation();
  const previewRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    await exportToPDF(previewRef, "mi-linea-de-vida");
    setIsExporting(false);
  };

  return (
    <div className="pdf-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pdf-modal">
        <button className="pdf-modal-close" onClick={onClose}>×</button>
        
        <div className="pdf-modal-header">
          <h2 className="pdf-modal-title">{t("pdf.title")}</h2>
          <p className="pdf-modal-subtitle">{t("pdf.subtitle")}</p>
        </div>

        <div className="pdf-preview-wrapper">
          <div className="pdf-preview-scroll">
            <TimelinePDF
              ref={previewRef}
              yearStart={yearStart}
              yearEnd={yearEnd}
              events={events}
              categories={categories}
            />
          </div>
        </div>

        <div className="pdf-modal-actions">
          <button className="pdf-btn-cancel" onClick={onClose}>
            {t("pdf.cancel")}
          </button>
          <button
            className="pdf-btn-export"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? t("pdf.exporting") : t("pdf.export")}
          </button>
        </div>
      </div>
    </div>
  );
}
