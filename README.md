


## Status
**frontend-only certificate generator** is now implemented in [certificate-generator/](cci:9://file:///c:/Users/lakhan giri sp college/Freelace-Work/certificate-generator:0:0-0:0) with the **exact required structure** and flow:

- **Excel upload (.xlsx only)** → parsed fully in browser using `xlsx`
- **Student table** with **single-row selection + highlight**
- **Live certificate preview** (absolute-positioned template)
- **Download PDF** (landscape A4) using `html2canvas` + `jsPDF`
- **Filename**: `Certificate_<Certificate_ID>.pdf`

## What I changed / added



## Dev server

Your dev server is running at:

- `http://localhost:5173/`

## How to use

- **Upload** an `.xlsx` with columns:
  - `Name`, `Course`, `Certificate_ID`, `Issue_Date`
- Click a student row to preview
- Click **Download PDF** to generate the certificate PDF

## Note (important)

I switched your project from experimental `rolldown-vite` back to stable `vite` to avoid Node engine mismatch warnings and keep `npm run dev` reliable on your current Node version.

## Completion

All requested features + required structure are implemented and the app is running.