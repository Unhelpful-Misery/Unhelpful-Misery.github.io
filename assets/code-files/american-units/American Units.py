from decimal import Decimal

displayAll = False

class unit:
    def __init__(self, singularSpelling, pluralLessSpelling, pluralGreaterSpelling, numeratorSpelling, denominatorSpelling, conversionFactor):
        self.singularSpelling = singularSpelling
        self.pluralLessSpelling = pluralLessSpelling
        self.pluralGreaterSpelling = pluralGreaterSpelling
        self.numeratorSpelling = numeratorSpelling
        self.denominatorSpelling = denominatorSpelling
        self.conversionFactor = conversionFactor
    def convertNumerator(self,number):
        return number / self.conversionFactor
    def convertDenominator(self,number):
        return number*self.conversionFactor
    def __str__(self):
        return self.singularSpelling
with open('Units - Sheet1.csv') as f:
  lines = f.readlines()
units = {}
typesOfUnits = {}
for line in lines:
  if (line.split(',')[0] != ''):
    [name, typeOfUnit, singularSpelling,pluralLessSpelling, pluralGreaterSpelling, numeratorSpelling, denominatorSpelling, conversionFactor] = line.split(',')
    units[name] = unit(singularSpelling, pluralLessSpelling, pluralGreaterSpelling, numeratorSpelling, denominatorSpelling, Decimal(conversionFactor))
    if typeOfUnit not in typesOfUnits:
        typesOfUnits[typeOfUnit] = []
    typesOfUnits[typeOfUnit].append(name)

#Consolidating Data
supportedUnits = [
["m","metre","metres","meter","meters"], 
["g","gram","grams","gramme","grammes"],
["s","second","seconds"],
["A","ampere","amperes"],
["k","kelvin"],
["cd","candela","candelas"],
["n","newton","newtons"],
["pa","pascal","pascals"],
["j","joule","joules"],
["w","watt","watts"],
["c","coulomb","coulombs"],
["v","volt","volts"],
["ohm","ohms"],
["f","farad","farads"],
["h","henry","henrys","henries"],
["t","tesla","teslas"], 
["db","decibel","decibels"], 
["dollar","dollars","usd"],
["liter","litre","litres","liters"],
["celsius"],
["min","minute","minutes"],
["hr","hrs","hour","hours"],
["day","days"],
["week","weeks"],
["month","months"],
["year","years"],
["lightyear","lightyears"],
["lightsecond","lightseconds"]]
baseUnits = [
["m","metre","metres","meter","meters"], 
["g","gram","grams","gramme","grammes"],
["s","second","seconds"],
["A","ampere","amperes"],
["k","kelvin"],
["cd","candela","candelas"],
["n","newton","newtons"],
["pa","pascal","pascals"],
["j","joule","joules"],
["w","watt","watts"],
["c","coulomb","coulombs"],
["v","volt","volts"],
["ohm","ohms"],
["f","farad","farads"],
["h","henry","henrys","henries"],
["t","tesla","teslas"], 
["db","decibel","decibels"], 
["dollar","dollars","usd"],["celsius"]]
convertedUnits = [
[9460730472580800,"m",["lightyear","lightyears"]],
[299792458,"m",["lightsecond","lightseconds"]],
[60,"s",["min","minute","minutes"]],
[3600,"s",["hr","hrs","hour","hours"]],
[86400,"s",["day","days"]],
[604800,"s",["week","weeks"]],
[2628000,"s",["month","months"]],
[31536000,"s",["year","years"]]]
SIPrefixes = [
[Decimal('1000000000000'),["T","tera","Tera"]],
[Decimal('1000000000'),["G","giga","Giga"]],
[Decimal('1000000'),["M","mega","Mega"]],
[Decimal('1000'),["k","kilo","Kilo"]],
[Decimal('100'),["h","hecto","Hecto"]],
[Decimal('10'),["da","deca","Deca"]],
[Decimal('0.1'),["d","deci","Deci"]],
[Decimal('0.01'),["c","centi","Centi"]],
[Decimal('0.001'),["m","milli","Milli"]],
[Decimal('0.000001'),["micro","Micro"]],
[Decimal('0.000000001'),["n","nano","Nano"]],
[Decimal('0.000000000001'),["p","pico","Pico"]]]
unitConversionList = [
    ["m", 'meter', 0],
    ["s", 'second', 0]
]
specialUnitConversionList = [
    [['m','m'],[],'meterSquared']
]

