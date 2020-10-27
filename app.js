const  express = require('express');
//Alteração II
const app = express();
const bodyParser= require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

require('./routes/cliente')(app);
require('./routes/usuario')(app);


app.get('/', (req,res)=>{
    res.status(200).send('Home');
});

app.listen(4000);

