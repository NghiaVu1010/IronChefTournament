/*
* Description: 
*
* Author: Neo
*/
"use strict";

/*
* Handle data to be displayed
*/
function displayData(list) {
    for(let i = 0; i < list.length; i++) {
        insertTableRow(list[i]);
    }
}

/*
* Insert data into table with a new row
* 
* @param courseId (String) - set value to courseId data
* @param courseTitle (String) - set value to Title data
* @param courseMeets (String) - set value to Meets data
* @param element (Object) - Create an row element to build table
*/
function insertTableRow(list) {
    // Create row to append interested data
    let newRow = $("<tr>");
    let teamIdElement = $("<td>", {text: list.TeamId});
    let teamNameElement = $("<td>", {text: list.TeamName});
    let managerNameElement = $("<td>", {text: list.ManagerName});
    let membersLenElement = $("<td>", {text: list.Members.length});
    
    // Create data specifically for view details
    let newTd = $("<td>");
    let detailElement = $("<a>", {text: "View / Edit", href: "details.html?teamId=" + list.TeamId, class: "anchorDetail"});

    $("#teamBody").append(newRow);

    newRow.append(teamIdElement)
        .append(teamNameElement)
        .append(managerNameElement)
        .append(membersLenElement)
        .append(newTd);

    newTd.append(detailElement);
}

/*
* Build generic dropdown list
* 
* @param element (Object) - Create an option element to build drop down
*/
function buildList(dropdown, list) {
    for(let i = 0; i < list.length; i++) {
        let element = $("<option>", {text: list[i].Name, value: list[i].Code});
        dropdown.append(element);
    }
}

$(function() {
    // Dynamically build DDL with divisions
    let divisionData;
    $.getJSON("/api/leagues", (data) => {
        divisionData = data;
        buildList($("#divisionDDL"), divisionData);
        
    });
    
    // Populate table based on selection
    //let courseData;
    $("#teamTable").hide();

    $("#divisionDDL").on("change", () => {
        $("#teamBody").empty();

        if($("#divisionDDL").val() == "") {
            $("#teamTable").hide();
            $("#divisionDetails").empty();
            return false;
        }
        else $("#teamTable").show();

        // Show description based on selection
        for(let i = 0; i < divisionData.length; i++) {
            if($("#divisionDDL").val() == divisionData[i].Code)
                $("#divisionDetails").text(divisionData[i].Description);
        }

        console.log($("#divisionDDL").val());
        
        $.getJSON("/api/teams/byleague/" + $("#divisionDDL").val(), (data) => {
            


            displayData(data);
        });
    });
    
    // Preload all courses
    let allData;
    $.getJSON("/api/teams", function(data) {
        allData = data;
    });

    // $("#addCourseBtn").on("click", function() {
    //     location.href = "add_course.html";
    // });

    // Displays all courses currently offered when clicked
    $("#viewAllBtn").on("click", function() {
        $("#teamBody").empty();
        $("#teamTable").show();
        displayData(allData);
    });

    // Bind Click Event Handler to Reset Buttom
    $("#resetBtn").on("click", function() {
        $("#teamBody").empty();
        $("#teamTable").hide();
    });
});