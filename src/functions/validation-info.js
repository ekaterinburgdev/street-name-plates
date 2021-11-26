import getStreetItems from "../../src/functions/streets-items";
import getHistStreetItems from "../../src/functions/hist-streets-items";


const streetItems = getStreetItems();
const histStreetItems = getHistStreetItems();


export default function validate(type, street, building) {
type = type[0].toUpperCase() + type.slice(1);
street = street[0].toUpperCase() + street.slice(1);

    const is_valid = streetItems.search({
        filter: function(item) {
            return item.street === street 
            && item.type === type
          }
    }).data.items.length > 0;

    var is_hist = false;
    if (is_valid){
        is_hist = histStreetItems.search({
            filter: function(item) {
                return item.street_name === street 
                && item.type === type
                && item.building_no === building ;
            }
        }).data.items.length > 0;
    }
    
    var price = 0;
    if (is_valid) {
        if (street.length <= 8)
            price = 4990
        else if (street.length > 8 && street.length <= 13)
            price = 7990
        else
            price = 11990
    }

    return {
        is_hist: is_hist,
        is_valid: is_valid,
        price: price
    }
}