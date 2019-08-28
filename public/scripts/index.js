/*
* Description: Add basic functions
*
* Author: Neo
*/
"use strict";

// WIP
function stick_top_nav(){
	if(window.pageYOffset > 36) $("#menu_bar").addClass('stick');
	else $("#menu_bar").removeClass('stick');
}

$(function() {
    //stick_top_nav();

    $("#lookUpCourses").on("click", function() {
        location.href = "courses.html";
    });
});