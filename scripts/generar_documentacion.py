"""Genera docs/Documentacion_Integral_IHC.pdf desde su Markdown y figuras locales.

Instalar docs/requirements-documentacion.txt y ejecutar desde cualquier directorio.
La revisión visual del PDF se realiza después de cada actualización sustancial.
"""
from __future__ import annotations
import argparse
import html
import re
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Image, KeepTogether,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT=Path(__file__).resolve().parents[1]
FONTDIR=ROOT/'scripts/fonts'
pdfmetrics.registerFont(TTFont('DocumentSerif',str(FONTDIR/'STIXGeneral.ttf')))
pdfmetrics.registerFont(TTFont('DocumentSerifBold',str(FONTDIR/'STIXGeneralBol.ttf')))
pdfmetrics.registerFontFamily('DocumentSerif',normal='DocumentSerif',bold='DocumentSerifBold',italic='DocumentSerif',boldItalic='DocumentSerifBold')
INK=colors.HexColor('#142a42')
BLUE=colors.HexColor('#1d4e78')
PALE=colors.HexColor('#edf3f8')
GREY=colors.HexColor('#526271')


def normalise(text):
    substitutions={'−':'-','–':'-','—':'-','‑':'-','→':' -> ','↔':' <-> ','×':' x ','≤':'<=','≥':'>=','…':'...','✓':'sí','☐':'[ ]'}
    for source,target in substitutions.items():text=text.replace(source,target)
    return text


def inline(text):
    text=normalise(text)
    # Se escapa antes de crear etiquetas del documento; no se interpreta HTML de usuario.
    text=html.escape(text,quote=True)
    text=re.sub(r'`([^`]+)`',r'<font name="Courier" size="8.8">\1</font>',text)
    text=re.sub(r'\*\*([^*]+)\*\*',r'<b>\1</b>',text)
    text=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',lambda m:f'<link href="{m.group(2)}" color="#1d4e78">{m.group(1)}</link>',text)
    return text


class Report(BaseDocTemplate):
    def __init__(self,path,**kwargs):
        super().__init__(path,pagesize=A4,leftMargin=50,rightMargin=50,topMargin=55,bottomMargin=48,
            title='Documentación integral IHC - CaféU y Dashboard UX',author='William Martínez; equipo IHC UTA',
            subject='Doce tarjetas, dos incidencias, arquitectura, pruebas y GitHub',pageCompression=1,**kwargs)
        self.addPageTemplates(PageTemplate(id='normal',frames=[Frame(self.leftMargin,self.bottomMargin,self.width,self.height,id='body',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)],onPage=self.decorate))
        self.heading_count=0

    def decorate(self,canvas,doc):
        canvas.saveState()
        if doc.page>1:
            canvas.setFont('DocumentSerif',9);canvas.setFillColor(GREY)
            canvas.drawString(50,A4[1]-28,'UTA | IHC | CaféU y Dashboard UX')
            canvas.setStrokeColor(colors.HexColor('#c6d5e2'));canvas.line(50,A4[1]-36,A4[0]-50,A4[1]-36)
        canvas.setFont('DocumentSerif',9);canvas.setFillColor(GREY)
        canvas.drawString(50,25,'William Martínez | 28 de octubre de 2026')
        canvas.drawRightString(A4[0]-50,25,str(doc.page))
        canvas.restoreState()

    def afterFlowable(self,flowable):
        if isinstance(flowable,Paragraph) and flowable.style.name in ('MainHeading','SubHeading'):
            level=0 if flowable.style.name=='MainHeading' else 1
            title=flowable.getPlainText()
            if title=='Índice':return
            self.heading_count+=1
            key=f'heading-{self.seq.nextf("heading")}'
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title,key,level=level,closed=True)
            if level==0:self.notify('TOCEntry',(level,title,self.page,key))


