var itemsjs = require('itemsjs');


export default function getStreetItems() {
    var data = require('../../data/hist-streets.json');
    var streetItems = itemsjs(data, {
        searchableFields: ['street_name', 'type', 'building_no']
    });
    return streetItems;
}