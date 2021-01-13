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
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    Post.findById(id)
        .then(post => {
            if (!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get("/:id/comments", (req, res) => {
    const { id } = req.params
    Post.findPostComments(id)
        .then(comments => {
            if (!comments.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})


// router.post("/", (req, res) => {
//     Post.insert(req.body)
//         .then(post => {
//             res.status(201).json(post)
//         })
//         .catch(error => {
//             console.log(error)
//             res.status(500).json({ error: "There was an error while saving the post to the database" })
//         })
// })

module.exports = router
