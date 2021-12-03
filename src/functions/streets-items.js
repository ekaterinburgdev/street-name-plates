const itemsjs = require('itemsjs');
const data = require('../../data/streets.json');


export default function getStreetItems() {
    const streetItems = itemsjs(data, {
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