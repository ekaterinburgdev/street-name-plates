import validate from "../../src/functions/validation-info"


export default function handler(req, res) {
    if (!req.query.type
    || !req.query.street
    || !req.query.building) {
        res.status(400).json({});
        return;
    }

    const street = req.query.street;
    const building = req.query.building;
    const type = req.query.type;

    res.status(200).json(validate(type, street, building));
}