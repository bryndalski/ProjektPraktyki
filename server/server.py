from flask import Flask, app ,request
from flask_cors import CORS
import xlrd
app=Flask(__name__)
CORS(app)

#function
def fetchSheets(filePath):
    print(filePath)
    workingSheet = xlrd.open_workbook(filePath)              # extract file
    workingSheet = workingSheet.sheet_names()
    # dataList = workingSheet.row_values(0)  # extract column names
    dataRow ={}
    dataModel=[]
    for i in range(0,len(workingSheet)):
        dataRow={'value':workingSheet[i],'label':workingSheet[i]}
        dataModel.append(dataRow)
        pass
    print(dataModel)
    return str(dataModel)




@app.route('/sheets')
def index():
    xd =fetchSheets('./temp/temp.xlsx')
    return xd 


if __name__ == "__main__":
    app.run(debug=True)