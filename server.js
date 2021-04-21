var express = require('express');
var app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('./public'));

require('./routes/html')(app);
require('./routes/api')(app);

app.listen(PORT, ()=>{
    console.log('server started at port 8080')
});