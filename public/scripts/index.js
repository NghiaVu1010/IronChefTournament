/*
* Description: Add basic functions
*
* Author: Neo
*/
"use strict";

$(function() {
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