import axios from 'axios';

export const getTodos = () => {
    return axios.get('http://localhost:3001/todos/fetchTodos').then((data) => {
        console.log(data);
        return data;
    })
}

export const addTodo = async (parms) => {
    console.log(parms);
    const { response } = await axios.post(`http://localhost:3001/todos/addTodo`, {}, {headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, params: parms,
    });
    return response;
}