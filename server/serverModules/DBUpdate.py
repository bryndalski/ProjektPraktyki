from serverModules.DBConnect import con
from serverModules.excelReader import rowToJSON, fetchSheets
x={'History': '17.01.2020 FM przysłał info z DPMA - ale sprawdziłem link i nie znalazłem tam nic ponad to, co było dostępne już poprzednio w DPMA register\\n31.01.2020 Sprawdziłem DPMA register - nic się nie zmieniło. Napisałem do D jaki jest aktualny status. Napisałem do F z prośbą o ponowne sprawdzenie, czy mamy szansę uzyskać examiner`s report.\\n31.01.2020 F odpisał, że jeśli nie mogę znaleźć dokumentów to mogę skontaktować się z firmą Adler (http://www.adler-patent.de/html/file_inspection.html), która jest blisko urzędu i może sprawę załatwic osobiście. Zadzwoniłem tam, a życzliwy człowiek, pokierował mnie przez stronę DPMA i pokazał, że wszystkie dokumenty są już dostępne. Pobrałem je i wysłałem do D z pełna informacją. Dokumenty są po niemiecku i trzeba je przetłumaczyć (przynajmniej dokument 10 będący Office Action)\\n03.02.2020 przetłumaczyłem maszynowo doc 10. Wynika z niego jednoznacznie, że ekspert DPMA zarzucił brak nowości zastrzeżenia 1, ale wskazał, że przyłaczenie do niego niektórych zastrzeżeń zależnych mogłoby uratować nowość zgłoszenia. Te informacje podsumowałem i przesłałem do D.\\n', 'ID': 'Name1', 'id': 1, 'sheet': 'History (other)'}
def updatingByFile (file):
    cur = con.cursor()
    mySheets = fetchSheets(file)
    sheets = []
    errors = 0
    lines = 0

    for sheet in mySheets:
        sheets.append(sheet['label'])

    for sheet in sheets:
        data = rowToJSON(file,sheet)
        #print(data)
        for d in data:
            key = str(d.keys())[11:-2].replace("'",'"')
            val = str(d.values())[13:-2].replace("''","null")
            lines += 1
            try:
                #print('INSERT INTO "public"."'+ sheet +'" (' + key + ') VALUES (' + val + ')')
                cur.execute('INSERT INTO "public"."'+ sheet +'" (' + key + ') VALUES (' + val + ')')
                con.commit()
            except:
                cur.execute('ROLLBACK')
                errors += 1

        defInfo = {
            "lines":lines,
            "errors":errors
        }

    con.commit()

    return defInfo

def updatingOneLine (newRecord):
    cur = con.cursor()
    sheet = newRecord['sheet']
    del newRecord['sheet']

    key = str(newRecord.keys())[11:-2].replace("'", '"')
    val = str(newRecord.values())[13:-2].replace("''", "null")

    try:
        cur.execute('INSERT INTO "public"."' + sheet + '" (' + key + ') VALUES (' + val + ')')
        con.commit()
        return 1
    except:
        cur.execute('ROLLBACK')
        con.commit()
        return 0

def delete (removeInfo):
    cur = con.cursor()
    sheet = removeInfo['sheet']
    id = str(removeInfo['id'])

    #print('DELETE FROM "public"."' + sheet + '" WHERE "id"=' + id)
    cur.execute('DELETE FROM "public"."' + sheet + '" WHERE "id"=' + id)
    con.commit()

def edit (editedInfo):
    cur = con.cursor()
    sheet = removeInfo['sheet']
    id = str(removeInfo['id'])

    #cur.execute('DELETE FROM "public"."' + sheet + '" WHERE "id"=' + id)
    #con.commit()