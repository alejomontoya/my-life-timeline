import { useRef } from "react";
import EventCard from "./EventCard";

export default function Timeline({
  yearStart,
  yearEnd,
  events,
  getCategory,
  onOpenAdd,
  onOpenEdit,
  onDelete,
}) {
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const allYears = Array.from(
    { length: Math.max(0, yearEnd - yearStart + 1) },
    (_, i) => yearStart + i
  );

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    dragging.current = false;
    const el = scrollRef.current;
    const sx = e.pageX;
    const sl = el.scrollLeft;

    const onMove = (me) => {
      dragging.current = true;
      el.scrollLeft = sl - (me.pageX - sx);
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div className="lt-scroll" ref={scrollRef} onMouseDown={handleMouseDown}>
      <div className="lt-track" ref={trackRef}>
        <div className="lt-events-row">
          {allYears.map((year) => (
            <div key={year} className="lt-year-col">
              <div className="lt-events-stack">
                {(events[year] || []).map((ev, i) => (
                  <EventCard
                    key={i}
                    event={ev}
                    category={getCategory(ev.catId)}
                    onEdit={() => onOpenEdit(year, i)}
                    onDelete={() => onDelete(year, i)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lt-axis">
          <div className="lt-axis-line" />
          {allYears.map((year) => (
            <div key={year} className="lt-dot-wrap">
              <div
                className={`lt-dot${(events[year] || []).length ? " active" : ""}`}
                onClick={() => onOpenAdd(year)}
                title={`Añadir evento en ${year}`}
              />
            </div>
          ))}
        </div>

        <div className="lt-labels-row">
          {allYears.map((year) => (
            <div key={year} className="lt-label-col">
              <span className={`lt-year-num ${year % 5 === 0 ? "major" : "minor"}`}>
                {year}
              </span>
              <button className="lt-add" onClick={() => onOpenAdd(year)}>
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
