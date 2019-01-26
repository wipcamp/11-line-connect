const express = require('express');
const path = require('path');
const axios = require('axios');
const qs = require('qs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').load();
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
                redirect_uri: process.env.PATH_FE,
                client_id: '1638650000',
                client_secret: '782fe647bb3279f92f1c16e1d12f4d67'
            }),
        }).catch(err => {
            return res.json('auth lineproblem')
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
        return res.json('auth lineproblem')
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

app.post('/api/sendAnswer',async (req,res)=>{
    try {
        await axios ({
            method: 'post',
            url: `${process.env.PATH_REGISTANCE}/answers/line/answerbyline`,
            headers: {
                'Authorization': `Bearer ${req.body.JWT}`,
                'Content-Type': 'application/json'
              },
              data:{
                question_id:req.body.questionid,
                ans_content:req.body.content
              }
        }).catch(err => {
            return res.json('getquestionsProblem')
        })
        return res.json({s:req.questionid})
    } catch (error) {
        return res.json('getquestionsProblem')
        
    }
   
})

app.post('/api/questions',async (req,res)=>{
    try {
        const getQuestion = await axios ({
            method: 'get',
            url: `${process.env.PATH_REGISTANCE}/questions`,
            headers: {
                'Authorization': `Bearer ${req.body.JWT}`,
                'Content-Type': 'application/json'
              }
        }).catch(err => {
            return res.json('getquestionsProblem')
        })
        let Question = getQuestion.data
        return res.json(Question)
    } catch (error) {
        return res.json('getquestionsProblem')
        
    }
    })

app.post('/api/question',async (req,res)=>{
    try {
        const getQuestion = await axios ({
            method: 'get',
            url: `${process.env.PATH_REGISTANCE}/questions/${req.body.questionid}`,
            headers: {
                'Authorization': `Bearer ${req.body.JWT}`,
                'Content-Type': 'application/json'
              }
        })
        const getAnswer = await axios ({
            method: 'get',
            url: `${process.env.PATH_REGISTANCE}/answers/line/${req.body.questionid}`,
            headers: {
                'Authorization': `Bearer ${req.body.JWT}`,
                'Content-Type': 'application/json'
              }
        })
        console.log(getAnswer)
        const Question = {
            question:getQuestion.data,
            answer:getAnswer.data
        }
        return res.json(Question)
        
    } catch (error) {
        return res.json('getquestionsProblem')
    }
        })

app.listen(port);

console.log('App is listening on port ' + port);