def preprocess_and_reformat_input(userInput):
    if (len(userInput.split(" "))<2):
        return ["ERROR: You must include at least 1 number, 1 space, and 1 unit\n",0,""]
    userInputNumber = userInput.split(" ", 1)[0]
    userInputUnits = userInput.split(" ", 1)[1]
    userInputNumber = userInputNumber.replace(",","")
    if (userInputNumber == ""):
        return ["ERROR: You must enter a number\n",0,""]
    for char in userInputNumber:
        if ((not char.isdigit()) and (char != ".") and (char != ",")):
            return ["ERROR: The first portion of your message must be a non-negative number, followed by a space\n",0,""]
        userInputNumber = Decimal(userInputNumber)
        if (userInputUnits == ""):
            return ["ERROR: You must have units\n",0,""]
        for char in userInputUnits:
            if (char == "(" or char==")"):
                userInputUnits = userInputUnits.replace("(","")
                userInputUnits = userInputUnits.replace(")","")
            if ((not char.isalnum()) and (char != "*") and (char != "/") and (char != "^") and (char != " ")):
                return ["ERROR: You attempted to enter the symbol " + char + ". Symbols other than / or * are not permitted as inputs\n",0,""]
    userInputUnits = userInputUnits.replace("/", " / ")
    userInputUnits = userInputUnits.replace(" per "," / ")
    userInputUnits = userInputUnits.replace(" Per "," / ")
    userInputUnits = userInputUnits.replace(" times "," ")
    userInputUnits = userInputUnits.replace(" Times "," ")
    userInputUnits = userInputUnits.replace("*", " ")
    words = userInputUnits.split()
    endReached = False
    i=0
    while(not endReached):
        if len(words[i]) > 2:
            if words[i][-2] == "^":
                if words[i][-1].isdigit():
                    n = int(words[i][-1])
                    words[i] = words[i][:-2]
                    for j in range(n-1): 
                        words.insert(i,words[i])
                else:
                    endReached = True
                    return ["ERROR: You must raise units to the power of a single-digit number\n",0,""]
        i += 1
        if (i==len(words)): 
            endReached = True
    if (words.count("/") > 1):
        return ["ERROR: You cannot have more than one / symbol in your input\n",0,"",""]
    return ["",userInputNumber, words]

def separate_identified_units_into_list_and_prefixList(list, prefixList):
    for k, word in enumerate(list):
        unitIsSupported = False
        for i in range(len(word)): 
            for unit in supportedUnits:
                for j in range(len(unit)):
                    if (unit[j] == word[i:].lower()) and (not unitIsSupported):
                        if (word[:i] != ""):
                            prefixList.append(word[:i])
                        list[k] = unit[0]
                        unitIsSupported = True
        if (not unitIsSupported):
            return word
    return ''

def convert_supported_units(number, list, operation):
    returnNum = number
    for i in range(len(list)):
        for unitInformationList in convertedUnits:
            for unitSpelling in unitInformationList[2]:
                if list[i] == unitSpelling:
                    if (operation=='multiply'):
                        returnNum *= unitInformationList[0]
                    elif(operation=='divide'):
                        returnNum /= unitInformationList[0]
                    list[i] = unitInformationList[1]
    return returnNum

