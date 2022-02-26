let tasks = {
    "9am": [],
    "10am": [],
    "11am": [],
    "12pm": [],
    "1pm": [],
    "2pm": [],
    "3pm": [],
    "4pm": [],
    "5pm": []
};

const hours = [
    {time: ["09:00am", "9am"]},
    {time: ["10:00am", "10am"]},
    {time: ["11:00am", "11am"]},
    {time: ["12:00pm", "12pm"]},
    {time: ["01:00pm", "1pm"]},
    {time: ["02:00pm", "2pm"]},
    {time: ["03:00pm", "3pm"]},
    {time: ["04:00pm", "4pm"]},
    {time: ["05:00pm", "5pm"]}
];

// Display Current Date using Moment.js
const todaysDate = moment().format('MMMM Do, YYYY');
$('#currentDay').text(todaysDate);

// Create time Block
const createTimeBlock = function() {
    const blockContainer = $('.container');
    
    $.each(hours, function(i) {
        
        let ulEl = $('<ul>')
        .addClass('list-group list-group-horizontal');
        
        let hourLi = $('<li>')
        .addClass('list-group-item hour ' + hours[i].time[1])
        .text(hours[i].time[0]);
        
        let timeBlockLi = $('<li>')
        .prop('id', hours[i].time[1])
        .addClass('list-group-item time-block container-fluid');
        
        let textAreaEl = $('<textarea data-store="' + i + '">')
        .addClass('container-fluid');
        
        let saveIcon = $('<i>')
        .addClass('fas fa-save');

        let saveBtnLi = $('<li>')
        .prop('id', i)
        .addClass('list-group-item saveBtn')
        .append(saveIcon)
        .append($('<button type=button">'));
        
        blockContainer
            .append(ulEl
                .append(hourLi, 
                    timeBlockLi.append(textAreaEl), 
                    saveBtnLi)
            );
    });
};

// check time of day and change timeBlock colors based on if it is in the past, present, or future
const checkHour = function() {
    let now = moment();
    // let now = moment('2:15pm', 'hA');
    $.each(hours, function(i) {
        let hourAttr = hours[i].time[1];
        let timeBlock = $('#' + hourAttr);

        let blockHour = moment(hours[i].time[0], 'hA');

        if (now.hour() === blockHour.hour()) {
            timeBlock.addClass('present');
        } else if (now.isBefore(blockHour)) {
            timeBlock.addClass('future');
        } else if (now.isAfter(blockHour)) {
            timeBlock.addClass('past');
        }
    });
};

// Display local storage items on page
const loadItems = function() {
    // Get items from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
    
    // If nothing in local storage, create new object to track
    if (!tasks) {
        tasks = {
            "9am": [],
            "10am": [],
            "11am": [],
            "12pm": [],
            "1pm": [],
            "2pm": [],
            "3pm": [],
            "4pm": [],
            "5pm": []
        };
    }

    // Display on page
    $("*[data-store]").each(function() {
        let taskId = $(this).closest('.list-group-item').attr('id');
        let text = tasks[taskId];
        $(this).val(text);
    });
};

// save tasks to local storage
const saveItems = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

createTimeBlock();
checkHour();
loadItems();

// Event handler targeting value stored in <textarea data-store= > 
$('.saveBtn').on('click', function() {
    let itemId = $(this).closest('.list-group-item').attr('id');
    let textInput = $('[data-store=' + itemId + ']').val();
    let index = $('[data-store=' + itemId + ']').closest('.list-group-item').attr('id');

    tasks[index].push(textInput);

    saveItems();
});