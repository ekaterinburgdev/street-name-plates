const nodemailer = require("nodemailer");
require('dotenv').config()
import validate from "../../src/functions/validation-info"


const RECEPIENTS = process.env.RECEPIENTS


let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 25,
  secure: false,
  auth: {
    user: process.env.MAIL_USR,
    pass: process.env.MAIL_PSW,
  },
});


//POST /request (user_data:
//{type: "улица", street_name: "Малышева", customer_name: "",
//number: 1, width: 1700, height: 320, contact: "",
//dismanting: false, mounting: false, color-code: #code})
export default function handler(req, res) {
  let body = "";
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
    !body.hasOwnProperty("communication") ||
    !body.hasOwnProperty("number") ||
    !body.hasOwnProperty("width") ||
    !body.hasOwnProperty("height") ||
    !body.hasOwnProperty("contact") ||
    !body.hasOwnProperty("dismanting") ||
    !body.hasOwnProperty("mounting") ||
    !body.hasOwnProperty("color-code")
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

  let price = validation_info["price"]
  const extra_options = []

  if (body["mounting"]) {
    price += 3000;
    extra_options.push("монтаж");
  }

  if (body["dismanting"]) {
    price += 3000;
    extra_options.push("демонтаж");
  }
  
  const text = `Поступила заявка на адресную табличку:
type: ${body["type"]}
${body["street_name"]}, ${body["number"]}
${validation_info["english_name"]}
${body["width"]} х ${body["height"]} мм
${body["color-code"]}

Историческое: ${validation_info["is_hist"] ? "да" : "нет"}

Опции:

${extra_options.length > 0 ? extra_options.join(', ') : "none"}

Цена:
${validation_info["price"]}

Контактное лицо:
${body["customer-name"]}
${body["communication"]}`;

  let mailOptions = {
    from: `"SNP-sender" <${process.env.MAIL_ADDR}>`,
    to: RECEPIENTS,
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
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    }
    console.log(info)
  });
  
  res.status(200).json(text);
}