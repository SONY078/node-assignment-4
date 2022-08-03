const express = require('express');
const app = express()
app.use(express.json());
const check = require('./Routes/Check');

app.use('/auth',check)

app.get("/",function(rq,rs)
{
    // rs.send({
    //     message:"request received"
    // });
    rs.send('received')

})




app.listen(8080,function()
{
    console.log('application is running');
})