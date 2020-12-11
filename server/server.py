from flask import Flask, app ,request,json
from flask_cors import CORS
import xlrd
import os 
from werkzeug.utils import secure_filename

app=Flask(__name__)
CORS(app)

path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, 'temp')
app.config['./temp'] = UPLOAD_FOLDER




#--------------------------------temporary-------------------------------------------------------------
def fetchSheets(filePath):
    print(filePath)
    workingSheet = xlrd.open_workbook(filePath)              # extract file
    workingSheet = workingSheet.sheet_names()
    # dataList = workingSheet.row_values(0)  # extract column names
    dataRow ={}
    dataModel=[]
    for i in range(0,len(workingSheet)):
        dataRow={"value":workingSheet[i],'label':workingSheet[i]}
        dataModel.append(dataRow)
        pass
    print(type(dataModel))
    return (dataModel)

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
        singleRow.update({"id": row})
        dataToSend.append(singleRow)
    pass
    print (str(dataToSend))
    return dataToSend




#---------------------------------end of temporary-------------------------------------------------------


@app.route('/sheets')
def index():
    xd =fetchSheets('./temp/temp.xlsx')
    print(xd)
    return json.dumps(xd)


@app.route('/fetchColumn', methods=['POST'])
def fetchColumn():
    # print("temporary")
    data = request.json
    print(data['sheet'])
    beforeJson = rowToJSON('./temp/temp.xlsx',data['sheet'])
    return json.dumps(beforeJson)
    return request.json



@app.route('/fileImport', methods=['POST'])
def fileImport():
    try:
        file=request.files['file']
        file.save(os.path.join('./temp','temp.xlsx'))
        return ({'message':"Sucessfull upload","success":"true"})
    except:
        return({'message':"Something went wrong :(","success":"false"})


# @app.route('newLine',methods=['POST'])
# def newRecord():

#     return

if __name__ == "__main__":
    app.run(debug=True)