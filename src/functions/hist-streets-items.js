const itemsjs = require('itemsjs');
const data = require('../../data/hist-streets.json');


export default function getStreetItems() {
    const streetItems = itemsjs(data, {
        searchableFields: ['street_name', 'type', 'building_no']
    });
    return streetItems;
}