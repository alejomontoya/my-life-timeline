export default function EventCard({ event, category, onEdit, onDelete }) {
  const style = category
    ? {
        background: category.bg,
        borderColor: category.border,
        color: category.text,
      }
    : {
        background: "#f4f2ee",
        borderColor: "#e0ddd8",
        color: "#5a5650",
      };

  return (
    <div className="lt-card" onClick={onEdit} style={style}>
      {event.text}
      <button
        className="lt-card-del"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        ×
      </button>
    </div>
  );
}
