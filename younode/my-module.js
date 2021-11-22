const fs = require('fs');

module.exports = function(path, ext, handler){
    fs.readdir(path, (err, list) => {
        if(err){
            return handler(err);
        }else{
            let filteredList = [];
            list.forEach((element)=>{
                if(element.split('.')[1] === ext){ filteredList.push(element) }
            });
            return handler(null, filteredList);
        }
    });
}

/* 
'use strict'
    const fs = require('fs')
    const path = require('path')

    module.exports = function (dir, filterStr, callback) {
      fs.readdir(dir, function (err, list) {
        if (err) {
          return callback(err)
        }

        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })

        callback(null, list)
      })
    }
*/