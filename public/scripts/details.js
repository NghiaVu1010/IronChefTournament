/*
* Description: Creates cards for each team member as well as for the manager.
*   Dynamically creates edit/delete modals for team members.
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
            .text("There are currently no team members registered!")
            .prop("class", "white"));
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
    let cardHead = $("<h2>", {text: "Manager Info", class: "card-header text-left"})
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
* @param cardImg (Object) - Card img
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
    let cardImg = $("<img>", {src: member.Profile, alt: member.MemberId + "Profile", class: "card-img-top"});
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
    card.append(cardImg)
        .append(cardHead)
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
function prefillTeamModal(list, req) {
    for(let i = req.MinAge; i <= req.MaxAge; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#minAgeField").append(ageOption);
    };

    for(let i = req.MinAge; i <= req.MaxAge; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#maxAgeField").append(ageOption);
    };

    for(let i = 2; i <= req.MaxSize; i++) {
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
* UPDATE: There was over-looked component regarding dropdowns/selectors. Can be done, but like the 'edit team',
*   will be ugly and not easily maintainable.
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
* Prefill modal to edit member
*
* @param ageOption (Object) - Option element to be appended
*/
function prefillMemberModal(list, req) {
    for(let i = req.MinAge; i <= req.MaxAge; i++) {
        let ageOption = $("<option>", {text: i, value: i});
        $("#ageField").append(ageOption);
    };
    
    $("#nameField").val(list.MemberName);
    $("#emailField").val(list.Email);
    $("#phoneField").val(list.Phone);
    $("#contactField").val(list.ContactName);
    $("#ageField").val(list.Age);
    $("input[name='gender'][value='" + list.Gender + "']")[0].checked = true;
}

/*
* Dynamically create a modal to remove a member
* 
* @param newP (Object) - Element to confirm if the user wants to delete
*/
function createRemoveMemberModal(list) {
    $("#editMemberTitle").text("Delete");
    $("#deleteMsg").text(`Are you sure you want to delete ${list.MemberName} from this team?`);
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
            //alert("Edit team successful!");
            location.reload();
        })
        .fail(function() {
            //alert("There was a problem, please try again.");
            $("<li>Please see if the requirements conflict with an existing team member!</li>").appendTo($("#errorTeamMessages"));
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
            //alert("Edit successfully!");
            location.reload();
        })
        .fail(function() {
            //alert("There was a problem, please try again.");
            $("<li>Please check that you meet the requirements!</li>").appendTo($("#errorMemberMessages"));
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
            //alert("Deleted successfully!");
            location.reload();
        })
        .fail(function() {
            //alert("There was a problem, please try again.");
        });

    return false;
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
        showData(objs);

        let info;
        $.getJSON("/api/leagues", (data) => {
            for(let i = 0; i < data.length; i++) {
                if(objs.League == data[i].Code) {
                    info = {MinAge: data[i].MinAge, MaxAge: data[i].MaxAge, MaxSize: data[i].MaxSize};
                }
            }
        });

        // Wire in a on click event button to create a modal to edit/remove each team member
        for(let i = 0; i < objs.Members.length; i++) {
            $("#removeMember" + objs.Members[i].MemberId).on("click", function() {
                // Grab info to remove
                currMemberId = objs.Members[i].MemberId;
                action = "remove";

                createRemoveMemberModal(objs.Members[i]);

                $("#editMemberForm").hide();
                $("#editMemberModal").modal(focus);
            });

            $("#editMember" + objs.Members[i].MemberId).on("click", function() {
                // Grab info to edit
                currMemberId = objs.Members[i].MemberId;
                action = "edit";

                prefillMemberModal(objs.Members[i], info);

                $("#editMemberTitle").text("Edit");
                $("#deleteMsg").empty();
                $("#editMemberForm").show();
                $("#editMemberModal").modal(focus);
            });
        }

        // Wire in a on click for the edit team
        $("#editTeam" + teamId).on("click", function() {
            prefillTeamModal(objs, info);
            $("#editTeamModal").modal(focus);
        });
    });

    // Link to add a new team member
    $("#addMemberBtn").on("click", function() {
        location.href = "add_member.html?teamId=" + teamId;
        sessionStorage.setItem("league", objs.League);
    });

    // Cancel back to teams
    $("#cancelBtn").on("click", function() {
        location.href = "teams.html";
    });

    // Cancel and Confirm for edit team modal
    $("#cancelTeamModalBtn").on("click", function () {
        $("#errorTeamMessages").empty();
    });
    $("#confirmTeamModalBtn").on("click", function () {
        let isValid = validateTeamForm();
        if (!isValid) return;
        editTeam(teamId);
    });

    // Cancel and Confirm for edit/remove member modal
    $("#cancelMemberModalBtn").on("click", function () {
        $("#errorMemberMessages").empty();
    });
    $("#confirmMemberModalBtn").on("click", function () {
        switch(action) {
            case 'edit': {
                let isValid = validateEditMemberForm();
                if (!isValid) return;
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