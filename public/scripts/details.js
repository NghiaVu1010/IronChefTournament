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

function removeMember(teamId, memberId) {

    let serial = `teamid=${teamId}&memberid=${memberId}`;

    $.post(`/api/teams/${teamId}/members/${memberId}`, serial, function(data) {

    })
        .done(function() {
            alert("Deleted successfully!");
            location.reload();
            //location.href = "details.html?courseId=" + courseId;
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

    $.getJSON("/api/teams/" + teamId, (data) => {
        objs = data;

        showData(objs)

        for(let i = 0; i < objs.Members.length; i++) {
            $("#removeMember" + objs.Members[i].MemberId).on("click", function() {
                currMemberId = objs.Members[i].MemberId;

                $("#unregisterModal").modal(focus);
            });
        }
    });

    //link to registration for current class
    $("#registerBtn").on("click", function() {
        location.href = "register.html?courseId=" + courseId;
    });

    $("#deleteBtn").on("click", function() {
        alert("Coming soon");
    });

    //cancel back to courses
    $("#cancelBtn").on("click", function() {
        location.href = "teams.html";
    });

    $("#confirmModalBtn").on("click", function () {
        removeMember(teamId, currMemberId);
    });
});