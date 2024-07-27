const events = {
    "2024-07-15": "Event 1",
    "2024-07-20": "Event 2",
    "2024-07-25": "Event 3",
};

document.addEventListener('DOMContentLoaded', function() {
    const calendarElement = document.getElementById('calendar');
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar(month, year) {
        calendarElement.innerHTML = '';
        
        const header = document.createElement('div');
        header.className = 'calendar-header';
        
        const prevButton = document.createElement('button');
        prevButton.innerText = '<';
        prevButton.onclick = () => changeMonth(-1);
        header.appendChild(prevButton);

        const monthYear = document.createElement('div');
        monthYear.innerText = `${monthNames[month]} ${year}`;
        header.appendChild(monthYear);

        const nextButton = document.createElement('button');
        nextButton.innerText = '>';
        nextButton.onclick = () => changeMonth(1);
        header.appendChild(nextButton);

        calendarElement.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            grid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.innerText = day;
            
            if (events[dateString]) {
                dayCell.classList.add('event');
                dayCell.title = events[dateString];
            }
            
            if (date.toDateString() === today.toDateString()) {
                dayCell.classList.add('today');
            }

            grid.appendChild(dayCell);
        }

        calendarElement.appendChild(grid);
    }

    function changeMonth(offset) {
        currentMonth += offset;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        renderCalendar(currentMonth, currentYear);
    }

    renderCalendar(currentMonth, currentYear);
});

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
