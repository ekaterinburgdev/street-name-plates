import getStreetItems from "../../src/functions/streets-items";


const streetItems = getStreetItems();

export default function handler(req, res) {
    if (!req.query.street) {
        res.status(400).json({});
        return;
    }

    const beginning = req.query.street.toLowerCase();
    let maximumSuggestions = 10;

    if (req.query.maximumSuggestions && Number.isInteger(req.query.maximumSuggestions)) {
        maximumSuggestions = req.query.maximumSuggestions;
    }

    const answer = streetItems.search({
        sort: 'street_asc',
        per_page: maximumSuggestions,
        filter: function(item) {
            return item.street_lower.slice(0, beginning.length) === beginning ;
          }
    });
    res.status(200).json({
        streets: answer.data.items
    });
}