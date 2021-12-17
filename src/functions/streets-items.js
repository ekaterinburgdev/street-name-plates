const itemsjs = require('itemsjs');
const data = require('../../data/streets-lower.json');


export default function getStreetItems() {
    const streetItems = itemsjs(data, {
        sortings: {
            street_asc: {
                field: 'street_lower',
                order: 'asc'
            },
            type_asc: {
                field: 'type',
                order: 'asc'
            }
        },
        searchableFields: ['street_lower', 'type']
    });
    return streetItems;
}