import axios from 'axios';

//console.log(process.env);
var api_url = "";
if(process.env.NODE_ENV === "development"){
    api_url = process.env.REACT_APP_DEV_API_URL;
}else if(process.env.NODE_ENV === "production"){
    api_url = "/todos";
}
//console.log(api_url);

export const getTodos = () => {
    return axios.get( api_url + '/fetchTodos' ).then((data) => {
        //console.log(data);
        return data;
    })
}

export const deleteTodo = (id) => {
    //console.log("deleting task w/ id=" + id);
    return axios.delete( api_url + '/deleteTodo/' + id).then((data) => {
        //console.log(data);
        return data;
    })
}

export const addTodo = async (parms) => {
    //console.log(parms);
    const { response } = await axios.post( api_url + '/addTodo', {}, { headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, params: parms,
    });
    return response;
}

export const updateTodo = async (parms) => {
    //console.log("updating todo w/ id=" + parms.id, parms);
    const { response } = await axios.put( api_url + '/updateTodo/' + parms.id, {}, { headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, params: parms,
    });
    return response;
}

export const completeTodo = async (parms) => {
    console.log("toggle task complete:", parms);
    const { response } = await axios.put( api_url + '/completeTodo/' + parms.id, {}, { headers : {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, params: parms
    });
    return response;
}