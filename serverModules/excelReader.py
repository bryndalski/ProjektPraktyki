import xlrd
import json
import array as array
wb = xlrd.open_workbook('./temp/temp.xlsx')
sheet = wb.sheet_by_index(0)
# print(sheet.row_values(1))
#
# @desc
#


def fetchModel(filePath, sheetIndex):
    workingSheet = xlrd.open_workbook(filePath)              # extract file
    workingSheet = workingSheet.sheet_by_index(sheetIndex)
    dataArray = workingSheet.row_values(0)  # extract column names
    dataModel = dict.fromkeys(dataArray, '')
    # print(dataModel)
    # print(type(dataModel))
    return dataModel


def rowToJSON(filePath, sheetIndex, dataModel):
    dataToSend = []
    workingSheet = xlrd.open_workbook(filePath)  # extract file
    sheetDatamode = workingSheet.datemode
    workingSheet = workingSheet.sheet_by_index(sheetIndex)
    for row in range(2, workingSheet.nrows):  
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
        dataToSend.append(singleRow)
    pass
    print(str(dataToSend))
    return


# 3)
rowToJSON('./temp/temp.xlsx', 0, fetchModel('./temp/temp.xlsx', 0))
