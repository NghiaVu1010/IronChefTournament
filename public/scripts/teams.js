/*
* Description: Recieves and displays all data into a table format.
*   Allows for the ability to view details/delete a team.
*
* Author: Neo
*/
"use strict";

/*
* Handle data to be displayed
*/
function displayData(list) {
    let empty = true;
    for(let i = 0; i < list.length; i++) {
        if(($("input[name='gender']:checked").val() == list[i].TeamGender) || ($("input[name='gender']:checked").val() == "Any")) {
            insertTableRow(list[i]);
            empty = false;
        }
    }

    // Check to see if there were no teams found
    $("#emptyDiv").empty();
    if(empty == true) {
        let emptyElement = $("<p>", {text: "No teams founds! Please try a different search criteria.", class: "text-center white"});
        $("#emptyDiv").append(emptyElement);
    }
}

/*
* Insert data into table with a new row
* 
* @param newRow (Object) - Create a blank row to be appended
* @param teamIdElement (Object) - Create a cell for team id
* @param teamNameElement (Object) - Create a cell for team name
* @param managerNameElement (Object) - Create a cell for manager name
* @param membersLenElement (Object) - Create a cell for amount of members
* @param newTd (Object) - Create a blank td to be appended
* @param detailElement (Object) - Create a detail button to redirect
* @param deleteElement (Object) - Create a delete button to delete
*/
function insertTableRow(list) {
    // Create row to append interested data
    let newRow = $("<tr>");

    // Create interested elements to be appended
    //let teamIdElement = $("<td>", {text: list.TeamId});
    let teamNameElement = $("<td>", {text: list.TeamName});
    let managerNameElement = $("<td>", {text: list.ManagerName});
    let managerEmailElement = $("<td>", {text: list.ManagerEmail})
    let membersLenElement = $("<td>", {text: list.Members.length + ` (max: ${list.MaxTeamMembers})`});
    
    // Create data specifically for view/delete team
    let newTd = $("<td>");
    let detailElement = $("<button>", {type: "button", 
        class: "btn btn-outline-success mx-1",
        id: "detailTeam" + list.TeamId, 
        text: "Details"});
    let deleteElement = $("<button>", {type: "button", 
        class: "btn btn-outline-danger mx-1",
        id: "removeTeam" + list.TeamId, 
        text: "Delete"});

    // Append the row to the body
    $("#teamBody").append(newRow);

    // Append interested elements
    newRow.append(teamNameElement)
        .append(managerNameElement)
        .append(managerEmailElement)
        .append(membersLenElement)
        .append(newTd);

    // Append edit/delete icons
    newTd.append(detailElement)
        .append(deleteElement);

    // Wire in click event for view details
    $("#detailTeam" + list.TeamId).on("click", () => {
        location.href = `details.html?teamId=${list.TeamId}`;
    });

    // Wire in click event for view details
    $("#removeTeam" + list.TeamId).on("click", () => {
        // Save team id for deletion
        sessionStorage.setItem("teamid", list.TeamId);
        createDeleteModal(list);
        $("#deleteModal").modal(focus);
    });
}

/*
* Dynamically generate delete modal
* 
* @param newP (Object) - Create an element to append
*/
function createDeleteModal(list) {
    let newP = $("<p>", {text: "Are you sure you want to delete this team?"});

    $(".modal-body").empty();
    $(".modal-title").text(list.TeamName);
    $(".modal-body").append(newP);
}

/*
* Build generic dropdown list
* 
* @param element (Object) - Create an option element to build drop down
*/
function buildList(dropdown, list) {
    let divisionPicked = sessionStorage.getItem("divisionPick");

    for(let i = 0; i < list.length; i++) {
        if(divisionPicked == list[i].Code) {
            let element = $("<option>", {text: list[i].Name, value: list[i].Code, selected: "selected"});
            dropdown.append(element);
        }
        else {
            let element = $("<option>", {text: list[i].Name, value: list[i].Code});
            dropdown.append(element);
        }
    }
}

// AJAX call to delete a team
function deleteTeam(teamId) {
    $.ajax({
        type: "DELETE",
        url: `/api/teams/${teamId}`
        })
        .done(function() {
            location.reload();
        })
        .fail(function() {
        });

    return false;
}

$(function() {
    // Call to get all divisions and dynamically build DDL
    let divisionData;
    let divisionPicked = sessionStorage.getItem("divisionPick");

    $.getJSON("/api/leagues", (data) => {
        divisionData = data;
        buildList($("#divisionDDL"), divisionData);

        if(divisionPicked != "none") {
            $.getJSON("/api/teams/byleague/" + $("#divisionDDL").val(), (data) => {
                displayData(data);
                $("#teamTable").show();
            });

            for(let i = 0; i < divisionData.length; i++) {
                if($("#divisionDDL").val() == divisionData[i].Code)
                    $("#divisionDetails").text(divisionData[i].Description);
            }
        }
    });
    
    // Populate table based on selection
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
        
        // Call to display all teams in that divison
        $.getJSON("/api/teams/byleague/" + $("#divisionDDL").val(), (data) => {
            displayData(data);
        });
    });
    
    // Preload all teams
    let allData;
    $.getJSON("/api/teams", function(data) {
        allData = data;
    });

    // Button redirects to add a team
    $("#addTeamBtn").on("click", function() {
        location.href = "add_team.html";
    });

    // Displays all teams when clicked
    $("#viewAllBtn").on("click", function() {
        $("#teamBody").empty();
        $("#teamTable").show();
        displayData(allData);
    });

    // Modal confirm button to delete the team
    $("#confirmModalBtn").on("click", function() {
        deleteTeam(sessionStorage.getItem("teamid"));
    });

    // Bind Click Event Handler to Reset Buttom

    $("#searchForm").on("reset", function(e) {
        e.preventDefault();
        $("#teamBody").empty();
        $("#teamTable").hide();
        $("#emptyDiv").empty();
        $("#divisionDetails").empty();
        $("#divisionDDL").val("0");
    });
});