var m, d;
m = prompt("Month 1-12")
d = prompt("Start Day 1-7")
hello

function createCalendar(elem, month, dayOfWeek) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const round = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    let data = []

    let stringMonth = ''
    if (month == 1)
        stringMonth = 'JANUARY'
    else if (month == 2)
        stringMonth = 'FEBRUARY'
    else if (month == 3)
        stringMonth = 'MARCH'
    else if (month == 4)
        stringMonth = 'APRIL'
    else if (month == 5)
        stringMonth = 'MAY'
    else if (month == 6)
        stringMonth = 'JUNE'
    else if (month == 7)
        stringMonth = 'JULY'
    else if (month == 8)
        stringMonth = 'AUGUST'
    else if (month == 9)
        stringMonth = 'SEPTEMBER'
    else if (month == 10)
        stringMonth = 'OCTOBER'
    else if (month == 11)
        stringMonth = 'NOVEMBER'
    else if (month == 12)
        stringMonth = 'DECEMBER'
    else {
        stringMonth = "Invalid Input"
    }

    let table = `<table><tr><td colspan = "7" align = "center" id="month">${stringMonth}</tr></td><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>`
    let counter = 1
    let calendarDays = 1
    let weekendCounter = 0

    if (month > 12 || dayOfWeek > 7) {
        elem.innerHTML = ("<h2>Invalid Input</h2>")
    }
    else {

        for (let i = 0; i < days[month - 1]; i++) {
            data[i] = round[(dayOfWeek + i) % 7]
        }

        if (days[month-1] != 28) {
            if (days[month-1] == 30) {
                if(dayOfWeek > 6){
                    for (let i = 0; i < 42; i++) {
                        if (weekendCounter == 0) {
                            table += '<tr>'
                        }
        
                        if (counter <= dayOfWeek - 1) {
                            table += "<td></td>"
                            counter++
                        }
        
                        else if (calendarDays > days[month - 1])
                            table += "<td></td>"
        
                        else {
                            if (calendarDays <= days[month - 1]) {
                                table += `<td>${calendarDays}</td>`
                                calendarDays++
                            }
                            else
                                table += "<td></td>"
                        }
        
                        if (weekendCounter == 6) {
                            table += '</tr>'
                            weekendCounter = 0
                        }
                        else {
                            weekendCounter++
                        }
                    }
                }
                else{
                    for (let i = 0; i < 35; i++) {
                        if (weekendCounter == 0) {
                            table += '<tr>'
                        }
        
                        if (counter <= dayOfWeek - 1) {
                            table += "<td></td>"
                            counter++
                        }
        
                        else if (calendarDays > days[month - 1])
                            table += "<td></td>"
        
                        else {
                            if (calendarDays <= days[month - 1]) {
                                table += `<td>${calendarDays}</td>`
                                calendarDays++
                            }
                            else
                                table += "<td></td>"
                        }
        
                        if (weekendCounter == 6) {
                            table += '</tr>'
                            weekendCounter = 0
                        }
                        else {
                            weekendCounter++
                        }
                    }

                }
               
            }
            else if (days[month-1] == 31){
                if(dayOfWeek > 5){
                    for (let i = 0; i < 42; i++) {
                        if (weekendCounter == 0) {
                            table += '<tr>'
                        }
        
                        if (counter <= dayOfWeek - 1) {
                            table += "<td></td>"
                            counter++
                        }
        
                        else if (calendarDays > days[month - 1])
                            table += "<td></td>"
        
                        else {
                            if (calendarDays <= days[month - 1]) {
                                table += `<td>${calendarDays}</td>`
                                calendarDays++
                            }
                            else
                                table += "<td></td>"
                        }
        
                        if (weekendCounter == 6) {
                            table += '</tr>'
                            weekendCounter = 0
                        }
                        else {
                            weekendCounter++
                        }
                    }
                }
                else{
                    for (let i = 0; i < 35; i++) {
                        if (weekendCounter == 0) {
                            table += '<tr>'
                        }
        
                        if (counter <= dayOfWeek - 1) {
                            table += "<td></td>"
                            counter++
                        }
        
                        else if (calendarDays > days[month - 1])
                            table += "<td></td>"
        
                        else {
                            if (calendarDays <= days[month - 1]) {
                                table += `<td>${calendarDays}</td>`
                                calendarDays++
                            }
                            else
                                table += "<td></td>"
                        }
        
                        if (weekendCounter == 6) {
                            table += '</tr>'
                            weekendCounter = 0
                        }
                        else {
                            weekendCounter++
                        }
                    }

                }
            }
        }
        else{
            if(dayOfWeek >= 2){
                for (let i = 0; i < 35; i++) {
                    if (weekendCounter == 0) {
                        table += '<tr>'
                    }
    
                    if (counter <= dayOfWeek - 1) {
                        table += "<td></td>"
                        counter++
                    }
    
                    else if (calendarDays > days[month - 1])
                        table += "<td></td>"
    
                    else {
                        if (calendarDays <= days[month - 1]) {
                            table += `<td>${calendarDays}</td>`
                            calendarDays++
                        }
                        else
                            table += "<td></td>"
                    }
    
                    if (weekendCounter == 6) {
                        table += '</tr>'
                        weekendCounter = 0
                    }
                    else {
                        weekendCounter++
                    }
                }
            }
            else{
                for (let i = 0; i < 28; i++) {
                    if (weekendCounter == 0) {
                        table += '<tr>'
                    }
    
                    if (counter <= dayOfWeek - 1) {
                        table += "<td></td>"
                        counter++
                    }
    
                    else if (calendarDays > days[month - 1])
                        table += "<td></td>"
    
                    else {
                        if (calendarDays <= days[month - 1]) {
                            table += `<td>${calendarDays}</td>`
                            calendarDays++
                        }
                        else
                            table += "<td></td>"
                    }
    
                    if (weekendCounter == 6) {
                        table += '</tr>'
                        weekendCounter = 0
                    }
                    else {
                        weekendCounter++
                    }
                }

            }
        }

        table += '</table>'

        elem.innerHTML = table;
        return data

    }
}

createCalendar(main, m, d)