#!/usr/bin/env node

const
    model = require("./model"),
    view = require("./view"),
    collections = require("./util/collections");
    
var onlyAlphabet = /^[A-Za-z\s\'\"\.]+$/;
    
var quarterbacks = collections
        .makeList("qb.json", model.makeQuaterbackFromJSON)
        .loadSync();

var team;
var menu = view.makeMenu("(1) Make team, (2) Show Team, (q) quit", /^[1-9q]$/);
menu.once('userInput', onUserInput);
menu.show();

function onUserInput(input) {
    switch (input) {
        case '1':
            makeTeam();
            break;
        case '2':
            console.log('showing team');
            break;
        case 'q':
            console.log('Thanks for playing Fantasy Football: shutting down...');
            process.exit(0);
        
    }
}

function makeTeam() {
    view.makeMultiInputMenu([
        {
            name: "ownerFirstName", 
            validator: onlyAlphabet,
            message: 'Enter the first name of your team\'s owner',
            required: true
        },
        {
            name: "ownerNameLast", 
            validator: onlyAlphabet,
            message: 'Enter the last name of your team\'s owner',
            required: true
        },
        {
            name: "teamName", 
            validator: onlyAlphabet,
            message: 'Enter the name of your team',
            required: true
            
        }])
        .onUserInput(function (input) {
            team = model.makeTeam(model.makePerson(input.ownerFirstName, input.ownerNameLast), input.teamName);
            draftQuaterback(team);
        })
        .show();
}

function draftQuaterback(team) {
    console.log('List of Quarterbacks');
    var table = view.makeTable(['No.:', 'Quarterback Name:']);
    table.show(prepareQuarterbacks(quarterbacks.values));
    view
        .makeMenu("Select by number, your Quarterback", /^[1-9]$/)
        .show()
        .once('userInput', function (input) {
            team.quarterback = quarterbacks.values[input-1];
            showTeam();
        });
}

function assignQuarterbackToTeam(quaterback, team) {
    team.quaterback = quaterback;
}

// this prepares qb data to be presented in the view //
function prepareQuarterbacks(values) {
    var prepared = [];
    var quarterback;
    for (var i = 0; i < values.length; i++) {
        quarterback = values[i];
        prepared.push([i+1, 
                      quarterback.person.name()]);
    }
    return prepared;
}

function showTeam() {
    console.log("Your Fantasy Team:");
    console.log(team.toString());
}