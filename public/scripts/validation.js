/*
* Description: Helper functions to validate
*
* Author: Neo
*/
"use strict";

/*
* Validation for manager/team info, returns errors
*
* @param errMsg (Array) - Array containing all errors found
* @param allInput (Object) - Grabs input from all text fields to be validated
* @param regExp (RegExp) - Regular expression for emails
*/
function validateTeamForm() {
    let errMsg = [];
    let allInput = $("#editTeamForm input[type='text']");
    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    for(let i = 0; i < allInput.length; i++){
        // Checks to see if any field is empty
        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";
        }
        // Check to see if email and test against RegExp
        else if(allInput[i].name == "manageremail") {
            if(regExp.test($("#managerEmailField").val()) == false) {
                errMsg[errMsg.length] = "Please enter a valid email";
            }
        }
    }

    if($("#divisionDDL").val() == "") {
        errMsg[errMsg.length] = "category is required";
    }

    if($("#minAgeField").val() == "") {
        errMsg[errMsg.length] = "Please select min age";
    }

    if($("#maxAgeField").val() == "") {
        errMsg[errMsg.length] = "Please select max age";
    }

    if($("#maxTeamField").val() == "") {
        errMsg[errMsg.length] = "Please select team size";
    }

    if($("input[name='teamgender']:checked").val() == undefined) {
        errMsg[errMsg.length] = "Please select gender";
    }
    
    // Displays if any error messages are found
    $("#errorTeamMessages").empty();
    if (errMsg.length == 0) {
        return true;
    }
    else {
        for(let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorTeamMessages"));
        }
        return false;
    }
}

/*
* Validation for team members, returns errors if any
*
* @param errMsg (Array) - Array containing all errors found
* @param allInput (Object) - Grabs input from all text fields to be validated
* @param regExp (RegExp) - Regular expression for emails
*/
function validateEditMemberForm() {
    let errMsg = [];
    let allInput = $("#editMemberForm input[type='text']");
    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    for(let i = 0; i < allInput.length; i++){
        // Checks to see if any field is empty
        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";
        }
    }

    if(regExp.test($("#emailField").val()) == false) {
        errMsg[errMsg.length] = "Please enter a valid email";
    }

    if($("#ageField").val() == "") {
        errMsg[errMsg.length] = "Please select your age";
    }

    if($("input[name='gender']:checked").val() == undefined) {
        errMsg[errMsg.length] = "Please select your gender";
    }

    $("#errorMemberMessages").empty();
    if (errMsg.length == 0) {
        return true;
    }
    else {
        for(let i = 0; i < errMsg.length; i++) {
            $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMemberMessages"));
        }
        return false;
    }
}