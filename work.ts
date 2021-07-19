import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import alert from 'alert'
import path from 'path'
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

type content = {
    id: number
    pass:number
}

const content: string = fs.readFileSync('det.json', 'utf8')
const contentJson: content = JSON.parse(content)
const dataId:number = contentJson.id
const dataCode:number = contentJson.pass

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/home.HTML'))
})

app.get('/beforelogin', function (req, res) {
  alert('Please login to view profile')
  res.sendFile(path.join(__dirname, '/home.HTML'))
})

app.post('/index', function (req, res) {

    const id:number = Number(req.body.id)
    const code:number = Number(req.body.code)

    if( dataId === id && dataCode === code ){
        res.sendFile(path.join(__dirname, '/viewprofile.HTML'))
    }
     else { 
        alert('Please provide the corrct user id or password')
        res.sendFile(path.join(__dirname, '/home.HTML'))
    }
})

app.get('/afterlogin', function (req, res) {
  res.sendFile(path.join(__dirname, '/profile.HTML'))
})

app.get('/logout', function (req, res) {
  alert('Successfully logged out')
  res.sendFile(path.join(__dirname, '/home.HTML'))
})

app.listen(5000, function () {
  console.log('Node server is running..')
})