def adjust_number_using_prefixes(number, prefixList, operation):
    returnValue = number
    for inputPrefix in prefixList:
        foundPrefix = False
        for prefixList in SIPrefixes:
            for prefix in prefixList[1]:
                if (prefix==inputPrefix):
                    foundPrefix = True
                    if (operation=='multiply'):
                        returnValue = returnValue * prefixList[0]
                    elif (operation=='divide'):
                        returnValue = returnValue / prefixList[0]
        if (not foundPrefix):
            return "ERROR: " + inputPrefix + " was not recognised as a valid prefix\n"
    return returnValue

def get_spelling_of_unit(number, unit, moreThanOneUnit, useDenominatorSpelling):
    if (useDenominatorSpelling):
        return "(" + unit.denominatorSpelling + ")"
    if (moreThanOneUnit):
        return "(" + unit.numeratorSpelling + ")"
    if number == 1:
        return unit.singularSpelling
    if number < 1:
        return " " + unit.pluralLessSpelling
    return " " + unit.pluralGreaterSpelling

def find_unit_types(list):
    returnList = []
    for i in range (len(list)):
        unit_identified = False
        for unitType in unitConversionList:
            if unitType[0]==list[i]:
                unit_identified = True
                returnList.append(unitType)
        if (not unit_identified):
            return["ERROR: American Unit could not be found for given input: " + list[i] + "\n", []]
    return ['',returnList]

def increment_indices_by_one(indices, unitTypeInformation):
    if (len(indices) > 0):
        i = len(indices)-1
        while (indices[i] >= len(typesOfUnits[unitTypeInformation[i][1]])-1) and (i>0):
            i -= 1
        indices[i] += 1
        unitTypeInformation[i][2] = indices[i] 
        for j in range(i+1,len(indices)):
            indices[j] = unitTypeInformation[j][2]

def get_top_value(list):
    for i in range(len(list)):
        if (1 <= list[i][0]) and (list[i][0] < 10000):
            return list.pop(i)
    return list.pop(0)

def format_return_value_as_string(list, denominatorStartPoint):
    returnString = "> "
    if len(list[1]) == 1:
        if (list[0] == 1):
            returnString += list[1][0] + "\n"
            return returnString
        else:
            returnString += f"{list[0]:.5g}" + list[1][0] + "\n"
            return returnString
    returnString += f"{list[0]:.5g}"
    if (denominatorStartPoint != 1):
        returnString += "("
    for i in range(len(list[1])):
        if (i == denominatorStartPoint):
            if (denominatorStartPoint != 1):
                returnString += ")"
            returnString += "/"
            if (len(list[1])-denominatorStartPoint)>1:
                returnString += "("
        returnString += list[1][i]
    if (len(list[1])-denominatorStartPoint)>1:
        returnString += ")"
    returnString += "\n"
    return returnString

