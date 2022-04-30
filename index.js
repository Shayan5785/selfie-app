const express = require('express')
const dataStore = require('nedb')
const app = express();
const db = new dataStore('database.db')
db.loadDatabase()


app.listen(8000, console.log("Server__Running"))

app.use(express.static("public"))
app.use(express.json({ limit: "1mb" }))
const timestamp = Date.now()

app.get('/api', (req,res) =>{
    db.find({}, (err, data) => {
        if( err ) {
            res.end()
            return
        }
        res.json(data)
     } )

})

app.post('/api', (req,res) => {
    console.log(req.body)
    let data = req.body;
    data.timestamp = timestamp
    db.insert(data)
    res.json({
        status: 'success',
        latitude: data.lat ,
        longitude: data.log,
        mood: data.mood,
        image: data.image64,
        timestamp: timestamp,
    })
} )