import axios from 'axios';

console.log(process.env);
var api_url = "";
if(process.env.NODE_ENV === "development"){
    api_url = process.env.REACT_APP_DEV_API_URL;
}else if(process.env.NODE_ENV === "production"){
    api_url = "http://localhost:80/todos";
}
console.log(api_url);

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