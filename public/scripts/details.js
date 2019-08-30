/*
* Description: 
*
* Author: Neo
*/
"use strict";

/*
* Show team info by fetching and filtering into specific functions
* 
* @param managerCard (Object) - Card holding info about manager
* @param requirementCard (Object) - Card holding info about team
* @param memberCard (Object) - Card holding info about members
*/
function showData(list) {
    // Header is set to the team name
    $("#teamName").text(list.TeamName);

    // Create card for manager
    let managerCard = createManagerCard(list);
    $("#team-details").append(managerCard);

    // Create card for team 'rules'
    let requirementCard = createRequirementCard(list);
    $("#team-details").append(requirementCard);

    // Create card for members
    if(list.Members.length == 0) {
        $("#team-members").append($("<p>")
            .text("There are currently no team members registered!"));
    }
    else {
        for(let i = 0; i < list.Members.length; i++) {
            let memberCard = createMemberCard(list.Members[i]);
            $("#team-members").append(memberCard);
        }
    }
}

/*
* Create a card for each member that gets passed
* 
* @param card (Object) - Main div holding the card together
* @param cardHead (Object) - Card head displaying generic text
* @param cardBody (Object) - Card body holding interested elements
* @param cardTitle (Object) - Card title holding manager name
* @param cardText1 (Object) - Card text holding manager phone
* @param cardText2 (Object) - Card text holding manager email
*/
function createManagerCard(team) {
    // Dynamically create card info
    let card = $("<div>", {class: "card col-md-6 m-4"});
    let cardHead = $("<h2>", {text: "Manager Info", class: "card-header text-center"})
    let cardBody = $("<div>", {class: "card-body"});
    let cardTitle = $("<h4>", {text: team.ManagerName});
    let cardText1 = $("<p>", {text: "Phone # - " + team.ManagerPhone});
    let cardText2 = $("<p>", {text: "Email - " + team.ManagerEmail})

    let editTeam = $("<button>", {type: "button", 
        class: "float-right", 
        id: "editTeam" + team.TeamId, 
        html: "<i class='fas fa-pencil-alt'></i>"});

    // Append the head/body
    card.append(cardHead)
        .append(cardBody);

    // Append the button
    cardHead.append(editTeam);

    // Append each element to the body
    cardBody.append(cardTitle)
        .append(cardText1)
        .append(cardText2)

    return card;
}

/*
* Create a card for 'requirement/rules'
* 
* @param card (Object) - Main div holding the card together
* @param cardHead (Object) - Card head displaying generic text
* @param cardBody (Object) - Card body holding interested elements
* @param cardText1 (Object) - Card text holding max size
* @param cardText2 (Object) - Card text holding age range
* @param cardText3 (Object) - Card text holding gender
*/
function createRequirementCard(team) {
    // Dynamically create card info
    let card = $("<div>", {class: "card col-md-4 m-4"});
    let cardHead = $("<h3>", {text: "Team Rules", class: "card-header text-center"})
    let cardBody = $("<div>", {class: "card-body"});
    let cardText1 = $("<p>", {text: "\u2022 Max Team Size - " + team.MaxTeamMembers});
    let cardText2 = $("<p>", {text: "\u2022 Ages " + team.MinMemberAge + "-" + team.MaxMemberAge});
    let cardText3 = $("<p>", {text: "\u2022 Gender - " + team.TeamGender})

    // Append the head/body
    card.append(cardHead)
        .append(cardBody);

    // Append each element to the body
    cardBody.append(cardText1)
        .append(cardText2)
        .append(cardText3)

    return card;
}

/*
* Create a card for each member
* 
* @param card (Object) - Main div holding the card together
* @param cardHead (Object) - Card head member name
* @param cardBody (Object) - Card body holding interested elements
* @param cardText1 (Object) - Card text holding age
* @param cardText2 (Object) - Card text holding gender
* @param cardText3 (Object) - Card text holding email
* @param cardText4 (Object) - Card text holding phone
* @param cardText5 (Object) - Card text holding contact name
* @param editCard (Object) - Edit button created for that member
* @param removeCard (Object) - Remove/delete button created for that member
*/
function createMemberCard(member) {
    // Dynamically create card info
    let card = $("<div>", {class: "card col-md-3"});
    let cardHead = $("<h5>", {text: member.MemberName, class: "card-header"})
    let cardBody = $("<div>", {class: "card-body"});
    let cardText1 = $("<p>", {text: "Age " + member.Age});
    let cardText2 = $("<p>", {text: "Gender - " + member.Gender})
    let cardText3 = $("<p>", {text: "Email - " + member.Email});
    let cardText4 = $("<p>", {text: "Phone # - " + member.Phone})
    let cardText5 = $("<p>", {text: "Contact Person - " + member.ContactName})

    // Creates a edit button to be used in a action modal
    let editCard = $("<button>", {type: "button", 
        class: "float-right", 
        id: "editMember" + member.MemberId, 
        html: "<i class='fas fa-pencil-alt'></i>"});

    // Creates a remove button to be used in a action modal
    let removeCard = $("<button>", {type: "button", 
        class: "float-right", 
        id: "removeMember" + member.MemberId,
        html: "<i class='fas fa-times'></i>"});

    // Append the body
    card.append(cardHead)
        .append(cardBody);

    // Append the buttons
    cardHead.append(removeCard)
        .append(editCard);
    
    // Append each tag to the body
    cardBody.append(cardText1)
        .append(cardText2)
        .append(cardText3)
        .append(cardText4)
        .append(cardText5);

    return card;
}

