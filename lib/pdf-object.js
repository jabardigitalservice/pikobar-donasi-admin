window.__HAS_SHOWN_PDF_OBJECT_ALERT = false

export async function getPDFObject() {
  if (!window.__PDF_OBJECT) {
    const PDFObject = await import('pdfobject').then((m) =>
      m ? m.default || m : null
    )
    if (!PDFObject.supportsPDFs && !window.__HAS_SHOWN_PDF_OBJECT_ALERT) {
      alert('Browser ini tidak dapat menampilkan file PDF')
      window.__HAS_SHOWN_PDF_OBJECT_ALERT = true
    }
    window.__PDF_OBJECT = PDFObject
  }
  return window.__PDF_OBJECT
}
