import getStreetItems from "../../src/functions/streets-items";
import getHistStreetItems from "../../src/functions/hist-streets-items";


const streetItems = getStreetItems();
const histStreetItems = getHistStreetItems();

export default function handler(req, res) {
    if (!req.query.hasOwnProperty("type")
    || !req.query.hasOwnProperty("street") 
    || !req.query.hasOwnProperty("building")) {
        res.status(400).json({});
        return;
    }

    const street = req.query.street[0].toUpperCase() + req.query.street.slice(1);
    const building = req.query.building;
    const type = req.query.type[0].toUpperCase() + req.query.type.slice(1);

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

    res.status(200).json({
        is_hist: is_hist,
        is_valid: is_valid,
        price: price
    });
}