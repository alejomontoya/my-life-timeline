import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useConfirm } from "./hooks/useConfirm";
import { useToast } from "./hooks/useToast";
import { hex2rgba } from "./utils/colors";
import Header from "./components/Header";
import Legend from "./components/Legend";
import Timeline from "./components/Timeline";
import EventModal from "./components/EventModal";
import ConfigModal from "./components/ConfigModal";
import ExportPDFModal from "./components/ExportPDFModal";
import EmptyState from "./components/EmptyState";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";
import i18n from "./i18n";
import "./styles/timeline.css";

export default function LifeTimeline() {
  const { t } = useTranslation();
  const { modalState, confirm } = useConfirm();
  const { toastState, showToast, hideToast } = useToast();

  const [yearStart, setYearStart] = useLocalStorage(
    "lifeTimelineYearStart",
    2000
  );
  const [yearEnd, setYearEnd] = useLocalStorage("lifeTimelineYearEnd", 2026);
  const [events, setEvents] = useLocalStorage("lifeTimelineEvents", {});
  const [categories, setCategories] = useLocalStorage(
    "lifeTimelineCategories",
    []
  );

  const [modal, setModal] = useState(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [pdfExportOpen, setPdfExportOpen] = useState(false);

  const getCategory = (id) => categories.find((c) => c.id === id);

  const exportData = () => {
    const data = { yearStart, yearEnd, categories, events };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "timeline-data.json";
    link.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        setYearStart(data.yearStart ?? 2000);
        setYearEnd(data.yearEnd ?? 2026);
        setEvents(data.events ?? {});
        setCategories(data.categories ?? []);
        e.target.value = "";
        showToast(t("toast.importSuccess"), "success");
      } catch {
        showToast(t("confirm.invalidJSON"), "error");
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = async () => {
    const result = await confirm({
      title: t("confirm.clearAllTitle"),
      message: t("confirm.clearAllMessage"),
      type: "danger",
      confirmText: t("confirm.delete"),
      cancelText: t("confirm.cancel"),
    });

    if (result) {
      setEvents({});
      setCategories([]);
      setYearStart(2000);
      setYearEnd(2026);
    }
  };

  const loadExample = async () => {
    if (Object.keys(events).length > 0) {
      const result = await confirm({
        title: t("confirm.loadExampleTitle"),
        message: t("confirm.loadExampleMessage"),
        type: "info",
        confirmText: t("confirm.continue"),
        cancelText: t("confirm.cancel"),
      });
      if (!result) return;
    }

    try {
      const lang = i18n.language;
      const response = await fetch(
        `${import.meta.env.BASE_URL}${
          lang === "en" ? "example" : "ejemplo"
        }.json`
      );
      const data = await response.json();
      setYearStart(data.yearStart);
      setYearEnd(data.yearEnd);
      setEvents(data.events);
      setCategories(data.categories);
      showToast(t("toast.exampleLoaded"), "success");
    } catch {
      showToast(t("confirm.loadError"), "error");
    }
  };

  const openAdd = (year) => {
    setModal({ year, editIndex: null });
  };

  const openEdit = (year, idx) => {
    setModal({ year, editIndex: idx });
  };

  const closeModal = () => setModal(null);

  const saveEvent = (text, catId) => {
    const entry = { text, catId };
    setEvents((prev) => {
      const list = [...(prev[modal.year] || [])];
      modal.editIndex !== null
        ? (list[modal.editIndex] = entry)
        : list.push(entry);
      return { ...prev, [modal.year]: list };
    });
    setModal(null);
  };

  const deleteEvent = (year, idx) => {
    setEvents((prev) => ({
      ...prev,
      [year]: (prev[year] || []).filter((_, i) => i !== idx),
    }));
  };

  const createCategory = (name, color) => {
    if (categories.find((c) => c.name.toLowerCase() === name.toLowerCase())) {
      showToast(t("toast.categoryExists"), "error");
      return null;
    }
    const id = `c${Date.now()}`;
    const newCat = {
      id,
      name,
      bg: hex2rgba(color, 0.18),
      border: color,
      text: color,
    };
    setCategories((p) => [...p, newCat]);
    return newCat;
  };

  const applyConfig = (start, end) => {
    setYearStart(start);
    setYearEnd(end);
    setConfigOpen(false);
  };

  const total = Object.values(events).reduce((s, a) => s + a.length, 0);

  return (
    <div className="lt">
      <Header
        yearStart={yearStart}
        yearEnd={yearEnd}
        total={total}
        onOpenConfig={() => setConfigOpen(true)}
        onExport={exportData}
        onImport={importData}
        onLoadExample={loadExample}
        onClearAll={handleClearAll}
        onExportPDF={() => setPdfExportOpen(true)}
      />

      <Legend categories={categories} />

      {total === 0 ? (
        <EmptyState
          onLoadExample={loadExample}
          onOpenAdd={openAdd}
          yearStart={yearStart}
        />
      ) : (
        <Timeline
          yearStart={yearStart}
          yearEnd={yearEnd}
          events={events}
          getCategory={getCategory}
          onOpenAdd={openAdd}
          onOpenEdit={openEdit}
          onDelete={deleteEvent}
        />
      )}

      <footer className="lt-footer">
        <p>
          {t("footer.madeWith")} <span className="heart">♥</span>{" "}
          {t("footer.by")}{" "}
          <a
            href="https://github.com/alejomontoya"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alejandro Pinto
          </a>
        </p>
        <p className="inspiration">
          {t("footer.inspiredBy")}{" "}
          <a
            href="https://www.instagram.com/psicopaulapolo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Psicóloga Maria Paula Polo
          </a>
        </p>
      </footer>

      <EventModal
        modal={modal}
        events={events}
        categories={categories}
        onClose={closeModal}
        onSave={saveEvent}
        onCreateCategory={createCategory}
      />

      <ConfigModal
        isOpen={configOpen}
        yearStart={yearStart}
        yearEnd={yearEnd}
        onClose={() => setConfigOpen(false)}
        onApply={applyConfig}
      />

      <ExportPDFModal
        isOpen={pdfExportOpen}
        yearStart={yearStart}
        yearEnd={yearEnd}
        events={events}
        categories={categories}
        onClose={() => setPdfExportOpen(false)}
      />

      {modalState && (
        <ConfirmModal
          isOpen={true}
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
          confirmText={modalState.confirmText}
          cancelText={modalState.cancelText}
          onConfirm={modalState.onConfirm}
          onCancel={modalState.onCancel}
        />
      )}

      {toastState && (
        <Toast
          key={toastState.id}
          message={toastState.message}
          type={toastState.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
