from flask import Flask
from flask import app
from serverModules.excelReader import rowToJSON   #importing function converting xlms data to list 

rowToJSON('./temp/temp.xlsx', 'TG')

def createApp(config_object='projekt.settings'):
    app= Flask(__name__)
    app.config.from_object(config_object)
    return app
