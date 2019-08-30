/*
* Description: 
*
* Author: Neo
*/
"use strict";

/*
* Insert data into table with a new row
* 
* @param element (Object) - Create an row element to build table
*/
function showData(list) {
    $("#teamName").text(list.TeamName);

    let managerCard = createManagerCard(list);
    $("#team-details").append(managerCard);

    let requirementCard = createRequirementCard(list);
    $("#team-details").append(requirementCard);

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

function createManagerCard(team) {
    // Dynamically create card info
    let card = $("<div>", {class: "card col-md-6 m-4"});
    let cardHead = $("<h2>", {text: "Manager Info", class: "card-header text-center"})
    let cardBody = $("<div>", {class: "card-body"});
    let cardTitle = $("<h4>", {text: team.ManagerName});
    let cardText1 = $("<p>", {text: "Phone # - " + team.ManagerPhone});
    let cardText2 = $("<p>", {text: "Email - " + team.ManagerEmail})

    // Append the body
    card.append(cardHead)
        .append(cardBody);

    // Append each tag to the body
    cardBody.append(cardTitle)
        .append(cardText1)
        .append(cardText2)

    return card;
}

function createRequirementCard(team) {
    // Dynamically create card info
    let card = $("<div>", {class: "card col-md-4 m-4"});
    let cardHead = $("<h3>", {text: "Team Rules", class: "card-header text-center"})
    let cardBody = $("<div>", {class: "card-body"});
    let cardTitle = $("<p>", {text: "\u2022 Max Team Size - " + team.MaxTeamMembers});
    let cardText1 = $("<p>", {text: "\u2022 Ages " + team.MinMemberAge + "-" + team.MaxMemberAge});
    let cardText2 = $("<p>", {text: "\u2022 Gender - " + team.TeamGender})

    // Append the body
    card.append(cardHead)
        .append(cardBody);

    // Append each tag to the body
    cardBody.append(cardTitle)
        .append(cardText1)
        .append(cardText2)

    return card;
}

function createMemberCard(member) {

    let editCard = $("<button>", {type: "button", 
        class: "float-right", 
        id: "editMember" + member.MemberId, 
        html: "<i class='fas fa-pencil-alt'></i>"});

    let removeCard = $("<button>", {type: "button", 
        class: "float-right", 
        id: "removeMember" + member.MemberId,
        html: "<i class='fas fa-times'></i>"});

    // Dynamically create card info
    let card = $("<div>", {class: "card col-md-3"});
    let cardHead = $("<h5>", {text: member.MemberName, class: "card-header"})
    let cardBody = $("<div>", {class: "card-body"});
    let cardText1 = $("<p>", {text: "Age " + member.Age});
    let cardText2 = $("<p>", {text: "Gender - " + member.Gender})
    let cardText3 = $("<p>", {text: "Email - " + member.Email});
    let cardText4 = $("<p>", {text: "Phone # - " + member.Phone})
    let cardText5 = $("<p>", {text: "Contact Person - " + member.ContactName})

    // Append the body
    card.append(cardHead)
        .append(cardBody);

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

function createEditModal(list) {
    let form = $("<form>", {id: "editForm"});
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

function createRemoveModal(list) {
    let newP = $("<p>", {text: `Are you sure you want to delete ${list.MemberName} from this team?`});

    $(".modal-title").text("Delete");
    $(".modal-body").empty()
        .append(newP);
}

function editMember(teamId, memberId) {
    let serial = `teamid=${teamId}&memberid=${memberId}&` + $("#editForm").serialize();

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

$(function() {
    let urlParams = new URLSearchParams(location.search);
    let teamId = urlParams.get("teamId");

    //grab course data and show
    let objs;
    let currMemberId;
    let action;

    $.getJSON("/api/teams/" + teamId, (data) => {
        objs = data;

        showData(objs)

        for(let i = 0; i < objs.Members.length; i++) {
            $("#removeMember" + objs.Members[i].MemberId).on("click", function() {
                currMemberId = objs.Members[i].MemberId;

                action = "remove";
                createRemoveModal(objs.Members[i]);
                $("#actionModal").modal(focus);
            });

            $("#editMember" + objs.Members[i].MemberId).on("click", function() {
                currMemberId = objs.Members[i].MemberId;

                action = "edit";
                createEditModal(objs.Members[i]);
                $("#actionModal").modal(focus);
            });
        }

    });

    //link to registration for current class
    $("#addMemberBtn").on("click", function() {
        location.href = "add_member.html?teamId=" + teamId;
    });

    //cancel back to courses
    $("#cancelBtn").on("click", function() {
        location.href = "teams.html";
    });

    $("#confirmModalBtn").on("click", function () {
        switch(action) {
            case 'edit':
                editMember(teamId, currMemberId);
                break;

            case 'remove': {
                removeMember(teamId, currMemberId);
                break;
            }
        }
    });
});