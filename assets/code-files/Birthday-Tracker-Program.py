from datetime import datetime, date

BIRTHDAY_FILE = "List-of-Birthdays.txt"
current_date = datetime(datetime.now().year, datetime.now().month, datetime.now().day)


def make_all_years_equal_to_current_year(birthdays):
    with open(birthdays,"r") as file:
        lines: list[str] = file.read().split('\n')
    for i in range(len(lines)):
        if len(lines[i]) < 4:
            continue
        [name, year, month, day] = [int(x) if i != 0 else x for i, x in enumerate(lines[i].split(','))]
        lines[i] = name + "," + str(current_date.year) + "," + str(month) + "," + str(day)
        with open(birthdays, "w") as file: 
            file.write('\n'.join(lines))

def add_corresponding_years(birthdays):
    make_all_years_equal_to_current_year(birthdays)
    with open(birthdays,"r") as file:
        lines: list[str] = file.read().split('\n')
    for i in range (len(lines)):
        if len(lines[i]) < 4:
            continue
        [name, year, month, day] = [int(x) if i != 0 else x for i, x in enumerate(lines[i].split(','))]
        next_bday_date = datetime(year, month, day)
        if (next_bday_date < current_date):
            lines[i] = name + "," + str(year+1) + "," + str(month) + "," + str(day)
            with open(birthdays, "w") as file: 
                file.write('\n'.join(lines))

def sort_birthdays(birthdays):
    #Stable sort the days
    sorted_lines: list[str] = []
    with open(birthdays,"r") as file:
        lines: list[str] = file.read().split('\n')
 
    for i in range (1,32):
        for j in range(len(lines)):
            if len(lines[j]) < 4:
                continue
            [name, year, month, day] = [int(x) if i != 0 else x for i, x in enumerate(lines[j].split(','))]
            if day == i:
                sorted_lines.append(lines[j])
    lines = sorted_lines
    #Stable sort the months
    sorted_lines: list[str] = [] 
    for i in range (1,13):
        for j in range(len(lines)):
            if len(lines[j]) < 4:
                continue
            [name, year, month, day] = [int(x) if i != 0 else x for i, x in enumerate(lines[j].split(','))]
            if month == i:
                sorted_lines.append(lines[j])
    lines = sorted_lines
    #Stable sort the years
    sorted_lines: list[str] = [] 
    for i in range (current_date.year,current_date.year + 2):
        for j in range(len(lines)):
            if len(lines[j]) < 4:
                continue
            [name, year, month, day] = [int(x) if i != 0 else x for i, x in enumerate(lines[j].split(','))]
            if year == i:
                sorted_lines.append(lines[j])
    with open(birthdays, "w") as file: 
        file.write('\n'.join(sorted_lines))

def print_birthdays(birthdays):
    add_corresponding_years(birthdays)
    sort_birthdays(birthdays)
    print()
    with open(birthdays,"r") as file:
        lines: list[str] = file.read().split('\n')
    for i in range (len(lines)):
        if lines[len(lines)-1-i] == "":
            print()
        else:
            [name, year, month, day] = [int(x) if i != 0 else x for i, x in enumerate(lines[len(lines)-1-i].split(','))]
            next_bday_date = datetime(year, month, day)
            time_until_bday = next_bday_date - current_date
            print(f'{name}, Birthday on: {next_bday_date.year}-{next_bday_date.month}-{next_bday_date.day}. Time Until Birthday: {time_until_bday.days} days')
    print()

print_birthdays(BIRTHDAY_FILE)
