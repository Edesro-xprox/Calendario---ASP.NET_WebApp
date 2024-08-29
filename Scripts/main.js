import Calendar from './calendar.js';

$(document).ready(() => {
    $('.nav-icon').mouseover((e) => {
        $('.nav-icon').removeClass('fa-beat');
        $(e.target).addClass('fa-beat');
    });
    $('.nav-icon').mouseout((e) => {
        $('.nav-icon').removeClass('fa-beat');
        $(e.target).removeClass('fa-beat');
    });
    new Calendar();
});