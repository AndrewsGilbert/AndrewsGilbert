
import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import alert from 'alert'
import path from 'path'
const app = express()
import cookieParser from 'cookie-parser'
app.use(cookieParser())

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
let auth:string = 'no'

app.get('/', function (req, res) {

    if(Object.keys(req.cookies).length !== 0){
        res.redirect('http://localhost:5001/index')
    }
    else{
        res.sendFile(path.join(__dirname, '/home.HTML'))
    }
})

app.get('/index', function (req, res) {

    if(Object.keys(req.cookies).length !== 0){
        res.sendFile(path.join(__dirname, '/viewprofile.HTML'))
    }
    else{
        res.sendFile(path.join(__dirname, '/home.HTML'))
    }
})

app.post('/index', function (req, res) {

    if(Object.keys(req.cookies).length !== 0){
        res.sendFile(path.join(__dirname, '/viewprofile.HTML'))
    }

    else if (auth === 'yes' ) {
        auth = 'no'
        res.sendFile(path.join(__dirname, '/home.HTML'))
    }
    else
    {
        if( dataId === Number(req.body.id) && dataCode === Number(req.body.code) ){
            res.cookie('data',{"Id":dataId,"pass":dataCode})
            console.log(dataId,dataCode)
            console.log(3)
            auth = 'yes'
            res.sendFile(path.join(__dirname, '/viewprofile.HTML'))
        }
        else {
            alert('Please provide the corrct user id or password')
            res.sendFile(path.join(__dirname, '/home.HTML'))
        }
    }
})

app.get('/index/detail', function (req, res) {
    if(Object.keys(req.cookies).length !== 0){
        res.sendFile(path.join(__dirname, '/profile.HTML'))
    }
    else{
        res.sendFile(path.join(__dirname, '/home.HTML'))
    }
  })

app.get('/logout', function (req, res) {
    res.clearCookie('data')
    alert('Successfully logged out')
    res.redirect('http://localhost:5001')
  })

app.listen(5001, function () {
  console.log('Node server is running..')
})

