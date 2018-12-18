const express = require('express');
const path = require('path');
const axios = require('axios');
const qs = require('qs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const cookie = require('js-cookie')

app.use(bodyParser.json())
app.use(cors())
// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.post('/api/auth', async (req, res) => {
    try {
        const line = await axios({
            method: 'post',
            url: 'https://api.line.me/oauth2/v2.1/token',
            withCredentials: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                grant_type: 'authorization_code',
                code: `${req.body.code}`,
                redirect_uri: 'https://localhost:3000',
                client_id: '1632037404',
                client_secret: 'bb4295842fe2321e03cc88c10a9b5a5c'
            }),
        }).catch(err => {
            console.log(err)
        })
        const profile = await axios({
            method: 'get',
            url: 'https://api.line.me/v2/profile',
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${line.data.access_token}` }
        })
        
        const lineProfile = { ...profile.data, accessToken: line.data.access_token };
        return res.json(lineProfile)
    } catch (error) {
        console.log(error)
    }
});
app.post('/api/loginfacebook', (req, res) => {
    axios({
        method: 'post',
        url: '/auth/login',
        data: qs.stringify({
            provider_name: 'facebook',
            provider_id: req.userID,
            accessToken: req.accessToken,
            userId: req.userId
        }),
    })
        .then(res => {

        }).catch(err => {
            console.log(err)
        })
});

// Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
