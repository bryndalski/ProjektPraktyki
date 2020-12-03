import xlrd
wb = xlrd.open_workbook('./temp/temp.xlsx')
sheet = wb.sheet_by_index(0)
# print(sheet.row_values(1))
#
# @desc
#


def fetchModel(filePath, sheetName):
    workingSheet = xlrd.open_workbook(filePath)              # extract file
    workingSheet = workingSheet.sheet_by_name(sheetName)
    dataList = workingSheet.row_values(0)  # extract column names
    dataModel = dict.fromkeys(dataList, '')
    return dataModel


def rowToJSON(filePath, sheetName):
    dataModel = fetchModel(filePath, sheetName)
    dataToSend = []
    workingSheet = xlrd.open_workbook(filePath)  # extract file
    sheetDatamode = workingSheet.datemode
    workingSheet = workingSheet.sheet_by_name(sheetName)
    for row in range(1, workingSheet.nrows):  # workingSheet.nrows
        workingRow = []
        for cell in range(0, workingSheet.ncols):
            if workingSheet.cell(row, cell).ctype == 3:
                y, m, d, mn, sec, hr = xlrd.xldate_as_tuple(
                    workingSheet.cell(row, cell).value, sheetDatamode)
                workingRow.append("{2}.{1}.{0}".format(y, m, d))
                pass
            else:
                workingCell = workingSheet.cell(row, cell)
                workingRow.append(str(workingCell.value))
                pass

            pass
        singleRow = dict(zip(dataModel, workingRow))
        singleRow.update({"sheetGrop": sheetName})

        dataToSend.append(singleRow)
    pass
    # print(str(dataToSend))
    return
