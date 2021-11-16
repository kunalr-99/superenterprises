const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Setting our handlebars view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

// Handling routes
app.get("/", (req, res) => {
  res.render("main");
});

// Handling contact form
app.post("/send", (req, res) => {
  const output1 = `
  <h1>You have recieved a new quote from ${req.body.fname}</h1>
  <p>Details</p>
  <ul>
      <li>Email id: ${req.body.email}</li>
      <li>Contact: ${req.body.phone}</li>
      <li>Address: ${req.body.address}</li>
      <li>Landmark: ${req.body.landmark}</li>
  </ul>
  `;

  const output2 = `
  <h1>You just regsitered a new quote @Super Enterprises - Mosquito Netting Solutions</h1>
  <p>Details</p>
  <ul>
      <li>Email id: ${req.body.email}</li>
      <li>Contact: ${req.body.phone}</li>
      <li>Address: ${req.body.address}</li>
      <li>Landmark: ${req.body.landmark}</li>
  </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contact@superenterprisesnet.com", // generated ethereal user
      pass: "super@2021ent", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions1 = {
    from: '"Super Enterprises" <contact@superenterprisesnet.com>',
    to: `rautkunal52@gmail.com`,
    subject: "Hello ! You got a new quote hurray!",
    html: output1,
  };

  let mailOptions2 = {
    from: '"Super Enterprises" <contact@superenterprisesnet.com>',
    to: `${req.body.email}`,
    subject: "Hello ! Thank you for registering this quote",
    html: output2,
  };

  transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info.message);
    }
  });

  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info.message);
    }
  });

  res.render("main");
  res.redirect("/");
});
