const express = require("express")
const Post = require("../db-helpers")

const router = express.Router()

router.get("/", (req, res) => {
    Post.find(req)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Error retrieving the posts" })
        })
})

module.exports = router
