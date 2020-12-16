from flask import Flask, app ,request,json
from flask_cors import CORS
from serverModules.DBShow import dataToShow
from serverModules.DBTables import tablesToShow
from serverModules.DBUpdate import *
import os
from werkzeug.utils import secure_filename

app=Flask(__name__)
CORS(app)

path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, 'temp')
app.config['./temp'] = UPLOAD_FOLDER


@app.route('/sheets')
def index():
    xd = tablesToShow()
    #print(xd)
    return json.dumps(xd)


@app.route('/fetchColumn', methods=['POST'])
def fetchColumn():
    # print("temporary")
    data = request.json
    #print(data['sheet'])
    beforeJson = dataToShow(data['sheet'])
    #print(json.dumps(beforeJson))
    return json.dumps(beforeJson,sort_keys=False)
    return request.json


@app.route('/fileImport', methods=['POST'])
def fileImport():
    try:
        file=request.files['file']
        file.save(os.path.join('./temp','temp.xlsx'))
        updatingByFile('temp/temp.xlsx')
        return ({'message':"Sucessfull upload","success":"true"})
    except:
        return({'message':"Something went wrong :(","success":"false"})


@app.route('/newLine', methods=['POST'])  # adding row
def newRecord():
    add = request.json
    ifSuccess = updatingOneLine(add)
    if ifSuccess == 1:
        return ({"message": "succeded", "success": True})
    else:
        return ({'message': "Something went wrong :(", "success": False})


@app.route('/editRow', methods=['POST'])  # edtowanie
def editRecord():
    try:
        print(request.json)
        return ({"success": True})
    except:
        return ({"success": False})


@app.route('/deleteRow', methods=['POST'])  # edtowanie
def deleteRow():
    try:
        rem = request.json
        delete(rem)
        return ({"success": True})
    except:
        return ({"success": False})

if __name__ == "__main__":
    app.run(debug=True)