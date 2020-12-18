from serverModules.DBConnect import con
from serverModules.excelReader import rowToJSON, fetchSheets
import os

x = ["newTABLE","Name character varying(30) NOT NULL","Comments text","Number DOUBLE PRECISION NOT NULL"]

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
            val = str(d.values())[13:-2].replace('Null','')
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
    os.remove(file)

    return defInfo

def updatingOneLine (newRecord):
    cur = con.cursor()
    sheet = newRecord['sheet']
    del newRecord['sheet']

    key = str(newRecord.keys())[11:-2].replace("'", '"')
    val = str(newRecord.values())[13:-2].replace('Null','')

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
    sheet = editedInfo['sheet']
    del editedInfo['sheet']
    id = str(editedInfo['id'])
    del editedInfo['id']
    edited = ''

    for edit in editedInfo:
        edited += '"' + edit + '" = ' + "'" + editedInfo[edit] + "', "
    edited = edited[0:-2]
    print(edited)

    #try:
    cur.execute('UPDATE "public"."'+ sheet +'" SET '+ edited +'WHERE "id"='+ id)
    con.commit()
        #return 1
    #except:
        #cur.execute('ROLLBACK')
        #con.commit()
        #return 0

def clearTable (table):
    cur = con.cursor()
    cur.execute('DELETE FROM "'+table+'"')
    con.commit()

def delTable (table):
    cur = con.cursor()
    cur.execute('DROP TABLE "'+table+'"')
    #print('DROP TABLE "public"."'+table+'"')
    con.commit()

def newTable (info):
    cur = con.cursor()
    tableName = info[0]
    del info[0]

    command = 'CREATE TABLE public."'+tableName+'" ('
    command += '"id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),'

    for column in info:
        command += column + ','

    command += 'PRIMARY KEY ("id")'
    command += ');'
    command += 'ALTER TABLE public."'+tableName+'" OWNER to hsfbsxtk;'

    print(command)
    #cur.execute(command)
    #con.commit()