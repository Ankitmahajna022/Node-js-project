import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const route = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
})

route.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"))
})

route.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/contact.html"))
})

export default route
