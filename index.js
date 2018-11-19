const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

const data = [
  { id: 1, superpower: "Transform into your self" },
  { id: 2, superpower: "Drink and stay sober" },
  { id: 3, superpower: "Clean room when clean" },
  { id: 4, superpower: "Sloth Movement" },
  { id: 5, superpower: "Sneeze at will" },
  { id: 6, superpower: "Partial Teleportation" }
];

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send({ data });
});

app.get("/:id", (req, res, next) => {
  var { id } = req.params;
  var filtered = data.filter(obj => {
    return obj.id == id;
  });
  res.send({ superpower: filtered });
});

app.post("/", (res, req, next) => {
  var { body } = req.params;
  var newObj = {
    id: data.length + 1,
    superpower: body.superpower
  };
  data.push(newObj);
  res.send({ superpower: newObj });
});

app.put("/:id", (req, res, next) => {
  var { id } = req.params;
  var { body } = req;

  var newArr = data.map(obj => {
    if (id == obj.id) {
      obj.superpower = body.superpower;
    }
    return obj;
  });
  data = newArr;
  res.send({ data });
});

app.listen(port);
