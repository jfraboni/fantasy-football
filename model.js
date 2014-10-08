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

function makeQbProfile(person, runningYards, passingYards) {
    var _profile = {
        person: person,
        runningYards: runningYards,
        passingYards: passingYards
    };
    return _profile;
}
module.exports.makeQbProfile = makeQbProfile;

function makeTeam(owner, qb) {
    var _team = {
        owner: owner,
        qb: qb,
    }
    return _team;
}
module.exports.makeTeam = makeTeam;

function makeQuiz(questions) {
    var _quiz = {
        questions: questions,
    };
    return _quiz;
}
module.exports.makeQuiz = makeQuiz;

function makeQuestion(question) {
    // declare a private variable within the factory closure //
    var _answer = false;
    
    var _question = {
        question:   question,
        
        setAnswer: function (answer) {
            if (typeof answer === 'boolean') {
                _answer = answer;
            }
        },
        getAnswer: function () {
            return _answer;
        }
    }
    return _question;
}
module.exports.makeQuestion = makeQuestion;

module.exports.makeQuestionFromJSON = function (data) {
    return makeQuestion(data);
}
