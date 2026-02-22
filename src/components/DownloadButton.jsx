import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function DownloadButton({ targetRef, student }) {
  const [loading, setLoading] = useState(false)

  const disabled = !student || !targetRef?.current || loading

  const handleDownload = async () => {
    if (!student || !targetRef?.current) return

    setLoading(true)
    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST')

      const safeId = String(student.Certificate_ID || 'Unknown').replace(
        /[^a-zA-Z0-9_-]/g,
        '_',
      )
      pdf.save(`Certificate_${safeId}.pdf`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={disabled}
      className={
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ' +
        (disabled
          ? 'cursor-not-allowed bg-slate-200 text-slate-500'
          : 'bg-slate-900 text-white hover:bg-slate-800')
      }
    >
      {loading ? 'Generating PDF…' : 'Download PDF'}
    </button>
  )
}

export default DownloadButton
