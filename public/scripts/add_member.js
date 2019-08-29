/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

//send the data to server
function addMember(teamId) {
    $.post(`/api/teams/${teamId}/members`, $("#memberForm").serialize(), function(data) {

    })
        .done(function() {
            alert("Registered successfully!");
        })
        .fail(function() {
            alert("There was a problem, please try again.");
        });

    return false;
}

function validateForm() {
    let errMsg = [];
    let allInput = $("input[type='text']");

    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    for(let i = 0; i < allInput.length; i++){
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

    // console.log($("input[name='gender']:checked").val());
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

    $("#teamId").val(teamId);

    $("input[type='text']").on("focus", function() {
        $(this).css({'background-color' : '#4ac3f3'});
    });

    $("input[type='text']").on("blur", function() {
        $(this).css({'background-color' : ''});
    });


    for(let i = 18; i <= 100; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#ageField").append(ageOption);
    };

    //send back to details after registration
    $("#confirmBtn").on("click", function() {
        let isValid = validateForm();

        if(isValid == false) return;

        console.log($("#memberForm").serialize());

        addMember(teamId);
        //location.href = "details.html?teamId=" + teamId;
    });

    //cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "details.html?teamId=" + teamId;
    });
});