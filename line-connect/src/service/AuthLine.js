import axios from 'axios';

const authline ={
    login : async (tokenLine) =>{
          const profile = await axios({
            method: 'get',
            url: 'https://api.line.me/v2/profile',
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${tokenLine}` }
        })
        const lineProfile = { ...profile.data, accessToken: tokenLine };  
        return lineProfile.data; 
    }

}
export default authline;