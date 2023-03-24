let express = require('express')
let fs = require('fs');
let path = require('path');
let app = express();


const filename = (now) => {
    const date = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()


    return `${date}-${hours}-${minutes}-${seconds}`;
}
const timestamp = (present) => {
    const year = present.getFullYear()
    const month = present.getMonth() + 1
    const date = present.getDate()
    const hours = present.getHours()
    const minutes = present.getMinutes()

    return (`${date}/${month}/${year} ${hours}:${minutes}`)
}


app.get('/', (req, res) => {

    const mydate = new Date();
    filename(mydate)
    timestamp(mydate)
    fs.mkdir(path.join(__dirname, `/${filename(mydate)}`), {}, err => {
        if (err) throw err;
        console.log('folder created')
    })
    fs.writeFile(path.join(__dirname, '/test', `${filename(mydate)}.txt`), `${timestamp(mydate)}`, (err, data) => {
        res.send("file is created")
        if (err) throw (err)
        console.log('file created successfully')

    })

})
app.listen(5000, () => { console.log('server is connected') })