def main_body_function(userInput, dispAll,numberToDisplay):
    numerator = []
    denominator = []
    numeratorPrefixes = []
    denominatorPrefixes = []
    words = []
    returnValues = []
    specialReturnValues = []
    userInputNumber = 0
    displayAll = dispAll
    
    [errorMessage,userInputNumber, words] = preprocess_and_reformat_input(userInput)
    if (errorMessage != ""):
        return errorMessage
    
    # Place the words accordingly into the numerator or denominator 
    if (words.count("/") == 0):
        numerator = words
    else:
        numerator = words[0:words.index("/")]
        denominator = words[words.index("/")+1:]

    unidentifiedUnit = separate_identified_units_into_list_and_prefixList(numerator,numeratorPrefixes)
    if (unidentifiedUnit != ''):
        return "ERROR: The inputted unit \"" + unidentifiedUnit + "\" is not supported by the program\n"
    unidentifiedUnit = separate_identified_units_into_list_and_prefixList(denominator,denominatorPrefixes)
    if (unidentifiedUnit != ''):
        return "ERROR: The inputted unit \"" + unidentifiedUnit + "\" is not supported by the program\n"
    
    userInputNumber = convert_supported_units(userInputNumber,numerator,'multiply')
    userInputNumber = convert_supported_units(userInputNumber,denominator,'divide')
    
    # If a unit is prefixed by something in the list of prefixes, divide or multiply the number by the corresponding quantity, if the unit is in the numerator or denominator. Similarly, make corresponding changes to minute, hour, day, week, month, and year to convert to seconds. Then, change the unit to its abbreviated SI form. 
    userInputNumber = adjust_number_using_prefixes(userInputNumber,numeratorPrefixes,'multiply')
    if isinstance(userInputNumber,str):
        return userInputNumber
    userInputNumber = adjust_number_using_prefixes(userInputNumber,denominatorPrefixes,'divide')
    if isinstance(userInputNumber,str):
        return userInputNumber

    #Calculate all necessary unit conversions
    numeratorIndices = [0]*len(numerator)
    denominatorIndices = [0]*len(denominator)
    returnValues = []
    [errorMessage, numeratorUnitTypeInformation] = find_unit_types(numerator)
    if errorMessage != '':
        return errorMessage
    [errorMessage, denominatorUnitTypeInformation] = find_unit_types(denominator)
    if errorMessage != '':
        return errorMessage
    moreThanOneUnit = True
    if (len(numerator)==1 and len(denominator)==0):
        moreThanOneUnit = False

    while(True):
        if numeratorIndices[0] >= len(typesOfUnits[numeratorUnitTypeInformation[0][1]]):
            break
        num = userInputNumber
        americanUnitsList = []
        for i in range(len(numerator)):
            americanUnit = units[typesOfUnits[numeratorUnitTypeInformation[i][1]][numeratorIndices[i]]]
            num = americanUnit.convertNumerator(num)
        for i in range(len(numerator)):
            americanUnit = units[typesOfUnits[numeratorUnitTypeInformation[i][1]][numeratorIndices[i]]]
            americanUnitsList.append(get_spelling_of_unit(num, americanUnit, moreThanOneUnit, False))
        for i in range(len(denominator)):
            americanUnit = units[typesOfUnits[denominatorUnitTypeInformation[i][1]][denominatorIndices[i]]]
            num = americanUnit.convertDenominator(num)
        for i in range(len(denominator)):
            americanUnit = units[typesOfUnits[denominatorUnitTypeInformation[i][1]][denominatorIndices[i]]]
            americanUnitsList.append(get_spelling_of_unit(num, americanUnit, moreThanOneUnit, True))
        returnValues.append([num,americanUnitsList])
        increment_indices_by_one(denominatorIndices, denominatorUnitTypeInformation)
        if (len(denominator) == 0):
            increment_indices_by_one(numeratorIndices, numeratorUnitTypeInformation)
        elif (denominatorIndices[0] >= len(typesOfUnits[denominatorUnitTypeInformation[0][1]])):
            increment_indices_by_one(numeratorIndices, numeratorUnitTypeInformation)
            denominatorIndices = [0]*len(denominator)
    returnValues.sort(key=lambda x: x[0])

    # Add any special cases (E.g. m^2 is area)
    for specialConversion in specialUnitConversionList:
        if ((specialConversion[0] == numerator) and (specialConversion[1] == denominator)):
            for americanUnitSpelling in typesOfUnits[specialConversion[2]]:
                americanUnit = units[americanUnitSpelling]
                convertedNumber = americanUnit.convertNumerator(userInputNumber)
                specialReturnValues.append([convertedNumber,[get_spelling_of_unit(convertedNumber,americanUnit,False,False)]])
    specialReturnValues.sort(key=lambda x: x[0])

    #Display your answer
    if (displayAll) or (len(specialReturnValues) + len(returnValues)<10):
        numberToDisplay = len(specialReturnValues) + len(returnValues)
    returnString = userInput + " is equivalent to:\n"
    numberDisplayed = 0
    while (numberDisplayed < numberToDisplay):
        if (specialReturnValues != []):
            returnString += format_return_value_as_string(get_top_value(specialReturnValues),1)
            numberDisplayed += 1
        else:
            returnString += format_return_value_as_string(get_top_value(returnValues),len(numerator))
            numberDisplayed += 1
    return returnString