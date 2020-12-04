from flask import Flask, app ,request,json
from flask_cors import CORS
import xlrd
app=Flask(__name__)
CORS(app)

#temporary
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




@app.route('/sheets')
def index():
    xd =fetchSheets('./temp/temp.xlsx')
    print(xd)
    return json.dumps(xd)


if __name__ == "__main__":
    app.run(debug=True)