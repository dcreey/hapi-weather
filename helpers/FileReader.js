/**
 * Created by dcreey on 8/24/2016.
 */

"use strict";

var Promise = require('bluebird');

var fs = require('fs');
//var csv = require('fast-csv');
var csv = require('csv');

class FileReader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    //return stream object
    getStream() {
        return new Promise((res, rej) => {
            this.checkIfFile(this.filePath).then((isFile) => {
                if (isFile)
                    res(fs.createReadStream(this.filePath));
                else
                    rej(console.error("File does not exist."));
            }).catch((e)=> {
                this.filePath = null;
                rej(console.error("File does not exist."));
            })
        })
    }

    //returns stream of file
    getFile(transformFunction, columnName) {
        return this.getStream().then((stream) => {
            //return stream.pipe(csv.parse({columns:true, trim:true}))
            //csv.parse(stream,{columns:true, trim:true}).then()
            //return csv.stringify(
            //    return csv.transform(stream,function(data){
            //        for (var p in data) {
            //            var cleanedName = p.trim().toLowerCase();
            //            if (cleanedName === 'time')
            //                data['date'] = new Date(data[p] * 1000);
            //            else
            //                data[cleanedName] = data[p];
            //            delete data[p];
            //        }
            //        // return specific column with date
            //        if (columnName) {
            //            return JSON.stringify({
            //                date: data.date,
            //                [columnName]: data[columnName]
            //            });
            //        }
            //        else return JSON.stringify(data);
            //    })
            //);
            return stream
                .pipe(csv.parse({columns:true, trim:true}))
                .pipe(csv.transform(transformFunction))
                //.pipe(csv.stringify({ header: true }));
        })
    }

    checkIfFile(file) {
        return new Promise((resolve, reject) => {
            return fs.stat(file, (err, stats) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        reject();
                    } else {
                        reject(err);
                    }
                }
                else resolve(stats.isFile());
            });
        });
    }
}

module.exports = FileReader;