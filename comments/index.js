const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params
  res.send(commentsByPostId[id] || [])
})

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex")
  const { id } = req.params
  const { content } = req.body

  const comments = commentsByPostId[id] || []

  comments.push({ id: commentId, content })

  commentsByPostId[id] = comments

  await axios.post("http://localhost:4005/events", {
    type: "commentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
    },
  })

  res.status(201).send(comments)
})

app.post("/events", (req, res) => {
  console.log("Recieved event", req.body.type)
  res.send({})
})

app.listen(4001, () => {
  console.log("Listening on 4001")
})
