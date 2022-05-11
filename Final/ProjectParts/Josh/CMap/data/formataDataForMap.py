import csv
import json
import os
def formatData():
    with open('project/data/disaster.csv', mode ='r',encoding='utf-8') as file, open('project/data/owid-co2-data.csv', mode ='r',encoding='utf-8') as file0:
    
    # reading the CSV file
        csvFile = csv.DictReader(file)
        
        # displaying the contents of the CSV file
        count = 0
        data = dict()
        for lines in csvFile:
            year = lines['iso3'] 
            type = lines['disastertype']
            if year not in data:
                data[year] = {}
            if 'total' not in data[year]:
                data[year]['total'] = 1
            else:
                data[year]['total'] += 1
            if type not in data[year]:
                data[year][type] = 1
            else:
                data[year][type] += 1
            data[year]['id'] = year
        # reading the CSV file
        csvFile = csv.DictReader(file0)
        
        # displaying the contents of the CSV file
        count = 0
        for lines in csvFile:
            count+=1
            print(count)
            code = lines['iso_code']
            try:
                year = int(lines['year'])
                co2 = float(lines['co2'])
            except Exception as e:
                # print(e)
                continue
            # print('code'+code)
            if code  == "" or year<1960:
                continue 
            if code not in data:
                data[code] = {}
            if 'co2' not in data[code]:
                data[code]['co2'] = co2
            else:
                data[code]['co2'] += co2
            data[code]['id'] = code
            
        result = json.dumps(data, indent = 3)
        print(result) 
        return result

def formatLineData():
    with open('project/data/disaster.csv', mode ='r',encoding='utf-8') as file, open('project/data/owid-co2-data.csv', mode ='r',encoding='utf-8') as file0:
    
    # reading the CSV file
        csvFile = csv.DictReader(file)
        
        # displaying the contents of the CSV file
        count = 0
        data = dict()
        for lines in csvFile:
            year = lines['iso3']
            country = int(lines['year'])
            if country not in data:
                data[country] = {}
            if year not in data[country]:
                data[country][year] = {}
            if 'total' not in data[country][year]:
                data[country][year]['total'] = 1
            else:
                data[country][year]['total'] += 1
            data[country]['id'] = country
        # reading the CSV file
        csvFile = csv.DictReader(file0)
        
        # displaying the contents of the CSV file
        count = 0
        for lines in csvFile:
            year = lines['iso_code']
            try:
                code = int(lines['year'])
            except:
                continue
            try:
                co2 = float(lines['co2'])
            except:
                continue
            # print('code'+code)
            if year  == "" or code<1960:
                continue 
            if code not in data:
                data[code] = {}
            if year not in data[code]:
                data[code][year] = {}
            if 'co2' not in data[code][year]:
                data[code][year]['co2'] = co2
            data[code]['id'] = code
            
        result = json.dumps(data, indent = 3)
        print(result) 
        return result

def analyzeData():
    with open('project/data/owid-co2-data.csv', mode ='r',encoding='utf-8') as file:
        csvFile = csv.DictReader(file)
        
        # displaying the contents of the CSV file
        count = 0
        data = dict()
        for lines in csvFile:
            if lines['year'] == '2020':      
                count+= float(lines['co2'],default=0)
          
        # print(count)
def exportData(data):
    with open('project/data/cmapdata.json', mode ='w') as file:
        file.write(data)
exportData(formatLineData())
#Tons of co2 since 1960
#Disasters since 1960
