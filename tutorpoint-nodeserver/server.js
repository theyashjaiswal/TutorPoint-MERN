const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./api/routes/userRoute");
const mailRoute = require("./api/routes/mailRoute");
const courseRoute = require("./api/routes/courseRoute");
const loginRoute = require("./api/routes/loginRoute");
const workshopRoute = require("./api/routes/workshopRoute");
const workshopRegisterRoute = require("./api/routes/workshopRegisterRoute");
const tutorRoute = require("./api/routes/tutorRoute");
const appointmentRoute = require("./api/routes/appointmentRoute");
const tutorScheduleRoute = require("./api/routes/tutorScheduleRoute");
const passwordRoute = require("./api/controllers/passwordController");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://root:5709password@websample.1hjg2.mongodb.net/sampledb?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database Connected")
);

app.use(express.static(__dirname + "/build"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/mail", mailRoute);
app.use("/api/courses", courseRoute);
app.use("/api/tutorDetails", tutorRoute);
app.use("/api/tutorSchedule", tutorScheduleRoute);
app.use("/api/workshopDetails",workshopRoute);
app.use("/api/workshopRegisterDetails",workshopRegisterRoute);
app.use("/api/appointmentsForStudent",appointmentRoute);
app.use("/", loginRoute);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

console.log("runnning server now");
console.log(process.env.PORT);

app.listen(process.env.PORT || 8080);