/*
* Dynamically create a modal to edit the team
* 
* WIP
* UPDATE - Too ugly to dynamically create. The form fields have too many different options
*   that defeats the purpose of a generic creation. Will come back if I have an epiphany.
*/
function createEditTeamModal(list) {
    let form = $("<form>", {id: "editTeamForm"});
    let newDiv = $("<div>", {class: "form-group"});
    let labelArr = ["Team Name:","Manager Name:", "Manager Phone:", "Manager Email:", 
        "Max Team Members:", "Min Member Age:", "Max Member Age:", "Team Gender:"];

    $(".modal-title").text("Edit Team");
    $(".modal-body").empty()
        .append(form);

    let i = 0;
    for(let key in list) {

        if(key != "TeamId" && key != "League" && key != "Members") {

            if(key != "TeamGender") newDiv = $("<div>", {class: "form-group"});
            else newDiv = $("<div>", {class: "form-check"});
            form.append(newDiv);

            let newLabel = $("<label>", {for: "modal-" + key + "-" + list.TeamId, text: labelArr[i]});
            newDiv.append(newLabel);
            
            let newSelect;
            i++;

            switch(key) {
                case 'TeamId':
                    // Do nothing
                    break;

                case 'League':
                    // Do nothing
                    break;

                case 'MaxTeamMembers': {
                    newSelect = $("<select>", {class: "form-control",
                        id: "modal-" + key + "-" + list.TeamId,
                        name: key.toLowerCase(),
                        required: "true"});

                    newDiv.append(newSelect);

                    for(let i = 2; i <= 8; i++) {
                        let teamSize = $("<option>", {text: i, value: i});
                        newSelect.append(teamSize);
                    };
                    break;
                }

                case 'MinMemberAge': {
                    newSelect = $("<select>", {class: "form-control",
                        id: "modal-" + key + "-" + list.TeamId,
                        name: key.toLowerCase(),
                        required: "true"});

                    newDiv.append(newSelect);

                    for(let i = 13; i <= 100; i++) {
                        let ageOption = $("<option>", {text: i, value: i});
                        newSelect.append(ageOption);
                    };
                    break;
                }

                case 'MaxMemberAge': {
                    newSelect = $("<select>", {class: "form-control",
                    id: "modal-" + key + "-" + list.TeamId,
                    name: key.toLowerCase(),
                    required: "true"});

                    newDiv.append(newSelect);

                    for(let i = 13; i <= 100; i++) {
                        let ageOption = $("<option>", {text: i, value: i});
                        newSelect.append(ageOption);
                    };
                    break;
                }

                case 'TeamGender':
                    newDiv = $("<div>", {class: "form-check"});

                    let newInput = $("<input>", {type: "text", 
                        class: "form-control", 
                        id: "modal-" + key + "-" + list.TeamId, 
                        name: key.toLowerCase(), 
                        value: list[key]});
                    break;

                case 'Members':
                    // Do nothing
                    break;

                default: {
                    let newInput = $("<input>", {type: "text", 
                        class: "form-control", 
                        id: "modal-" + key + "-" + list.TeamId, 
                        name: key.toLowerCase(), 
                        value: list[key]});

                    newDiv.append(newInput);
                    break;
                }
            }
        }
    }
}


/*
* Prefill modal to edit team with team info
*
* @param ageOption (Object) - Option element to be appended
* @param teamSize (Object) - Option element to be appended
*/
function prefillModal(list) {
    $(".modal-title").text("Edit Team");
    $(".modal-body").empty();

    for(let i = 13; i <= 100; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#minAgeField").append(ageOption);
    };

    for(let i = 13; i <= 100; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#maxAgeField").append(ageOption);
    };

    for(let i = 2; i <= 8; i++) {
        let teamSize = $("<option>", {text: i, value: i});
        $("#maxTeamField").append(teamSize);
    };
    
    $("#teamNameField").val(list.TeamName);
    $("#leagueField").val(list.League);
    $("#managerNameField").val(list.ManagerName);
    $("#managerEmailField").val(list.ManagerEmail);
    $("#managerPhoneField").val(list.ManagerPhone);
    $("#minAgeField").val(list.MinMemberAge);
    $("#maxAgeField").val(list.MaxMemberAge);
    $("#maxTeamField").val(list.MaxTeamMembers);
    $("input[name='teamgender'][value='" + list.TeamGender + "']")[0].checked = true;
}

