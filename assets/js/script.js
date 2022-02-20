const hours = [
    {time: ["09:00am", "nine-am"]},
    {time: ["10:00am", "ten-am"]},
    {time: ["11:00am", "eleven-am"]},
    {time: ["12:00pm", "twelve-pm"]},
    {time: ["01:00pm", "one-pm"]},
    {time: ["02:00pm", "two-pm"]},
    {time: ["03:00pm", "three-pm"]},
    {time: ["04:00pm", "four-pm"]},
    {time: ["05:00pm", "five-pm"]}
];

// Display Current Date using Moment.js
const todaysDate = moment().format('MMMM Do, YYYY');
$('#currentDay').text(todaysDate);

// Create time Block
const createTimeBlock = function() {
    const blockContainer = $('.container');
    
    $.each(hours, function(i, time) {
        
        let ulEl = $('<ul>')
        .addClass('list-group list-group-horizontal');
        
        let hourLi = $('<li>')
        .addClass('list-group-item hour ' + hours[i].time[1])
        .text(hours[i].time[0]);
        
        let timeBlockLi = $('<li>')
        .prop('id', hours[i].time[1])
        .addClass('list-group-item time-block container-fluid');
        
        let textAreaEl = $('<textarea>')
        .addClass('container-fluid');
        
        let saveIcon = $('<i>')
        .addClass('fas fa-save');

        let saveBtnLi = $('<li>')
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

const checkHour = function() {
    // let now = moment().format('hA');
    
    let now = moment('2:15pm', 'hA');
    
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

createTimeBlock();
checkHour();