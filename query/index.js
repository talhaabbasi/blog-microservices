const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser)
app.use(cors())

app.get("/posts", (req, res) => {})

app.post("/posts", (req, res) => {})

app.listen(4002, () => {
  console.log("Listening on 4002")
})
