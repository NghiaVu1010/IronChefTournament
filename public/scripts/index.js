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
    
    // Creates a reference based on what button is clicked
    $("#navSearch").on("click", function() {
        sessionStorage.setItem("divisionPick", "none");
        location.href = "teams.html";
    });
    $("#masterBtn").on("click", function() {
        sessionStorage.setItem("divisionPick", "MasterChef");
        location.href = "teams.html";
    });
    $("#professionalBtn").on("click", function() {
        sessionStorage.setItem("divisionPick", "ProfessionalChef");
        location.href = "teams.html";
    });
    $("#amatuerBtn").on("click", function() {
        sessionStorage.setItem("divisionPick", "AmatuerChef");
        location.href = "teams.html";
    });
    $("#juniorBtn").on("click", function() {
        sessionStorage.setItem("divisionPick", "JuniorChef");
        location.href = "teams.html";
    });
});