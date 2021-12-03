import getStreetItems from "../../src/functions/streets-items";
import getHistStreetItems from "../../src/functions/hist-streets-items";


const streetItems = getStreetItems();
const histStreetItems = getHistStreetItems();


export default function validate(type, street, building) {
    type = type[0].toUpperCase() + type.slice(1);
    street = street.split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ")

    const streetsInfo = streetItems.search({
        filter: function(item) {
            return item.street === street
            && item.type === type
          }
    }).data.items;

    if (streetsInfo.length === 0)
        return {
            is_hist: false,
            is_valid: false,
            english_name: "",
            price: 0
        }
    let isHist = false;
    let price = 0;
    const englishName = streetsInfo[0].english_name

    isHist = histStreetItems.search({
        filter: function(item) {
            return item.street_name === street 
            && item.type === type
            && item.building_no === building ;
        }
    }).data.items.length > 0;

    if (street.length <= 8)
        price = 4990
    else if (street.length > 8 && street.length <= 13)
        price = 7990
    else
        price = 11990

    return {
        is_hist: isHist,
        is_valid: true,
        english_name: englishName,
        price: price
    }
}