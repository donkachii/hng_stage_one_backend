const express = require("express");
const app = express();
const { lookup } = require("geoip-lite");

app.get("/api/hello", async (req, res) => {
  const visitor_name = req.query.visitor_name || "Daniel";
  const client_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const location = lookup(client_ip).city || "Abuja";
  const temperature = 11;

  console.log("Checking", lookup("154.120.71.51").city);

  res.json({
    client_ip: client_ip,
    location: location,
    greeting: `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celsius in ${location}`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.set("trust proxy", true);
