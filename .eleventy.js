module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/");
    eleventyConfig.addPassthroughCopy("css/");
    eleventyConfig.addWatchTarget("css/");
    eleventyConfig.addPassthroughCopy("js/");
    eleventyConfig.addWatchTarget("js/");
    eleventyConfig.addPassthroughCopy("assets/code-files/american-units/Units - Sheet1.csv"); 
    eleventyConfig.addWatchTarget("assets/code-files/american-units/Units - Sheet1.csv");

    eleventyConfig.addShortcode("downloadables", function(names,files) {
        if(!Array.isArray(names)) { return ''; }
        if(!Array.isArray(files)) { return ''; }
        let content_blocks = "";
        content_blocks += `<div class="centered_content"> \n`;
        for (let i = 0; i < names.length; i++) {
            content_blocks += `<a href="${files[i]}" download="${names[i]}"><button class="button button1">Download ${names[i]}</button></a> \n`;
        }
        content_blocks += `</div> \n`;
        return content_blocks;
    });

    eleventyConfig.addShortcode("multiple_centered_images", function(images, captions, alt_text = [""], widths = ["100%"], heights = ["100%"]) {
        if(!Array.isArray(images)) { return ''; }
        if(!Array.isArray(captions)) { return ''; }
        if(alt_text.length != images.length) { widths = new Array(images.length).fill(""); }
        if(widths.length != images.length) { widths = new Array(images.length).fill("100%"); }
        if(heights.length != images.length) { heights = new Array(images.length).fill("100%"); }
        let content_block = `<div class="centered_content"> <div class="multiple-images">`;
        for (let i = 0; i < images.length; i++) {
            content_block += `<figure> <img style="width:${widths[i]}; height:${heights[i]}" src="${images[i]}" alt="${alt_text[i]}"/> \n`;
            content_block += `<figcaption>${captions[i]}</figcaption> </figure> \n`;
        }
        content_block+= `</div> </div>`;
        return content_block;
    });

    eleventyConfig.addShortcode("centered_table", function(rows, cols) {
        if(!Array.isArray(rows)) { return ''; }
        let content_block = `<div class="centered_content"> <table>`;
        for (let i = 0; i < rows.length; i++) {
            content_block += `<tr> \n`;
            for (let j = 0; j < rows[0].length; j++) {
                content_block += `<td>${rows[i][j]}</td>`;
            }
            content_block += `</tr>`;
        }
        content_block += `</table> </div>`;
        return content_block;
    });

    eleventyConfig.addShortcode("YouTube_carousel", function(uniqueCarouselID, vidIDs, titles = [""], captions = [""], button_space="20vw") {
        if(titles.length != vidIDs.length) { titles = new Array(vidIDs.length).fill(""); }
        if(captions.length != vidIDs.length) { captions = new Array(vidIDs.length).fill(""); }
        if(!Array.isArray(vidIDs)) { return ''; }
        if(vidIDs.length === 0) { return ''; }
        //Add top content
        let content_block = `<style>.carousel_indicator.${"current-slide"+uniqueCarouselID} { background: rgb(236, 239, 235);} </style>`
        content_block += `<div class="carousel_surround_component">
        <button class="carousel_slide_left_button" id="${"carousel_slide_left_button"+uniqueCarouselID}" disabled style="left:${button_space};">⮜</button>
        <div class="carousel">
            <div class="carousel_track-container">
                <ul class="carousel_track" id="${"carousel_track"+uniqueCarouselID}">`;
        //Add first carousel element
        content_block += `<li class="carousel_slide ${"current-slide"+uniqueCarouselID}">
                        <p class="figureCaption">${titles[0]}</p>
                        <iframe
                        src="https://www.youtube.com/embed/${vidIDs[0]}">
                        </iframe>                    
                        <p class="figure_small_caption">${captions[0]}</p>
                    </li>`;
        for (let i = 1; i < vidIDs.length; i++) {
            content_block += `<li class="carousel_slide">
                        <p class="figureCaption">${titles[i]}</p>
                        <iframe 
                        src="https://www.youtube.com/embed/${vidIDs[i]}">
                        </iframe>
                        <p class="figure_small_caption">${captions[i]}</p>
                    </li>`;
        }
        content_block += `</ul></div><div class="carousel_nav" id="${"carousel_nav"+uniqueCarouselID}"> <button class="carousel_indicator ${"current-slide"+uniqueCarouselID}"></button>`;
        for (let i = 1; i < vidIDs.length; i++) {
            content_block += `<button class="carousel_indicator"></button>`;
        }
        content_block += `</div></div><button class="carousel_slide_right_button" id="${"carousel_slide_right_button"+uniqueCarouselID}" style="right:${button_space};"">⮞</button></div>`;
        content_block += `<script>
        /*Thank you to https://www.youtube.com/watch?v=gBzsE0oieio for providing a wonderful tutorial on how this code works! 
        I used to have this horrendous Frankenstein monster of a JS script based on a very bad understanding of JS, and this is much cleaner. 
        I only modified the code a little bit from what was shown in the tutorial*/
        const ${"track"+uniqueCarouselID} = ${"carousel_track"+uniqueCarouselID};
        const ${"slides"+uniqueCarouselID} = Array.from(${"track"+uniqueCarouselID}.children);
        const ${"nextButton"+uniqueCarouselID} = ${"carousel_slide_right_button"+uniqueCarouselID};
        const ${"prevButton"+uniqueCarouselID} = ${"carousel_slide_left_button"+uniqueCarouselID};
        const ${"dotsNav"+uniqueCarouselID} = ${"carousel_nav"+uniqueCarouselID};
        const ${"dots"+uniqueCarouselID} = Array.from(${"dotsNav"+uniqueCarouselID}.children);
        const ${"slideWidth"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}[0].getBoundingClientRect().width;
        

        //arrange the slides next to one another
        const ${"setSlidePosition"+uniqueCarouselID} = (slide, index) => {
            slide.style.left = ${"slideWidth"+uniqueCarouselID} * index + 'px';
        }
        ${"slides"+uniqueCarouselID}.forEach(${"setSlidePosition"+uniqueCarouselID});

        const ${"moveToSlide"+uniqueCarouselID} = (${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"targetSlide"+uniqueCarouselID}) => {
            ${"track"+uniqueCarouselID}.style.transform = 'translateX(-' + ${"targetSlide"+uniqueCarouselID}.style.left + ')';
            ${"currentSlide"+uniqueCarouselID}.classList.remove('${"current-slide"+uniqueCarouselID}');
            ${"targetSlide"+uniqueCarouselID}.classList.add('${"current-slide"+uniqueCarouselID}');
        }

        const ${"updateDots"+uniqueCarouselID} = (${"currentDot"+uniqueCarouselID}, ${"targetDot"+uniqueCarouselID}) => { 
            ${"currentDot"+uniqueCarouselID}.classList.remove('${"current-slide"+uniqueCarouselID}');
            ${"targetDot"+uniqueCarouselID}.classList.add('${"current-slide"+uniqueCarouselID}');
        }

        const ${"disableAppropriateArrows"+uniqueCarouselID} = (${"targetIndex"+uniqueCarouselID}) => {
            if (${"targetIndex"+uniqueCarouselID} === 0) {
                ${"prevButton"+uniqueCarouselID}.disabled = true;
                ${"nextButton"+uniqueCarouselID}.disabled = false;
            }
            else if (${"targetIndex"+uniqueCarouselID} === ${"slides"+uniqueCarouselID}.length-1) {
                ${"nextButton"+uniqueCarouselID}.disabled = true;
                ${"prevButton"+uniqueCarouselID}.disabled = false;
            }
            else {
                ${"nextButton"+uniqueCarouselID}.disabled = false;
                ${"prevButton"+uniqueCarouselID}.disabled = false;
            }
        }

        //when I click left, move slides to the left
        ${"prevButton"+uniqueCarouselID}.addEventListener('click', e=> {
            const ${"currentSlide"+uniqueCarouselID} = ${"track"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"prevSlide"+uniqueCarouselID} = ${"currentSlide"+uniqueCarouselID}.previousElementSibling;
            const ${"currentDot"+uniqueCarouselID} = ${"dotsNav"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"prevDot"+uniqueCarouselID} = ${"currentDot"+uniqueCarouselID}.previousElementSibling;
            const ${"prevIndex"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}.findIndex(slide => slide === ${"prevSlide"+uniqueCarouselID});

            ${"moveToSlide"+uniqueCarouselID}(${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"prevSlide"+uniqueCarouselID});
            ${"updateDots"+uniqueCarouselID}(${"currentDot"+uniqueCarouselID}, ${"prevDot"+uniqueCarouselID});
            ${"disableAppropriateArrows"+uniqueCarouselID}(${"prevIndex"+uniqueCarouselID});
        })

        //when I click right, move slides to the right
        ${"nextButton"+uniqueCarouselID}.addEventListener('click', e=> {
            const ${"currentSlide"+uniqueCarouselID} = ${"track"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"nextSlide"+uniqueCarouselID} = ${"currentSlide"+uniqueCarouselID}.nextElementSibling;
            const ${"currentDot"+uniqueCarouselID} = ${"dotsNav"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"nextDot"+uniqueCarouselID} = ${"currentDot"+uniqueCarouselID}.nextElementSibling;
            const ${"nextIndex"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}.findIndex(slide => slide === ${"nextSlide"+uniqueCarouselID});

            ${"moveToSlide"+uniqueCarouselID}(${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"nextSlide"+uniqueCarouselID});
            ${"updateDots"+uniqueCarouselID}(${"currentDot"+uniqueCarouselID}, ${"nextDot"+uniqueCarouselID});
            ${"disableAppropriateArrows"+uniqueCarouselID}(${"nextIndex"+uniqueCarouselID});
        })

        //when I click the nav indicators, move to that slide
        ${"dotsNav"+uniqueCarouselID}.addEventListener('click', e=> {
            //what indicator was clicked on?
            const ${"targetDot"+uniqueCarouselID} = e.target.closest('button');
            
            if (!${"targetDot"+uniqueCarouselID}) return;

            const ${"currentSlide"+uniqueCarouselID} = ${"track"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"currentDot"+uniqueCarouselID} = ${"dotsNav"+uniqueCarouselID}.querySelector('.${"current-slide"+uniqueCarouselID}');
            const ${"targetIndex"+uniqueCarouselID} = ${"dots"+uniqueCarouselID}.findIndex(dot => dot === ${"targetDot"+uniqueCarouselID});
            const ${"targetSlide"+uniqueCarouselID} = ${"slides"+uniqueCarouselID}[${"targetIndex"+uniqueCarouselID}];

            ${"moveToSlide"+uniqueCarouselID}(${"track"+uniqueCarouselID}, ${"currentSlide"+uniqueCarouselID}, ${"targetSlide"+uniqueCarouselID});
            ${"updateDots"+uniqueCarouselID}(${"currentDot"+uniqueCarouselID}, ${"targetDot"+uniqueCarouselID});
            ${"disableAppropriateArrows"+uniqueCarouselID}(${"targetIndex"+uniqueCarouselID});
        })
    </script>`
        return content_block;
    });

    eleventyConfig.addShortcode("YouTube_carousel_lessCSS", function(vidIDs, titles=[""],captions=[""]) {
        if(titles.length != vidIDs.length) { titles = new Array(vidIDs.length).fill(""); }
        if(captions.length != vidIDs.length) { captions = new Array(vidIDs.length).fill(""); }
        if(!Array.isArray(vidIDs)) { return ''; }
        if(vidIDs.length === 0) { return ''; }
        let content_block = "";
        for (let i = 0; i < vidIDs.length; i++) {
            content_block += `<div class=""centered_content>
                <p class="figureCaption" id="${titles[i]}">${titles[i]}</p></br>
            </div>
            <div class="centered_content">
                <iframe style="width: 50vw; height: 29vw"
                src="https://www.youtube.com/embed/${vidIDs[i]}">
                </iframe>
            </div>
            <div class=""centered_content>
                <p class="figure_small_caption">${captions[i]}</p></br>
            </div>`;
        }
        return content_block;
    });

    eleventyConfig.addShortcode("footnote", function(text, top_padding = "0px") {
        return `<div class="footnote_wrapper" style="padding-top: ${top_padding}">
        <p class="footnote">${text}</p>
        </div>`
    });

    eleventyConfig.addShortcode("lessCSSBackButton", function(link, text="Go Back") {
        return `<hr>
        <p><a href="${link}" style="color:rgb(33, 86, 165)">← ${text}</p></a>
        <hr>`
    });
    eleventyConfig.addShortcode("americanUnitsCode",function() {
        return `<script type="text/plain" id="python-source">
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
["l","liter","litre","litres","liters"],
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
["l","liter","litre","litres","liters"],
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
    ["s", 'second', 0],
    ["g", 'gram', 0],
    ["l", 'liter', 0],
    ["n", 'newton', 0]
]
specialUnitConversionList = [
    [['m','m'],[],'meterSquared'],
    [['m','m','m'],[],'meterCubed']
]

def preprocess_and_reformat_input(userInput):
    if (len(userInput.split(" "))<2):
        return ["ERROR: You must include at least 1 number, 1 space, and 1 unit\\n",0,""]
    userInputNumber = userInput.split(" ", 1)[0]
    userInputUnits = userInput.split(" ", 1)[1]
    userInputNumber = userInputNumber.replace(",","")
    if (userInputNumber == ""):
        return ["ERROR: You must enter a number\\n",0,""]
    for char in userInputNumber:
        if ((not char.isdigit()) and (char != ".") and (char != ",")):
            return ["ERROR: The first portion of your message must be a non-negative number, followed by a space\\\n",0,""]
        userInputNumber = Decimal(userInputNumber)
        if (userInputUnits == ""):
            return ["ERROR: You must have units\\n",0,""]
        for char in userInputUnits:
            if (char == "(" or char==")"):
                userInputUnits = userInputUnits.replace("(","")
                userInputUnits = userInputUnits.replace(")","")
            if ((not char.isalnum()) and (char != "*") and (char != "/") and (char != "^") and (char != " ")):
                return ["ERROR: You attempted to enter the symbol " + char + ". Symbols other than / or * are not permitted as inputs\\\n",0,""]
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
                    return ["ERROR: You must raise units to the power of a single-digit number\\n",0,""]
        i += 1
        if (i==len(words)): 
            endReached = True
    if (words.count("/") > 1):
        return ["ERROR: You cannot have more than one / symbol in your input\\n",0,"",""]
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
            return "ERROR: The inputted unit " + str(word) + " is not supported by the program\\n"
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
            return "ERROR: " + inputPrefix + " was not recognised as a valid prefix\\n"
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
            return["ERROR: American Unit could not be found for given input: " + list[i] + "\\n", []]
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
            returnString += list[1][0] + "\\n"
            return returnString
        else:
            returnString += f"{list[0]:.5g}" + list[1][0] + "\\n"
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
    returnString += "\\n"
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
        return unidentifiedUnit
    unidentifiedUnit = separate_identified_units_into_list_and_prefixList(denominator,denominatorPrefixes)
    if (unidentifiedUnit != ''):
        return unidentifiedUnit
    
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
    if (displayAll) or (len(specialReturnValues) + len(returnValues)<numberToDisplay):
        numberToDisplay = len(specialReturnValues) + len(returnValues)
    returnString = userInput + " is equivalent to:\\n"
    numberDisplayed = 0
    while (numberDisplayed < numberToDisplay):
        if (specialReturnValues != []):
            returnString += format_return_value_as_string(get_top_value(specialReturnValues),1)
            numberDisplayed += 1
        else:
            returnString += format_return_value_as_string(get_top_value(returnValues),len(numerator))
            numberDisplayed += 1
    return returnString

result = main_body_function(userInput,userWantsDisplayAll,userInputtedNumberToDisplay)
    </script>
    <script type="text/javascript">
        let pyodideReady = false;
        let pyodide;

        async function initPyodide() {
            pyodide = await loadPyodide();
            pyodideReady = true;
        }
        initPyodide();

        async function runPythonSearch(num, displayAll) {
            if (!pyodideReady) {
                document.getElementById("results").innerText = "The code is still loading. Please wait";
                return;
            }
            
            const response = await fetch('/assets/code-files/american-units/Units - Sheet1.csv');
            const csv_contents = await response.text();
            pyodide.FS.writeFile("/home/pyodide/Units - Sheet1.csv", csv_contents, { encoding: "utf8" });

            const query = document.getElementById("searchbar").value;

            pyodide.globals.set("userInput", query);
            pyodide.globals.set("userInputtedNumberToDisplay", num);
            pyodide.globals.set("userWantsDisplayAll", displayAll);

            const pythonCode = document.getElementById("python-source").textContent;

            try {
                await pyodide.runPythonAsync(pythonCode);
                const pythonResult = pyodide.globals.get("result");
                document.getElementById("results").innerText = pythonResult;
            } catch (err) {
                document.getElementById("results").innerText = "Python Error: " + err;
            }
        }
    </script>`
    })
    return {
        dir: {
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ["md","njk","html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
}
