import express from "express";

const app = express();
const port = 3000;

// Any data coming from JSON format from Frontend are accepted by the command
app.use(express.json());

let cardata = []
let nextID = 1

// Defining our home route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Defining a custom get route
app.get("/sample", (req, res) => {
  res.json({ message: "This is a sample response" });
});

// Defining a custom post route
app.post("/cars", (req, res) => {
  const {name, price} = req.body;
  const newCar = {id: nextID++, name, price};
  cardata.push(newCar);
  res.status(201).send(newCar);
});

app.get("/get-all-cars", (req, res) => {
    res.send(cardata);
})

// Dynamic route: Test it using postman after adding a new car by the post request
app.get("/car/:id", (req, res) => {
  const car = cardata.find(c => c.id === parseInt(req.params.id));
  if (!car) {
    return res.status(404).send({ message: "Car not found" });
  }
  res.send(car);
});

// Put request with dynamic route
app.put("/car/:id", (req, res) => {
  const carIndex = cardata.findIndex(c => c.id === parseInt(req.params.id));
  if (carIndex === -1) {
    return res.status(404).send({ message: "Car not found" });
  }
  const {name, price} = req.body;
  cardata[carIndex] = {...cardata[carIndex], name, price};
  res.send(cardata[carIndex]);
});

// Delete request with dynamic route
app.delete("/car/:id", (req, res) => {
  const carIndex = cardata.findIndex(c => c.id === parseInt(req.params.id));
  if (carIndex === -1) {
    return res.status(404).send({ message: "Car not found" });
  }
  cardata.splice(carIndex, 1);
  res.send({ message: "Car deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