def build(source,destination):
    styles=getSampleStyleSheet()
    body=ParagraphStyle('Body',fontName='DocumentSerif',fontSize=11,leading=14.5,textColor=INK,alignment=TA_JUSTIFY,spaceAfter=7,splitLongWords=True)
    h1=ParagraphStyle('MainHeading',parent=body,fontName='DocumentSerifBold',fontSize=12,leading=16,textColor=BLUE,spaceBefore=14,spaceAfter=9,keepWithNext=True,alignment=TA_LEFT)
    h2=ParagraphStyle('SubHeading',parent=h1,fontSize=12,leading=15,spaceBefore=11,spaceAfter=7)
    h3=ParagraphStyle('MinorHeading',parent=h2,fontSize=11,leading=14,spaceBefore=8)
    title=ParagraphStyle('CoverTitle',parent=h1,fontSize=24,leading=29,spaceBefore=60,spaceAfter=30,alignment=TA_CENTER)
    cover=ParagraphStyle('Cover',parent=body,fontSize=12,leading=18,alignment=TA_CENTER,spaceAfter=15)
    table_body=ParagraphStyle('TableBody',parent=body,fontSize=9.5,leading=12,alignment=TA_LEFT,spaceAfter=0)
    table_head=ParagraphStyle('TableHead',parent=table_body,fontName='DocumentSerifBold',textColor=colors.white)
    code=ParagraphStyle('Code',fontName='Courier',fontSize=8.3,leading=11,textColor=INK,spaceAfter=3,alignment=TA_LEFT,splitLongWords=True)
    caption=ParagraphStyle('Caption',parent=body,fontSize=9,leading=12,alignment=TA_CENTER,textColor=GREY)
    doc=Report(str(destination))
    text=source.read_text(encoding='utf-8')
    lines=text.splitlines();story=[];i=0;on_cover=True;seen_h1=False
    while i<len(lines):
        line=lines[i].strip()
        if not line:i+=1;continue
        if line=='<!-- PAGEBREAK -->':
            if story and not isinstance(story[-1],PageBreak):story.append(PageBreak())
            on_cover=False;i+=1;continue
        if line=='<!-- TOC -->':
            toc=TableOfContents();toc.levelStyles=[ParagraphStyle('TOC0',fontName='DocumentSerif',fontSize=10.5,leading=15,leftIndent=0,firstLineIndent=0,spaceBefore=4)];story.append(toc);i+=1;continue
        if line.startswith('<!--'):i+=1;continue
        if line.startswith('```'):
            i+=1
            while i<len(lines) and not lines[i].strip().startswith('```'):
                story.append(Paragraph(inline(lines[i]).replace(' ','&nbsp;'),code));i+=1
            story.append(Spacer(1,6));i+=1;continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                row=[cell.strip() for cell in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?',cell.replace(' ','')) for cell in row):rows.append(row)
                i+=1
            n=max(len(r) for r in rows)
            for row in rows:row.extend(['']*(n-len(row)))
            # Distribución según el contenido; evita celdas estrechas para criterios largos.
            if n==6:ratios=[.12,.08,.11,.19,.25,.25]
            elif n==5:
                ratios=[.07,.41,.2,.12,.2] if rows[0][0]=='Punto' else [.13,.11,.21,.32,.23]
            elif n==4:
                if 'SHA-256' in ' '.join(rows[0]):ratios=[.34,.66,0,0]
                elif rows[0][0] in ('Commit','PR'):ratios=[.12,.18,.23,.47] if rows[0][0]=='Commit' else [.08,.17,.5,.25]
                elif rows[0][0]=='ID':ratios=[.08,.38,.15,.39]
                elif rows[0][0]=='Issue':ratios=[.09,.45,.27,.19]
                else:ratios=[.1,.17,.4,.33]
            elif n==3:
                if rows[0][0]=='ID':ratios=[.08,.43,.49]
                elif rows[0][0]=='Caso':ratios=[.58,.1,.32]
                elif rows[0][0]=='Suite':ratios=[.35,.12,.53]
                else:ratios=[.24,.39,.37]
            elif n==2:ratios=[.34,.66]
            else:ratios=[1/n]*n
            cells=[[Paragraph(inline(cell),table_head if ri==0 else table_body) for cell in row] for ri,row in enumerate(rows)]
            table=Table(cells,colWidths=[doc.width*x for x in ratios],repeatRows=1,hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND',(0,0),(-1,0),BLUE),('VALIGN',(0,0),(-1,-1),'TOP'),
                ('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),
                ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
                ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PALE]),
                ('LINEBELOW',(0,0),(-1,0),.6,BLUE),('LINEBELOW',(0,1),(-1,-1),.25,colors.HexColor('#d5dfe7'))]))
            story.append(table);story.append(Spacer(1,9));continue
        image=re.fullmatch(r'!\[([^\]]*)\]\(([^)]+)\)',line)
        if image:
            path=(source.parent/image.group(2)).resolve()
            if not path.is_file():raise FileNotFoundError(path)
            width,height=ImageReader(str(path)).getSize()
            factor=min(doc.width/width,610/height)
            obj=Image(str(path),width=width*factor,height=height*factor);obj.hAlign='CENTER'
            story.append(obj);story.append(Spacer(1,6));story.append(Paragraph(inline(image.group(1))+' · Captura técnica automática; original en el repositorio.',caption));i+=1;continue
        match=re.match(r'^(#{1,6})\s+(.*)',line)
        if match:
            level=len(match.group(1));heading=match.group(2)
            if on_cover and not seen_h1:
                story.append(Paragraph(inline(heading),title));seen_h1=True
            else:
                style=h1 if level<=2 else h2 if level==3 else h3
                story.append(Paragraph(inline(heading),style))
            i+=1;continue
        if line.startswith('- '):
            story.append(Paragraph(inline(line[2:]),ParagraphStyle('BulletBody',parent=body,leftIndent=13,firstLineIndent=-9),bulletText='-'));i+=1;continue
        if re.match(r'^\d+\.\s',line):
            story.append(Paragraph(inline(line),body));i+=1;continue
        if line.startswith('>'):line=line.lstrip('> ')
        story.append(Paragraph(inline(line),cover if on_cover else body));i+=1
    if isinstance(story[-1],PageBreak):story.pop()
    destination.parent.mkdir(parents=True,exist_ok=True)
    doc.multiBuild(story)
    print(destination)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fuente',type=Path,default=ROOT/'docs/Documentacion_Integral_IHC.md')
    parser.add_argument('--salida',type=Path,default=ROOT/'docs/Documentacion_Integral_IHC.pdf')
    args=parser.parse_args()
    build(args.fuente.resolve(),args.salida.resolve())


if __name__=='__main__':main()
