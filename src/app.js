
const express = require('express')
const bodyparser = require('body-parser')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


app.use('/', require('./routes'));

app.listen(PORT , () => {
    console.log(`server running in port ${PORT}`);
})