// middleware 
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__dirname)

const app=express()

