from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent
PDF_PATH = ROOT / "Jupiter_Cyber_Defence_Portfolio.pdf"

W, H = A4

brand_dark = colors.HexColor("#070d1a")
brand_mid = colors.HexColor("#0c1428")
brand_accent = colors.HexColor("#7aa2ff")
muted = colors.HexColor("#a8b4d5")
white = colors.white

logo = ROOT / "jupiter_logo.jpeg"
branding = ROOT / "branding.jpeg"
gdpr = ROOT / "GDPR.png"
hipaa = ROOT / "HIPAA.png"
pdpl = ROOT / "PDPL.png"


def wrap_text(text: str, font_name: str, font_size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""

    for word in words:
        probe = word if not current else f"{current} {word}"
        if pdfmetrics.stringWidth(probe, font_name, font_size) <= max_width:
            current = probe
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def draw_wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    font: str = "Helvetica",
    size: float = 11,
    color=white,
    leading: float = 15,
) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    lines = wrap_text(text, font, size, width)
    cy = y

    for line in lines:
        c.drawString(x, cy, line)
        cy -= leading

    return cy


def draw_cover_page(c: canvas.Canvas) -> None:
    c.setFillColor(brand_dark)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(colors.Color(0.48, 0.63, 1.0, alpha=0.18))
    c.circle(80, H - 70, 140, fill=1, stroke=0)
    c.setFillColor(colors.Color(0.62, 0.52, 1.0, alpha=0.14))
    c.circle(W - 40, H - 40, 130, fill=1, stroke=0)

    if branding.exists():
        c.drawImage(
            ImageReader(str(branding)),
            W - 245,
            H - 315,
            width=210,
            height=250,
            preserveAspectRatio=True,
            anchor="c",
            mask="auto",
        )

    if logo.exists():
        c.drawImage(
            ImageReader(str(logo)),
            45,
            H - 78,
            width=30,
            height=30,
            preserveAspectRatio=True,
            mask="auto",
        )

    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(white)
    c.drawString(85, H - 60, "Jupiter Cyber Defence")

    c.setFont("Helvetica-Bold", 30)
    c.setFillColor(white)
    c.drawString(45, H - 140, "Cyber Security Portfolio")

    c.setFont("Helvetica", 14)
    c.setFillColor(muted)
    c.drawString(45, H - 170, "Continuous Security Confidence for Growing Organizations")

    paragraph = (
        "Jupiter Cyber Defence delivers practical, business-focused cybersecurity "
        "assessments that help leadership teams reduce risk, align with compliance "
        "obligations, and demonstrate measurable readiness."
    )
    draw_wrapped(
        c,
        paragraph,
        45,
        H - 220,
        330,
        font="Helvetica",
        size=12,
        color=colors.HexColor("#d7e1fa"),
        leading=17,
    )

    bullets = [
        "Clear risk visibility and prioritized remediation roadmap",
        "Compliance mapping for GDPR, PDPL, and HIPAA requirements",
        "Executive-ready evidence for audits, customers, and partners",
    ]

    y = H - 310
    for item in bullets:
        c.setFillColor(brand_accent)
        c.circle(52, y + 4, 3, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Helvetica", 11)
        c.drawString(64, y, item)
        y -= 24

    c.setFillColor(brand_mid)
    c.roundRect(45, 120, W - 90, 90, 12, fill=1, stroke=0)
    c.setStrokeColor(colors.Color(0.66, 0.75, 0.92, alpha=0.25))
    c.roundRect(45, 120, W - 90, 90, 12, fill=0, stroke=1)

    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(white)
    c.drawString(62, 182, "Book Your Free Security Snapshot")

    c.setFont("Helvetica", 11)
    c.setFillColor(muted)
    c.drawString(62, 162, "Email: info@jupitercyberdefence.com")
    c.drawString(62, 145, "Website: jupitercyberdefence.com")
    c.drawString(62, 128, "Address: Emil Görranssons Väg 219, Oxie 23842, Sweden")

    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#9fb0d8"))
    c.drawRightString(W - 45, 30, "Page 1")


def draw_second_page(c: canvas.Canvas) -> None:
    c.showPage()
    c.setFillColor(colors.HexColor("#f4f7ff"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(brand_dark)
    c.rect(0, H - 90, W, 90, fill=1, stroke=0)

    if logo.exists():
        c.drawImage(
            ImageReader(str(logo)),
            42,
            H - 68,
            width=24,
            height=24,
            preserveAspectRatio=True,
            mask="auto",
        )

    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(white)
    c.drawString(74, H - 53, "Services and Package Snapshot")

    c.setFont("Helvetica", 10)
    c.setFillColor(colors.HexColor("#d9e3ff"))
    c.drawString(45, H - 74, "Built for modern SMB and mid-size teams across EU and GCC")

    c.setFillColor(white)
    c.setStrokeColor(colors.HexColor("#d5def5"))
    c.roundRect(40, 275, 255, 440, 12, fill=1, stroke=1)

    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(brand_dark)
    c.drawString(58, 688, "What We Deliver")

    services = [
        "Continuous external exposure and attack surface review",
        "Cloud and identity hygiene checks",
        "Compliance mapping against GDPR, PDPL, and HIPAA",
        "Risk prioritization by impact and effort",
        "Executive reporting with audit-ready evidence",
        "Action plan support for first 30-60 days",
    ]

    y = 660
    for item in services:
        c.setFillColor(brand_accent)
        c.circle(62, y + 3, 2.6, fill=1, stroke=0)
        y = (
            draw_wrapped(
                c,
                item,
                72,
                y,
                205,
                font="Helvetica",
                size=10.2,
                color=colors.HexColor("#26385f"),
                leading=14,
            )
            - 6
        )

    c.setFillColor(colors.HexColor("#eef3ff"))
    c.roundRect(58, 305, 220, 95, 10, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(colors.HexColor("#21345a"))
    c.drawString(70, 377, "Ideal For")
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.HexColor("#314b7a"))
    c.drawString(70, 360, "Healthcare, Logistics, SaaS, Education,")
    c.drawString(70, 345, "and Professional Services organizations.")

    c.setFillColor(white)
    c.setStrokeColor(colors.HexColor("#d5def5"))
    c.roundRect(315, 275, W - 355, 440, 12, fill=1, stroke=1)

    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(brand_dark)
    c.drawString(333, 688, "Package Pricing Matrix")

    c.setFont("Helvetica", 9.5)
    c.setFillColor(colors.HexColor("#5872a4"))
    c.drawString(333, 671, "Indicative package ranges by country")

    headers = ["Country", "Package 1", "Package 2"]
    rows = [
        ("Oman", "OMR 80–100", "OMR 200–400"),
        ("UAE", "AED 300–500", "AED 2,000–4,000"),
        ("KSA", "SAR 300–500", "SAR 2,000–5,000"),
        ("EU", "EUR 100–150", "EUR 500–800"),
    ]

    x0, y0 = 333, 645
    col_w = [68, 76, 76]
    row_h = 24
    table_w = sum(col_w)
    table_h = row_h * (len(rows) + 1)
    col_x = [x0]
    for width in col_w:
        col_x.append(col_x[-1] + width)

    c.setFillColor(colors.HexColor("#e9efff"))
    c.roundRect(x0, y0 - row_h, table_w, row_h, 6, fill=1, stroke=0)

    for r_i in range(len(rows)):
        row_bottom = y0 - row_h * (r_i + 2)
        if r_i % 2 == 0:
            c.setFillColor(colors.HexColor("#f8faff"))
            c.rect(x0, row_bottom, table_w, row_h, fill=1, stroke=0)

    c.setStrokeColor(colors.HexColor("#d5def5"))
    c.setLineWidth(1)
    c.rect(x0, y0 - table_h, table_w, table_h, fill=0, stroke=1)

    for x in col_x[1:-1]:
        c.line(x, y0 - table_h, x, y0)
    for i in range(1, len(rows) + 1):
        y_line = y0 - row_h * i
        c.line(x0, y_line, x0 + table_w, y_line)

    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(colors.HexColor("#20345b"))
    header_baseline = y0 - row_h + ((row_h - 9) / 2) + 1
    for i, htxt in enumerate(headers):
        center_x = col_x[i] + (col_w[i] / 2)
        c.drawCentredString(center_x, header_baseline, htxt)

    c.setFont("Helvetica", 8.6)
    c.setFillColor(colors.HexColor("#314b7a"))
    for r_i, row in enumerate(rows):
        row_bottom = y0 - row_h * (r_i + 2)
        value_baseline = row_bottom + ((row_h - 8.6) / 2) + 1
        for i, cell in enumerate(row):
            center_x = col_x[i] + (col_w[i] / 2)
            c.drawCentredString(center_x, value_baseline, cell)

    c.setFillColor(colors.HexColor("#eef3ff"))
    c.roundRect(333, 305, 220, 95, 10, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(colors.HexColor("#21345a"))
    c.drawString(345, 377, "Compliance Focus")
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.HexColor("#314b7a"))
    c.drawString(345, 360, "Aligned with major regulatory expectations.")

    logos = [gdpr, hipaa, pdpl]
    lx = 350

    for p in logos:
        if p.exists():
            c.setFillColor(colors.white)
            c.circle(lx + 22, 329, 22, fill=1, stroke=0)
            c.setStrokeColor(colors.HexColor("#c7d3f2"))
            c.circle(lx + 22, 329, 22, fill=0, stroke=1)
            c.drawImage(
                ImageReader(str(p)),
                lx + 6,
                313,
                width=32,
                height=32,
                preserveAspectRatio=True,
                mask="auto",
            )
        lx += 62

    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(brand_dark)
    c.drawString(40, 245, "Let's build your security confidence roadmap.")

    c.setFont("Helvetica", 10)
    c.setFillColor(colors.HexColor("#435f91"))
    c.drawString(40, 228, "Contact: info@jupitercyberdefence.com  |  jupitercyberdefence.com")

    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#6a7fae"))
    c.drawRightString(W - 45, 30, "Page 2")


def main() -> None:
    c = canvas.Canvas(str(PDF_PATH), pagesize=A4)
    draw_cover_page(c)
    draw_second_page(c)
    c.save()
    print(f"Created: {PDF_PATH.resolve()}")


if __name__ == "__main__":
    main()
