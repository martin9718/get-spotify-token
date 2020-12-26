const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

//Enable public folder
app.use(express.static(path.resolve(__dirname, '../public')));
const port = process.env.PORT || 3000;


//CORS
// Headers and CORS connfigurations
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.get('/spotify/token', async (req, res) => {
      const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', '753cc6f148a442e4a6e02af80ff3f83d');
        params.append('client_secret', '24d291a672804cd7a00d564f60e0fe9a');
        

        try{
            const {data} = await axios.post('https://accounts.spotify.com/api/token', params);
            res.json(data);
        }catch(err){
             res.json({
                err: {
                    message: 'The token was not generated'
                }
             });
        }
        
});



app.listen(port, () => {
    console.log('Listening to the port ', port);
});