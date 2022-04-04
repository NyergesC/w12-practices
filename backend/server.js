const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req,resp,next)=>{   
    resp.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})
app.get('/kismacska', (req,resp,next)=>{   
    resp.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
})

app.get('/something', (req,resp,next)=>{
    console.log('request received on something endpoint');
    resp.send('Thank you for your request! This is our response for something endpoint')
})

//api/v1/users url alatt ez fog kiirodni
app.get('/api/v1/users', (req,resp,next)=>{
    console.log("Request received for users endpoint");
    resp.sendFile(path.join(`${__dirname}/../frontend/users.json`));


    /*     const users = [
        {
            name:"John",
            surname:"Doe",
            status:'active'

        },
        {
            name:"Sweety",
            surname:"Smith",
            status:'passive',

        }
    ] */

    //ha frontend oldalra elszeretnenk kuldeni akkor stringge kell alakitanunk
    
    /* resp.send(JSON.stringify(users)) */
})

app.get('/api/v1/users/active', (req,resp,next)=>{
    fs.readFile('../frontend/users.json',(error, data)=>{
        if(error){
            resp.send('Error happened')
        } else{
            const users = JSON.parse(data)
            const activeUsers = users.filter(user => user.status === "active")
            resp.send(activeUsers)
        }
    })
});
app.get('/api/v1/users/passive', (req,resp,next)=>{
    fs.readFile('../frontend/users.json',(error, data)=>{
        if(error){
            resp.send('Error happened')
        } else{
            const users = JSON.parse(data)
/*             const activeUsers = users.filter(user => user.status === "passive")
 */            resp.send(users.filter(user => user.status === "passive"))
        }
    })
});


app.use('/public', express.static(`${__dirname}/../frontend/public`));

const port = 9000;


app.listen(port, ()=>{
    console.log(`htttp://127.0.0.1:${port}`);
})
