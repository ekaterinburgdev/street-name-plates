import getStreetItems from "../../src/functions/streets-items";


const streetItems = getStreetItems();

export default function handler(req, res) {
    if (!req.query.street) {
        res.status(400).json({});
        return;
    }

    const beginning = req.query.street;
    var maximumSuggestions = 10;

    if (req.query.hasOwnProperty("maximumSuggestions")) {
        maximumSuggestions = req.query.maximumSuggestions;
    }

    var answer = streetItems.search({
        sort: 'street_asc',
        per_page: maximumSuggestions,
        filter: function(item) {
            return item.street.slice(0, beginning.length).toLowerCase() === beginning.toLowerCase() ;
          }
    });
    res.status(200).json({
        streets: answer.data.items
    });
}