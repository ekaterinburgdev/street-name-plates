const fs = require('fs');
const csv=require('csvtojson');
const { match } = require('assert');

csv()
.fromFile('hist-streets.csv')
.then((jsonObj)=>{

    fs.writeFile('hist-streets.json', JSON.stringify(jsonObj.filter(e => parseInt(e["№ п/п"]) >= 337 
    && parseInt(e["№ п/п"]) <= 1192 
    && e["Название улицы"] != ""
    && /\d/.test(e["Название улицы"])
    && ! /пл. 1905 года/.test(e["Название улицы"]))
    .map(function(e) {
        const res = {};

        if (/Верх-Исетский/.test(e["Название улицы"])) {
            m = /д. (\d+[-\d]*)$/.exec(e["Название улицы"]);
            res["type"] = "Бульвар";
            res["street_name"] = "Верх-Исетский";
            res["building_no"] = m[1];
            return res;
        }

        if (/Сибирский тракт/.test(e["Название улицы"])) {
            m = /(?:д\. )?(\d+[ ]?к?м?)$/.exec(e["Название улицы"]);
            res["type"] = "Тракт";
            res["street_name"] = "Сибирский";
            res["building_no"] = m[1];
            return res;
        }

        matches = /^(ул\.|пр\.|пер\.)\s+(.+),\s+(?:д\.\s+)?(\d+.*)$/.exec(e["Название улицы"]);
        if (matches === null) {
            res["type"] = "--------------------------------------------------";
            res["street_name"] = e["Название улицы"];
            res["building_no"] = "--------------------------------------------------";
            return res;
        }
        switch (matches[1]) {
            case "ул.":
                res["type"] = "Улица";
                res["street_name"] = matches[2];
                res["building_no"] = matches[3];
                break;
            case "пр.":
                res["type"] = "Проспект";
                res["street_name"] = matches[2];
                res["building_no"] = matches[3];
                break;
            case "пер.":
                res["type"] = "Переулок";
                res["street_name"] = matches[2];
                res["building_no"] = matches[3];
                break;
        }
        return res
    }), null, "   "), (err) => {
      
        if (err) throw err;
    });
});