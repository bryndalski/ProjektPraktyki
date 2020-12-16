import xlwt

book = xlwt.Workbook(encoding="utf-8")

sheet1 = book.add_sheet("Raport zbiorczy")
sheet2 = book.add_sheet("Zestawienie wydatków")
sheet3 = book.add_sheet("Zestawienie przychodów")

sheet1.write(0, 0, "Tutaj jakiś bardzo ważny raport")
sheet2.write(1, 0, "Wydaliśmy dużo")
sheet3.write(0, 2, "Ale zapłacili nam więcej")
sheet3.write(1, 2, "I jeszcze więcej nam zapłacą")
sheet3.write(2, 2, "Będzie fajowo")

# zapisujemy do pliku
book.save('../temp/raport.xls')

