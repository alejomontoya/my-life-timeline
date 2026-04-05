import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";

const YEARS_PER_PAGE = 8;

const PageHeader = ({ title, pageNum, totalPages }) => (
  <div className="pdf-page-header">
    <h1 className="pdf-page-title">{title}</h1>
    {totalPages > 1 && <span className="pdf-page-num">{pageNum} / {totalPages}</span>}
  </div>
);

const CategoriesLegend = ({ categories, label }) => {
  if (!categories || categories.length === 0) return null;
  
  return (
    <div className="pdf-legend">
      <span className="pdf-legend-label">{label}</span>
      {categories.map((cat) => (
        <span
          key={cat.id}
          className="pdf-legend-tag"
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
};

const TimelinePDF = forwardRef(function TimelinePDF(
  { yearStart, yearEnd, events, categories },
  ref
) {
  const { t } = useTranslation();
  const getCategory = (id) => categories?.find((c) => c.id === id);
  const totalYears = yearEnd - yearStart + 1;
  const totalPages = Math.ceil(totalYears / YEARS_PER_PAGE);

  const pages = useMemo(() => {
    const result = [];
    for (let page = 0; page < totalPages; page++) {
      const startYear = yearStart + page * YEARS_PER_PAGE;
      const count = Math.min(YEARS_PER_PAGE, totalYears - page * YEARS_PER_PAGE);
      const years = Array.from({ length: count }, (_, i) => startYear + i);
      result.push({ page, years });
    }
    return result;
  }, [yearStart, totalYears, totalPages]);

  return (
    <div ref={ref} className="pdf-container">
      {pages.map(({ page, years }) => (
        <div key={page} className="pdf-page">
          <PageHeader title={t("app.title")} pageNum={page + 1} totalPages={totalPages} />
          
          {page === 0 && <CategoriesLegend categories={categories} label={t("legend.categories")} />}
          
          <div className="pdf-timeline">
            {years.map((year, idx) => {
              const yearEvents = events[year] || [];
              const hasEvents = yearEvents.length > 0;
              const isFirstInPage = idx === 0;

              return (
                <div 
                  key={year} 
                  className="pdf-year-block"
                  style={{ paddingTop: isFirstInPage ? 5 : 0 }}
                >
                  <div className="pdf-year-left">
                    <div className="pdf-year-label">{year}</div>
                    <div className="pdf-year-marker">
                      <div className="pdf-marker-line" />
                      <div 
                        className="pdf-marker-dot"
                        style={{
                          width: hasEvents ? 18 : 14,
                          height: hasEvents ? 18 : 14,
                          background: hasEvents ? "#8c6d3f" : "#fff",
                        }}
                      />
                      <div className="pdf-marker-line" />
                    </div>
                  </div>
                  
                  <div className="pdf-year-right">
                    {yearEvents.length > 0 ? (
                      yearEvents.map((ev, i) => {
                        const cat = getCategory(ev.catId);
                        return (
                          <div
                            key={i}
                            className="pdf-event-card"
                            style={
                              cat
                                ? {
                                    background: cat.bg,
                                    borderColor: cat.border,
                                    color: cat.text,
                                    borderLeftWidth: 4,
                                  }
                                : {}
                            }
                          >
                            {ev.text}
                          </div>
                        );
                      })
                    ) : (
                      <div className="pdf-event-placeholder" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

export default TimelinePDF;
