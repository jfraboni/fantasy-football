'use-strict';

// TODO 1 : create the makePerson factory //
function makePerson(firstName, lastName) {
    var _person = {
        firstName:  firstName,
        lastName:   lastName,
        
        name:       function() { return _person.firstName + ' ' + _person.lastName; }
    };
    return _person;
}
module.exports.makePerson = makePerson;

module.exports.makePersonFromJSON = function (data) {
    return makePerson(data.firstName, data.lastName);
};

function makeQuaterback(person, passingYards, completions) {
    var _quarterback = {
        person: person,
        passingYards: passingYards,
        completions: completions,
        
        toString: function () {
            return "Name: " + person.name() + "\n\t" + "Passing Yards: " + passingYards + "\n\t" + "Completions: " + completions;
        },
    };
    return _quarterback;
}
module.exports.makeQuaterback = makeQuaterback;

module.exports.makeQuaterbackFromJSON = function (data) {
    return makeQuaterback(makePerson(data.person.firstName, data.person.lastName), data.stats.passingYards, data.stats.completions);
};

function makeTeam(owner, name) {
    var _team = {
        owner: owner,
        name: name,
        quarterback: null,
        
        toString: function () {
            return "Team: " + _team.name + "\n" + "Owner: " + _team.owner.name() + "\n" + "Quarterback:\n\t" + _team.quarterback.toString();
        },
    };
    return _team;
}
module.exports.makeTeam = makeTeam;