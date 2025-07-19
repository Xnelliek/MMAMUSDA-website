document.addEventListener("DOMContentLoaded", function() {
    var calendar = document.getElementById("calendar");
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();

    renderCalendar(currentYear, currentMonth);

    function renderCalendar(year, month) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var firstDayOfMonth = new Date(year, month, 1);
        var firstDayOfWeek = firstDayOfMonth.getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - firstDayOfWeek);

        var table = "<table>";
        table += `<caption>${monthNames[month]} ${year}</caption>`;
        table += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

        for (var i = 0; i < 6; i++) {
            table += "<tr>";

            for (var j = 0; j < 7; j++) {
                var day = startDate.getDate();
                var classes = [];

                if (startDate.getMonth() !== month) {
                    classes.push("other-month");
                }

                if (startDate.getDay() === 6) {
                    classes.push("sabbath");
                }

                if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                    classes.push("today");
                }

                // Check for events
                var event = getEvent(startDate);
                if (event) {
                    classes.push("event");
                }

                table += `<td class="${classes.join(' ')}">${day}${event ? '<br>' + event : ''}</td>`;
                startDate.setDate(startDate.getDate() + 1);
            }

            table += "</tr>";
        }

        table += "</table>";
        calendar.innerHTML = table;
    }

    // Function to get the event for a specific date
    function getEvent(date) {
        var dayOfWeek = date.getDay();
        var day = date.getDate();

        if (dayOfWeek >= 1 && dayOfWeek <= 4) {
            return "Evening Prayers 6-8 PM";
        } else if (dayOfWeek === 5) {
            return "Vespers 6-8 PM";
        } else if (dayOfWeek === 0) {
            return "Choir Practice 9 AM - 12 PM";
        }

        return null;
    }

    document.getElementById("prev").addEventListener("click", function() {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById("next").addEventListener("click", function() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        renderCalendar(currentYear, currentMonth);
    });
});
