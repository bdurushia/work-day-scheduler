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
        .addClass('fas fa-floppy-disk');

        let spanEl = $('<span>');

        let saveBtnLi = $('<li>')
        .addClass('list-group-item saveBtn')
        .append($('<button type=button">').append(spanEl.append(saveIcon)));
        
        blockContainer
            .append(ulEl
                .append(hourLi, 
                    timeBlockLi.append(textAreaEl), 
                    saveBtnLi)
            );
    });
};

const checkHour = function() {
    // let currentHour = moment().format("hh");
    // let amPm = moment().format("a");

    let currentHour = '02';
    let amPm = 'pm';

    let currentTime = currentHour + amPm;
    
    $.each(hours, function(i, time) {
        let hourAttr = hours[i].time[1];
        let timeBlock = $('#' + hourAttr);

        let timeTextArr = $('.' + hourAttr).text().split('');
        let textAmPm = timeTextArr[5] + timeTextArr[6];
        let textHour = timeTextArr[0] + timeTextArr[1];
        let textTime = textHour + textAmPm;

        if (textTime === currentTime) {
            timeBlock.addClass('present');
        }
        else if (textAmPm === amPm) {
            if (textHour > currentHour) {
                timeBlock.addClass('future');
            } else if ('10' < currentHour < '13') {
                timeBlock.addClass('past');
            }
        }
    });
};

createTimeBlock();
checkHour();