/*
* Dynamically create a modal to edit a member
* 
* @param card (Object) - Main div holding the card together
* @param cardHead (Object) - Card head member name
* @param cardBody (Object) - Card body holding interested elements
* @param cardText1 (Object) - Card text holding age
* @param cardText2 (Object) - Card text holding gender
* @param cardText3 (Object) - Card text holding email
* @param cardText4 (Object) - Card text holding phone
* @param cardText5 (Object) - Card text holding contact name
* @param editCard (Object) - Edit button created for that member
* @param removeCard (Object) - Remove/delete button created for that member
*/
function createEditMemberModal(list) {
    let form = $("<form>", {id: "editMemberForm"});
    let newDiv = $("<div>", {class: "form-group"});
    let labelArr = ["Email:","Member Name:", "Contact Name:", "Age:", "Gender:", "Phone:"];

    $(".modal-title").text("Edit");
    $(".modal-body").empty()
        .append(form);

    let i = 0;
    for(let key in list) {
        if(key != "MemberId") {
            newDiv = $("<div>", {class: "form-group"});

            let newLabel = $("<label>", {for: "modal-" + key + "-" + list.MemberId, text: labelArr[i]});
            let newInput = $("<input>", {type: "text", 
                class: "form-control", 
                id: "modal-" + key + "-" + list.MemberId, 
                name: key.toLowerCase(), 
                value: list[key]});
            
            form.append(newDiv);
            newDiv.append(newLabel)
                .append(newInput);

            i++;
        }
    }
}

/*
* Dynamically create a modal to remove a member
* 
* @param newP (Object) - Element to confirm if the user wants to delete
*/
function createRemoveMemberModal(list) {
    let newP = $("<p>", {text: `Are you sure you want to delete ${list.MemberName} from this team?`});

    $(".modal-title").text("Delete");
    $(".modal-body").empty()
        .append(newP);
}

/*
* AJAX call to edit team info
*
* @param serial (String) - Concatenated serial form
*/
function editTeam(teamId) {
    let serial = `teamid=${teamId}&` + $("#editTeamForm").serialize();

    $.ajax({
        type: "PUT",
        url: `/api/teams`,
        data: serial
        })
        .done(function() {
            alert("Edit team successful!");
            location.reload();
        })
        .fail(function() {
            alert("There was a problem, please try again.");
        });

    return false;
}

/*
* AJAX call to edit a team member
*
* @param serial (String) - Concatenated serial form
*/
function editMember(teamId, memberId) {
    let serial = `teamid=${teamId}&memberid=${memberId}&` + $("#editMemberForm").serialize();

    $.ajax({
        type: "PUT",
        url: `/api/teams/${teamId}/members`,
        data: serial
        })
        .done(function() {
            alert("Edit successfully!");
            location.reload();
        })
        .fail(function() {
            alert("There was a problem, please try again.");
        });

    return false;
}

/*
* AJAX call to delete a member from the team
*/
function removeMember(teamId, memberId) {
    $.ajax({
        type: "DELETE",
        url: `/api/teams/${teamId}/members/${memberId}`
        })
        .done(function() {
            alert("Deleted successfully!");
            location.reload();
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

function validateEditMemberForm() {
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

    // Holds all team info
    let objs;

    // Holds current member id that has been selected
    let currMemberId;

    // Holds a string of the action to be done with modal
    let action;

    $.getJSON("/api/teams/" + teamId, (data) => {
        objs = data;
        showData(objs)

        // Wire in a on click event button to create a modal to edit/remove each team member
        for(let i = 0; i < objs.Members.length; i++) {
            $("#removeMember" + objs.Members[i].MemberId).on("click", function() {
                currMemberId = objs.Members[i].MemberId;

                action = "remove";
                createRemoveMemberModal(objs.Members[i]);
                $("#editTeamForm").hide();
                $("#actionModal").modal(focus);
            });

            $("#editMember" + objs.Members[i].MemberId).on("click", function() {
                currMemberId = objs.Members[i].MemberId;

                action = "edit";
                createEditMemberModal(objs.Members[i]);
                $("#editTeamForm").hide();
                $("#actionModal").modal(focus);
            });
        }

        // Wire in a on click for the edit team
        $("#editTeam" + teamId).on("click", function() {
            action = "team";

            prefillModal(objs);
            $("#editTeamForm").show();
            //createEditTeamModal(objs);
            $("#actionModal").modal(focus);
        });
    });

    // Link to add a new team member
    $("#addMemberBtn").on("click", function() {
        location.href = "add_member.html?teamId=" + teamId;
    });

    // Cancel back to teams
    $("#cancelBtn").on("click", function() {
        location.href = "teams.html";
    });

    // Confirm modal button switches based on what action is being done with modal
    $("#confirmModalBtn").on("click", function () {
        switch(action) {
            case 'team': {
                let isValid = validateForm();
                if (!isValid) return;
                editTeam(teamId);
                break;
            }
            case 'edit': {
                editMember(teamId, currMemberId);
                break;
            }
            case 'remove': {
                removeMember(teamId, currMemberId);
                break;
            }
        }
    });
});