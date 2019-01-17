const express = require('express');
const path = require('path');
const axios = require('axios');
const qs = require('qs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = process.env.PORT_BE || 5000;
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
                redirect_uri: 'https://localhost:3002',
                client_id: '1638650000',
                client_secret: '782fe647bb3279f92f1c16e1d12f4d67'
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
            console.log(res)

        }).catch(err => {
            console.log(err)
        })
});

app.post('/api/test',(req,res)=>{
console.log('asdasdasdasdasd')
})

app.post('/api/questions',async (req,res)=>{
    console.log(req)
    const getQuestion = await axios ({
        method: 'get',
        url: `http://127.0.0.1:8001/api/questions`,
        headers: {
            'Authorization': `Bearer ${req.body.JWT}`,
            'Content-Type': 'application/json'
          }
    })
    let Question = getQuestion.data
    return res.json(Question)
    })

app.post('/api/question',async (req,res)=>{
        const getQuestion = await axios ({
            method: 'get',
            url: `http://127.0.0.1:8001/api/questions/${req.body.questionid}`,
            headers: {
                'Authorization': `Bearer ${req.body.JWT}`,
                'Content-Type': 'application/json'
              }
        })
        const getAnswer = await axios ({
            method: 'get',
            url: `http://127.0.0.1:8001/api/answers/${req.body.questionid}`,
            headers: {
                'Authorization': `Bearer ${req.body.JWT}`,
                'Content-Type': 'application/json'
              }
        })
        const Question = getQuestion.data
        console.log(getAnswer)
        return res.json(Question)
        })

app.listen(port);

console.log('App is listening on port ' + port);
