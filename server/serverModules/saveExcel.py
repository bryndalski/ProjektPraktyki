import xlwt
import random
from serverModules.DBShow import dataToShow

def exportExcel (tableName):
    raport = xlwt.Workbook(encoding="utf-8")
    sheet = raport.add_sheet(tableName)
    raportColor = random.choice(["green","red","blue","purple","pink","aqua","black"])
    header = xlwt.easyxf(
        'font: bold 1, name Calibri, height 160, color white;'
        'align: vertical top, horizontal left, wrap on;'
        'borders: top_color white, bottom_color white, right_color white, left_color white, left thin, right thin, top thin, bottom thin;'
        'pattern: pattern solid, pattern_fore_colour '+raportColor+', pattern_back_colour '+raportColor+''
    )
    normie = xlwt.easyxf(
        'font: bold off, name Calibri, height 160;'
        'align: vertical top, horizontal left, wrap on;'
        'borders: top_color '+raportColor+', bottom_color '+raportColor+', right_color '+raportColor+', left_color '+raportColor+', left thin, right thin, top thin, bottom thin;'
    )
    allData = dataToShow(tableName)
    documentRows = 1

    documentColumns = 0
    for headline in allData[0]:
        if not headline == 'id':
            sheet.write(0,documentColumns,headline,header)
            documentColumns += 1

    for object in allData:
        documentColumns = 0
        for data in object:
            if not data == 'id':
                sheet.write(documentRows,documentColumns,object[data],normie)

                documentColumns += 1
        documentRows += 1

    raport.save('../temp/raport-'+tableName+'.xls')