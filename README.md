Fantasy Football
================

A simple node app allowing users to select a star QB as the beginning of creating their own fantasy football team!


**TODO** : We need to prepare our quarterback data data to be presented in the view:

```javascript
// TODO : Prepare our quarterback data data to be presented in the view //
function prepareQuarterbacks(values) {
    var prepared = [];
    var quarterback;
    for (var i = 0; i < values.length; i++) {
        quarterback = values[i];
        prepared.push([i+1, quarterback.person.name()]);
    }
    return prepared;
}
```