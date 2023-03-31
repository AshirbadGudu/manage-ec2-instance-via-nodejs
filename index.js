require("dotenv").config();

const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");

const app = express();

const ec2 = new AWS.EC2({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

app
  .use(cors())
  .use(express.json())
  .get("/start-server/:id", (req, res) => {
    ec2.startInstances({ InstanceIds: [req.params.id] }, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        res.json({ success: false });
      } else {
        console.log(data);
        res.json({ success: true });
      }
    });
  })
  .get("/stop-server/:id", (req, res) => {
    ec2.stopInstances({ InstanceIds: [req.params.id] }, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        res.json({ success: false });
      } else {
        console.log(data);
        res.json({ success: true });
      }
    });
  });

app.listen(8080, () => console.log(`🚀🚀🚀 http://localhost:${8080} 🚀🚀🚀`));
