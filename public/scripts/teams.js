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
    let courseId = list.CourseId;
    let courseTitle = list.Title;
    let courseMeets = list.Meets;

    let element = 
    "<tr><td>" + courseId + 
    "</td><td>" + courseTitle + 
    "</td><td>" + courseMeets + 
    "</td><td><a href='details.html?courseId=" + courseId + "'>View Details</a>" + 
    "</td><td><a href='edit_details.html?courseId=" + courseId + "'>Edit Details</a>" + 
    "</a></td></tr>";

    $("#coursesBody").append(element);
    $("#coursesBody tr td a").addClass("anchorDetail");
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

    //dynamically build DDL with divisions
    $.getJSON("/api/leagues", (data) => {
        buildList($("#coursesDDL"), data);
    });

    //populate table based on selection
    let courseData;
    $("#coursesDDL").on("change", function() {
        $("#coursesBody").empty();

        if($("#coursesDDL").val() == "") {
            $("#coursesTable").hide();
            return false;
        }
        else $("#coursesTable").show();

        $.getJSON("/api/courses/bycategory/" + $("#coursesDDL").val(), function(data) {
            courseData = data;
            displayData(courseData);
        });
    });
    
    //preload all courses
    let allData;
    $.getJSON("/api/courses", function(data) {
        allData = data;
    });

    $("#addCourseBtn").on("click", function() {
        location.href = "add_course.html";
    });

    //displays all courses currently offered when clicked
    $("#viewAllBtn").on("click", function() {
        $("#coursesBody").empty();
        $("#coursesTable").show();
        displayData(allData);
    });

    // Bind Click Event Handler to Reset Buttom
    $("#resetBtn").on("click", function() {
        $("#coursesBody").empty();
        $("#coursesTable").hide();
    });
});