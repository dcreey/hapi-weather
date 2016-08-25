/**
 * Created by dcreey on 8/24/2016.
 */

var FileReader = require('./FileReader');
var fileReader;

var Path = require('Path');
var filePath = Path.join(__dirname, "../data/weather_data.csv");

var expect = require('expect');

describe('Test FileReader helper class', function() {
    beforeEach(() => {
        fileReader = new FileReader(filePath);
    });

    it('should return stream', function(done) {
        fileReader.getFile().then((stream) => {
            expect(stream.readable).toBeTruthy();
            done();
        })
    });

    it('should return date data and min temperatures', function(done) {
        var stream = fileReader.getFile("min").then((stream) => {
            stream.on("Readable", function(item){
                expect(item.min).toBeTruthy();
                expect(item.date).toBeTruthy();
            });
            stream.on("end", function(){
                done();
            });
        })
    });
});