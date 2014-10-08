#!/usr/bin/env node

const
    model = require("./model"),
    collections = require("./util/collections");
    
var quaterBacks = collections
        .makeList("qb.json", model.makePersonFromJSON)
        .loadSync();

console.log(quaterBacks.values);
    