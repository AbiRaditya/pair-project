var Filter = require('bad-words'),
    filter = new Filter();
 let obj = {
     test: `you fucking asshole`
 }
console.log(filter.clean(obj.test)) //Don't be an ******