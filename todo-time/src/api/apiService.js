import axios from 'axios';

console.log(process.env);
if(process.env.NODE_ENV === "development"){
    var api_url = process.env.REACT_APP_DEV_API_URL;
}else if(process.env.NODE_ENV === "production"){
    var api_url = process.env.REACT_APP_API_URL;
}

export const getTodos = () => {
    return axios.get(api_url+'/fetchTodos').then((data) => {
        console.log(data);
        return data;
    })
}

export const addTodo = async (parms) => {
    console.log(parms);
    const { response } = await axios.post(api_url+'/addTodo', {}, {headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, params: parms,
    });
    return response;
}