/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

/*
* Send data to the server with an image
*
* @param formData (Object) - Form getting pased
*/
function addMember(theForm, teamId) {
    // ---- ORIGINAL VERSION WITHOUT IMAGE ----
    // $.post(`/api/teams/${teamId}/members`, $("#memberForm").serialize(), function(data) {})
    //     .done(function() {
    //         alert("Registered successfully!");
    //         //location.href = "details.html?teamId=" + teamId;
    //     })
    //     .fail(function() {
    //         //alert("There was a problem, please try again.");
    //         $("<li>Please check that you meet the requirements!</li>").appendTo($("#errorMessages"));
    //     });

    var formData = new FormData(theForm);

    $.ajax({
        type: "POST",
        url: `/api/teams/${teamId}/members`,
        data: formData,
        processData: false,
        contentType: false
        })
        .done(function() {
            //alert("Edit team successful!");
            location.href = "details.html?teamId=" + teamId;
        })
        .fail(function() {
            //alert("There was a problem, please try again.");
            $("<li>Please see if the requirements conflict with an existing team member!</li>").appendTo($("#errorMessages"));
        });

    return false;
}

/*
* Validation for adding a member, returns errors if any
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
    }

    if(regExp.test($("#emailField").val()) == false) {
        errMsg[errMsg.length] = "Please enter a valid email";
    }

    if(regExpPhone.test($("#phoneField").val()) == false) {
        errMsg[errMsg.length] = "Please enter a valid phone # (format: 860-555-5555)";
    }

    if($("#ageField").val() == "") {
        errMsg[errMsg.length] = "Please select your age";
    }

    if($("input[name='gender']:checked").val() == undefined) {
        errMsg[errMsg.length] = "Please select your gender";
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

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");
    let currLeague = sessionStorage.getItem("league");

    // Add focus/blur effect on text
    $("input[type='text']").on("focus", function() {
        $(this).css({'background-color' : '#4ac3f3'});
    });
    $("input[type='text']").on("blur", function() {
        $(this).css({'background-color' : ''});
    });

    // Call to get current division info
    let divisionData;
    $.getJSON("/api/leagues", (data) => {
        
        for(let i = 0; i < data.length; i++) {
            
            if(currLeague == data[i].Code) {
                divisionData = data[i];

                // Dynamically generate age selection
                for(let j = divisionData.MinAge; j <= divisionData.MaxAge; j++) {
                    let ageOption = $("<option>", {text: j, value: j});
                    $("#ageField").append(ageOption);
                };
            }

        };
    });

    // Cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "details.html?teamId=" + teamId;
    });

    // Cancel back to details
    $("#teamLink").on("click", function() {
        location.href = "details.html?teamId=" + teamId;
    });

    // Send back to details after adding a member
    $("#confirmBtn").on("click", function() {
        $("#memberForm").submit();
        // let isValid = validateForm();
        // if(isValid == false) return;
        // addMember(teamId);
    });
    // Bing event handler to the submit
    $("#memberForm").on("submit", function(e) {
        e.preventDefault();
        let isValid = validateForm();
        if(isValid == false) return;
        addMember(this, teamId);
    })
});