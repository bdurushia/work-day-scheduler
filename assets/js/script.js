var hours = [
    {time: "9:00am"},
    {time: "10:00am"},
    {time: "11:00am"},
    {time: "12:00pm"},
    {time: "1:00pm"},
    {time: "2:00pm"},
    {time: "3:00pm"},
    {time: "4:00pm"},
    {time: "5:00pm"}
];

// Create time Block
var createTimeBlock = function() {
    for (let i = 0; i < hours.length; i++) {
        var timeBlock = $("<div>").addClass("time-block");
        var timeP = $("<p>").text(hours[i].time);
        $(".container").append(timeBlock);
        $(".time-block").append(timeP);
        
    }
};

createTimeBlock();
// style .time-block not wokring