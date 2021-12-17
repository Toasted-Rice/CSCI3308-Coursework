const express = require("express"); // npm install express
const app = express();
app.use(express.json());

const courses = [
  { title: "CSCI1300", id: 1 },
  { title: "CSCI2270", id: 2 },
  { title: "CSIC3308", id: 3 },
];

app.get("/", (req, res) => {
  res.send("Welcome to our REST API!");
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.post("/add_courses", (req, res) => {
  const course = {
    title: req.body.title,
    id: req.body.id,
  };
  courses.push(course);
  res.status(200).send(course);
});

app.post("/upper", (req, res) => {
  const { val } = req.body;
  if (typeof val != "string")
    return res.status(400).send("Invalid input, cannot make uppercase.");
  res.status(200).send({ val: val.toUpperCase() });
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
