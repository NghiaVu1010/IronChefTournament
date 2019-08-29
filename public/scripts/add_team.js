/*
* Description: POST data back to server
*
* Author: Neo
*/
"use strict";

//send the data to server
function addTeam() {
    $.post("/api/teams", $("#teamForm").serialize(), function(data) {
        data = JSON.parse(data);
        location.href = "details.html?teamId=" + data.TeamId;
    })
    .done(function() {
        alert("Added successfully!");
    })
    .fail(function() {
        alert("There was a problem, please try again.");
    });

    return false;
}

//complex-generic validation form
function validateForm() {
    let errMsg = [];
    let allInput = $("input[type='text']");
    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    for(let i = 0; i < allInput.length; i++){
        if($("#" + allInput[i].id).val().trim() == "") {
            errMsg[errMsg.length] = allInput[i].name + " is required";

            
        }
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
    //dynamically build DDL with categories
    let divisionData;
    $.getJSON("/api/leagues", (data) => {
        divisionData = data;
        buildList($("#divisionDDL"), divisionData);
    });

    for(let i = 13; i <= 100; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#minAgeField").append(ageOption);
    };

    for(let i = 13; i <= 100; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#maxAgeField").append(ageOption);
    };

    for(let i = 2; i <= 8; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#maxTeamField").append(ageOption);
    };

    $("input[type='text']").on("focus", function() {
        $(this).css({'background-color' : '#4ac3f3'});
    });

    $("input[type='text']").on("blur", function() {
        $(this).css({'background-color' : ''});
    });

    $("#addTeamBtn").on("click", function() {
        let isValid = validateForm();

        if(isValid == false) return;
        
        //console.log("adding team");
        
        addTeam();
        
        //location.href = "teams.html";
    });

    //cancel back to details
    $("#cancelBtn").on("click", function() {
        location.href = "teams.html";
    });
});