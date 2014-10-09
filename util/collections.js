"use-strict";

const
    freezer = require("./freezer"),
    fs = require('fs'),
    deepExtend = require('deep-extend'),
    EventEmitter = require('events').EventEmitter;

/**
 * makeList A factory that returns an Array wrapper that supports serializing 
 * and deserializing.
 * @param {string} filepath The path to the file where the List data is 
 *      serialized.
 * @param {Function} deserialize A Function used to deserialize data loaded 
 *      from the filepath.

 * @extends {events.EventEmitter}
 */
function makeList(filepath, deserialize) {
    var _list = {
        filepath:    filepath,
        deserialize: deserialize,
        values:        [],
        
        add: function (item) {
            _list.values.push(item);
            return _list;
        },
        
        remove: function (item) {
            var index =_list.values.indexOf(item);
            if (index) {
                return _list.values.splice(index, 1)[0];
            }
            return null;
        },
        
        save: function () {
            fs.writeFile(_list.filepath, freezer.serialize(this.filepath, this.values), function (err) {
                if (err) throw err;
                console.log('List.save: List saved');
                _list.emit('saved');
            });
            return _list;
        },
        
        saveSync: function () {
            fs.writeFileSync(_list.filepath, freezer.serialize(_list.filepath, _list.values));
            console.log('List.saveSync: saved synchronously');
            return _list;
        },
        
        load: function (filepath) {
            filepath = filepath ? filepath : _list.filepath;
            fs.exists(filepath, function (exists) {
                if (exists) {
                fs.readFile(filepath, function (err, data) {
                        if (err) console.log(err);
                        var parsed;
                        try {
                            parsed = JSON.parse(data);
                        } catch (err) {
                            console.log('List.load > fs.fileRead : There was an error parsing JSON data:');
                            console.log(err);
                        }
                        if (parsed) {
                            for (var i = 0; i < parsed.length; i++) {
                                _list.values.push(_list.deserialize(parsed[i]));
                            }
                        }
                        _list.emit('loaded');
                    });     
                } else {
                    console.log('List.load: No file found at %s. Load complete.', filepath);
                    _list.emit('loaded');
                }
            });
            return _list;
        },
        
        loadSync: function (filepath) {
            filepath = filepath ? filepath : _list.filepath;
            if (fs.existsSync(filepath)) {
                var data = fs.readFileSync(_list.filepath);
                var parsed;
                try {
                    parsed = JSON.parse(data);
                } catch (err) {
                    console.log('List.load > fs.fileRead : There was an error parsing JSON data:');
                    console.log(err);
                }
                if (parsed) {
                    for (var i = 0; i < parsed.length; i++) {
                        _list.values.push(_list.deserialize(parsed[i]));
                    }
                }
            }
            return _list;
        }
    };
    deepExtend(_list, new EventEmitter());
    return _list;
}
module.exports.makeList = makeList;
