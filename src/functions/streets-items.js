var itemsjs = require('itemsjs');


export default function getStreetItems() {
    var data = require('../../data/streets.json');
    var streetItems = itemsjs(data, {
        sortings: {
            street_asc: {
                field: 'street',
                order: 'asc'
            },
            type_asc: {
                field: 'type',
                order: 'asc'
            }
        },
        searchableFields: ['street', 'type']
    });
    return streetItems;
}