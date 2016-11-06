function DaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function MonthNames(monthNumber) {
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[monthNumber - 1];
}

function BuildCalendar(_month, _year) {
    var nowDate = new Date();
    var month;
    var year;
    var daysOfMonth;
    var boxCalendar = $("#CalendarBoard");
    
    if (_month == null && _year == null) {
        month = nowDate.getMonth() + 1;
        year = nowDate.getFullYear();
    }
    else {
        month = _month;
        year = _year;
    }

    var monthName = MonthNames(month);
    $("#Calendar #MonthYearName").text(monthName);

    daysOfMonth = DaysInMonth(month, year);
    var htmlBoard = "";
    
    var strNowMonthFirstDay = "" + month + "/1/" + year;
    var dtNowMonthFirstDay = new Date(strNowMonthFirstDay);
    var beginingOffDaysNumber = dtNowMonthFirstDay.getDay();
    for (i = 1; i <= beginingOffDaysNumber; i++) {
        htmlBoard += '<div id="beginoffday' + i + '" class="Day OffDay"></div>';
    }

    var strEvents = $("#hdnEvents").val();
    var arrEvents = strEvents.split(",");
    var IsEvent = false;
    var divId = "";
    var classValue = "";
    var day = nowDate.getDate();
    var nowDay = "" + month + day + year;
    for (i = 1; i <= daysOfMonth; i++) {
        divId = "" + month + i + year;

        for (j = 0; j < arrEvents.length; j++) {
            if ($.trim(arrEvents[j]) == divId) {
                classValue = "Day EventDay";
                htmlBoard += '<div id="' + divId + '" class="' + classValue + '">' + '<a href="javascript:void()" onclick="alert(' + divId + ')">' + i + '</a></div>';
                IsEvent = true;
            }
        }

        if (!IsEvent) {
            classValue = (divId == nowDay) ? "Day CurrentDay" : "Day RegularDay";
            htmlBoard += '<div id="' + divId + '" class="' + classValue + '">' + i + '</div>';
        }
        IsEvent = false;
    }

    boxCalendar.html(htmlBoard);
}
