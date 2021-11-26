const nodemailer = require("nodemailer");
import validate from "../../src/functions/validation-info"


//the recepient of the letter mail address (only Yandex)
const RECEPIENT = "???"


let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 25,
  secure: false,
  auth: {
    user: "street.name.plates.sender",
    //need to hide password?
    pass: "0UFb5SLpZ3a2038qLfYuFIt6GdCFTgux",
  },
});


//POST /request (user_data: {type: "улица", street_name: "Малышева", customer_name: "", number: 1, width: 1700, height: 320, contact: "", dismanting: false, mounting: false})
export default function handler(req, res) {
  var body = ""
  try {
    body = JSON.parse(/({.+})/.exec(req.body)[1]);
  } catch (e) {
    res.status(400).json({ });
    return;
  }

  if (
    !body.hasOwnProperty("type") ||
    !body.hasOwnProperty("street_name") ||
    !body.hasOwnProperty("customer_name") ||
    !body.hasOwnProperty("number") ||
    !body.hasOwnProperty("width") ||
    !body.hasOwnProperty("height") ||
    !body.hasOwnProperty("contact") ||
    !body.hasOwnProperty("dismanting") ||
    !body.hasOwnProperty("mounting")
  ) 
  {
    res.status(400).json({ });
    return;
  }

  const validation_info = validate(body["type"], body["street_name"], body["number"])
  if (!validation_info["is_valid"]) {
    res.status(400);
    return;
  }

  var price = validation_info["price"]
  var extra_options = []

  if (body["mounting"]) {
    price += 3000;
    extra_options.push("mounting");
  }

  if (body["dismanting"]) {
    price += 3000;
    extra_options.push("dismanting");
  }
  
  const text = `type: ${body["type"]} 
street name: ${body["street_name"]}
building №: ${body["number"]}
width: ${body["width"]}
height: ${body["height"]}
extra_options: ${extra_options.length > 0 ? extra_options.join(', ') : "none"}
price: ${price}`;

  let mailOptions = {
    from: '"SNP-sender" <street.name.plates.sender@yandex.ru>',
    to: RECEPIENT,
    subject: `plate ${body["type"]} ${body["street_name"]}, ${body["number"]}`,
    text: text
    //this code can attach pdf file to letter
    /*attachments: [{
      filename: '1st-Chusovskoy-Lane-228.pdf',
      path: './data/1st-Chusovskoy-Lane-228.pdf',
      cid: '1st-Chusovskoy-Lane-228.pdf'
   }],*/
  };

  //the mail sender. don't use frequently, pls
  //don't forget to define the recepient at the top
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    }
    console.log(info)
  });
  
  res.status(200).json(text);
}