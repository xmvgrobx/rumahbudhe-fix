"use client";

import { useState, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Import pdf-lib

export default function LaporanPage() {
  const [periode, setPeriode] = useState("bulanan");
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month (1-12)
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default for tahunan
  const [data, setData] = useState([]);
  const [totalHarga, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/laporan?periode=${periode}&month=${month}&year=${periode === "tahunan" ? selectedYear : year}`);

        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(errorMessage || "Gagal memuat data laporan");
        }

        const result = await res.json();
        setData(result.transaksi || []);
        setTotal(result.total || 0); 
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [periode, month, year, selectedYear]);

  // Fungsi untuk mendownload laporan dalam bentuk PDF menggunakan pdf-lib
  // Fungsi untuk mendownload laporan dalam bentuk PDF menggunakan pdf-lib
  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    // Add title
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Set title
    page.drawText(`Laporan ${periode}`, {
      x: 10,
      y: height - 50,
      size: 18,
      font: boldFont,
    });

    // Add total price
    page.drawText(`Total: ${formatRupiah(totalHarga)}`, {
      x: 10,
      y: height - 80,
      size: 14,
      font,
    });

    // Table header with more spacing
    const headerYOffset = height - 120;
    const columnWidth = 100;
    const spacing = 150;
    const headerFontSize = 12;

    page.drawText("ID Transaksi", { x: 10, y: headerYOffset, size: headerFontSize, font: boldFont });
    page.drawText("Tanggal Transaksi", { x: columnWidth, y: headerYOffset, size: headerFontSize, font: boldFont });
    page.drawText("Jumlah Item", { x: columnWidth + spacing, y: headerYOffset, size: headerFontSize, font: boldFont });
    page.drawText("Total Harga", { x: columnWidth + 2 * spacing, y: headerYOffset, size: headerFontSize, font: boldFont });

    let yOffset = headerYOffset - 20;

    // Add table rows
    data.forEach((item: any, index: number) => {
      page.drawText(item.id, { x: 10, y: yOffset, size: 12, font });
      page.drawText(new Date(item.tanggal).toLocaleDateString(), { x: columnWidth, y: yOffset, size: 12, font });
      page.drawText(item.jumlah.toString(), { x: columnWidth + spacing, y: yOffset, size: 12, font });
      page.drawText(formatRupiah(item.totalHarga), { x: columnWidth + 2 * spacing, y: yOffset, size: 12, font });
      yOffset -= 20;

      // Check if the page needs to be split
      if (yOffset < 40) {
        const newPage = pdfDoc.addPage([600, 800]);
        page = newPage;
        yOffset = height - 120;
      }
    });

    // Add lines (borders)
    const lineHeight = 2;
    const drawLine = (y: number) => page.drawRectangle({
      x: 10,
      y: y - lineHeight,
      width: width - 20,
      height: lineHeight,
      color: rgb(0, 0, 0),
    });

    // Draw a line after header and rows
    drawLine(headerYOffset);
    data.forEach((_, index) => {
      drawLine(yOffset + 20);
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `Laporan_${periode}_${new Date().toLocaleDateString()}.pdf`;
    link.click();
  };
  return (
    <div className="max-w-screen-lg mx-auto py-14">
      <h1 className="text-4xl font-bold">Laporan {periode}</h1>

      <div className="mt-4">
        <button
          onClick={() => setPeriode("bulanan")}
          className={`py-2 px-4 mr-2 rounded ${periode === "bulanan" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Bulanan
        </button>
        <button
          onClick={() => setPeriode("tahunan")}
          className={`py-2 px-4 rounded ${periode === "tahunan" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Tahunan
        </button>
      </div>

      {periode === "bulanan" && (
        <div className="mt-4 flex space-x-4">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="py-2 px-4 border rounded"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString("id-ID", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="py-2 px-4 border rounded"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      {periode === "tahunan" && (
        <div className="mt-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="py-2 px-4 border rounded"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && <p className="mt-5">Memuat data...</p>}
      {error && <p className="mt-5 text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">Total: {formatRupiah(totalHarga)}</h2>
          <table className="mt-5 w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">ID Transaksi</th>
                <th className="py-2 px-4 text-left">Tanggal Transaksi</th>
                <th className="py-2 px-4 text-left">Jumlah Item</th>
                <th className="py-2 px-4 text-left">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{new Date(item.tanggal).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{item.jumlah}</td>
                  <td className="py-2 px-4">{formatRupiah(item.totalHarga)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tombol Download PDF */}
          <button
            onClick={downloadPDF}
            className="mt-4 py-2 px-6 bg-amber-600 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
