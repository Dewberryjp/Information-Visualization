import csv
import json
with open('disaster.csv', mode ='r')as file:
   
  # reading the CSV file
    csvFile = csv.DictReader(file)
    
    # displaying the contents of the CSV file
    count = 0
    data = dict()
    for lines in csvFile:
        year = lines['year'] 
        type = lines['disastertype']
        if year not in data:
            data[year] = {}
        if type not in data[year]:
            data[year][type] = 1
        else:
            data[year][type] += 1

    result = json.dumps(data, indent = 3)
    print(result) 
            