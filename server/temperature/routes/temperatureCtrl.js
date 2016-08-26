/**
 * Created by dcreey on 8/23/2016.
 */

var Path = require('Path');
var FileReader = require(Path.join(global.appRoot, 'helpers/FileReader'));
var Promise = require('bluebird');

var filePath = Path.join(global.appRoot ,"data/weather_data.csv");

var column;

module.exports = function () {
    return {
        // Get data from stream, transform it, and average temperatures by frequency
        getTemperatureData(frequency, columnName, toDate, fromDate) {
            column = columnName;
            return new Promise((res, rej) => {
                var fileReader = new FileReader(filePath);

                fileReader.getFile(transformTemperatureCSV).then((stream) => {
                    var dataArr = [];
                    stream.on("data", function(data){
                        dataArr.push(data);
                    })
                    stream.on("end", function() {
                        // This should occur as a db query
                        // We shouldn't need to read all of the data into memory
                        if (frequency) if (frequency !== "day") dataArr = average(dataArr, frequency);
                        dataArr = dataArr.filter((val) => {
                            return Date.parse(val.date) >= fromDate && Date.parse(val.date) < toDate
                        });
                        //dataArr = dataArr.filter((val) => { return Date.parse(val.date) < toDate });
                        // Send Data
                        // Ideally would stream to client - cannot here for reason above
                        res(dataArr);
                    })
                });
            })
        }
    }
};

// Private methods

// Calculate averages of temperatures by frequency
function average(arr, frequency) {
    var sums = {}, counts = {}, results = [], date;
    for (var i = 0; i < arr.length; i++) {
        if (frequency === "month") {
            arr[i].date.setDate(1);
            // set all days to first of the month
            date = arr[i].date;
        }
        else if (frequency === "week") {
            date = getFirstDayOfWeek(arr[i].date)
        }
        delete arr[i].date;

        if (!(date in sums)) {
            sums[date] = {};
            for (var p in arr[i]) sums[date][p] = 0;
            counts[date] = 0;
        }
        for (var p in arr[i]) sums[date][p] += parseFloat(arr[i][p]);
        counts[date]++;
    }

    for(date in sums) {
        var val = { date: Date.parse(date) };
        for (var p in sums[date]) val[p] = sums[date][p] / counts[date];
        results.push(val);
    }
    return results;
}

// calculate week number for passed date
function getFirstDayOfWeek(d) {
    // Copy date so don't modify original
    d.setHours(0,0,0);

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));

    // Return first day of week
    return d;
}

// pipe transform to modify csv stream
function transformTemperatureCSV(data) {
    for (var p in data) {
        var cleanedName = p.trim().toLowerCase();
        if (cleanedName === 'time')
            data['date'] = new Date(data[p] * 1000);
        else
            data[cleanedName] = data[p];
        delete data[p];
    }
    // return specific column with date
    if (column) {
        return {
            date: data.date,
            [column]: data[column]
        };
    }
    else return data;
}