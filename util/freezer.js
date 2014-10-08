'use-strict'

const
    csv = require('tsv').CSV;
    
/**
 * The serialize method is synchronous, and for 
 * csv, should not be used for large datasets.
 */
module.exports.serialize = function(filepath, object) {
    const extension = /\.[0-9a-z]+$/i.exec(filepath)[0];
    var serialized;
    switch(extension) {
        case ".json":
            serialized = JSON.stringify(object);
            break;
        case ".cvs":
            serialized = csv.stringify(object);
            break;
        default:
            console.log('serialize: %s is an unrecognized extension. Falling back on JSON pretty-printed!', extension);
            serialized = JSON.stringify(object, undefined, 2);
            break;
    }
    return serialized;
};
