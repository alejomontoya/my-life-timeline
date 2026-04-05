import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportToPDF(containerRef, filename = "mi-linea-de-vida") {
  if (!containerRef.current) return;

  try {
    const container = containerRef.current;
    const pages = container.querySelectorAll(".pdf-page");
    
    if (pages.length === 0) {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const page = pages[i];
      const originalDisplay = page.style.display;
      page.style.display = "block";
      
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        height: page.scrollHeight,
        windowHeight: page.scrollHeight,
      });

      page.style.display = originalDisplay;

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min((pdfWidth - margin * 2) / imgWidth, (pdfHeight - margin * 2) / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      const x = (pdfWidth - finalWidth) / 2;
      const y = margin;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error exporting PDF:", error);
    alert("Error al exportar PDF");
  }
}
