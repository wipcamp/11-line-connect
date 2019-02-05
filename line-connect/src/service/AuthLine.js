import axios from 'axios';

const authline ={
    login : async (codeline) =>{
        const responseLine = await axios({
            method: 'post',
            url: `${window.env.PATH_BE}/auth`,
            data: {
              code: codeline,
            },
          })
           return responseLine.data
    }

}
export default authline;