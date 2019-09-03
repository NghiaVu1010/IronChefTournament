/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

// Send the data to server
function addTeam() {
    $.post("/api/teams", $("#teamForm").serialize(), function(data) {
        data = JSON.parse(data);
        location.href = "details.html?teamId=" + data.TeamId;
    })
    .done(function() {
        //alert("Added successfully!");
    })
    .fail(function() {
        //alert("There was a problem, please try again.");
        $("<li>Please check that you meet the requirements!</li>").appendTo($("#errorMessages"));
    });

    return false;
}

/*
* Validation for team creation, returns errors if any
*
* @param errMsg (Array) - Array containing all errors found
* @param allInput (Object) - Grabs input from all text fields to be validated
* @param regExp (RegExp) - Regular expression for emails
*/
function validateForm() {
    let errMsg = [];
    let allInput = $("input[type='text']");
    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let regExpPhone = /^\d{3}-\d{3}-\d{4}$/;

    for(let i = 0; i < allInput.length; i++){
        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";
        }
        else if(allInput[i].name == "manageremail") {
            if(regExp.test($("#managerEmailField").val()) == false) {
                errMsg[errMsg.length] = "Please enter a valid email";
            }
        }
        else if(allInput[i].name == "managerphone") {
            if(regExpPhone.test($("#managerPhoneField").val()) == false) {
                errMsg[errMsg.length] = "Please enter a valid phone # (format: 860-555-5555)";
            }
        }
    }

    if($("#divisionDDL").val() == "") {
        errMsg[errMsg.length] = "Division is required";
    }

    if($("#minAgeField").val() > $("#maxAgeField").val()) {
        errMsg[errMsg.length] = "Please select a valid age range";
    }

    if($("#maxTeamField").val() == "") {
        errMsg[errMsg.length] = "Please select team size";
    }

    if($("input[name='teamgender']:checked").val() == undefined) {
        errMsg[errMsg.length] = "Please select gender";
    }
    
    $("#errorMessages").empty();
    if (errMsg.length == 0) {
        return true;
    }
    else {
        for(let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
        }
        return false;
    }
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

    let currDivision;
    $("#divisionDDL").on("change", () => {
        for(let i = 0; i < divisionData.length; i++) {
            if($("#divisionDDL").val() == divisionData[i].Code) {
                currDivision = divisionData[i];
            }
        };

        // Empty and populate based on Min Age restriction
        $("#minAgeField").empty();
        for(let i = currDivision.MinAge; i <= currDivision.MaxAge; i++) {
            let ageOption = $("<option>", {text: i, value: i});
            $("#minAgeField").append(ageOption);
        }

        // Empty and populate based on Max Age restriction
        $("#maxAgeField").empty();
        for(let j = currDivision.MinAge; j <= currDivision.MaxAge; j++) {
            let ageOption = $("<option>", {text: j, value: j});
            $("#maxAgeField").append(ageOption);
        }

        // Empty and populate based on team size restriction
        $("#maxTeamField").empty();
        for(let k = 2; k <= currDivision.MaxSize; k++) {
            let ageOption = $("<option>", {text: k, value: k});
            $("#maxTeamField").append(ageOption);
        };
    });


    // Add focus/blur effect on text
    $("input[type='text']").on("focus", function() {
        $(this).css({'background-color' : '#4ac3f3'});
    });
    $("input[type='text']").on("blur", function() {
        $(this).css({'background-color' : ''});
    });

    // Adds team and brings to details
    $("#addTeamBtn").on("click", function() {
        let isValid = validateForm();
        if(isValid == false) return;
        addTeam();
    });

    // Cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "teams.html";
    });
});