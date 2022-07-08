import axios from 'axios';

//console.log(process.env);
var api_url = "";
if(process.env.NODE_ENV === "development"){
    api_url = process.env.REACT_APP_DEV_API_URL;
}/*else if(process.env.NODE_ENV === "production"){
    api_url = "/todos";
}*/
//console.log(api_url);

var token = localStorage.getItem('token');
var user_id = localStorage.getItem('user_id');

export const login = async (credentials) => {
    console.log(credentials);
    const response = await axios.post( api_url + 'users/login', {}, { headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, params: credentials,
    });
    console.log(response);
    user_id = response.data.id;
    token = response.data.token;
    console.log(user_id);
    return response;
}

export const getTodos = async () => {
    //token = tok;
    return axios.get( api_url + 'todos/fetchTodos/'+user_id, { headers: {
            'x-access-token': token
        }
    }).then((data) => {
        //console.log(data);
        return data;
    })
}

export const deleteTodo = async (task_id) => {
    //console.log("deleting task w/ id=" + id);
    return await axios.delete( api_url + 'todos/deleteTodo/'+task_id, { headers: {
            'x-access-token': token
        }
    }).then((data) => {
        //console.log(data);
        return data;
    })
}

export const addTodo = async (params) => {
    //console.log(parms);
    const { response } = await axios.post( api_url + 'todos/addTodo/'+user_id, {}, { headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': token
        }, params: params,
    });
    return response;
}

export const updateTodo = async (params) => {
    //console.log("updating todo w/ id=" + params.id, params);
    const { response } = await axios.put( api_url + 'todos/updateTodo/' + params.id, {}, { headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': token
        }, params: params,
    });
    return response;
}

export const completeTodo = async (params) => {
    console.log("toggle task complete:", params);
    const { response } = await axios.put( api_url + 'todos/completeTodo/' + params.id, {}, { headers : {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': token
        }, params: params
    });
    return response;
}