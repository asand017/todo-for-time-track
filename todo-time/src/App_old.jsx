import React, { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';
import TaskAdd from './tasks/TaskAdd';
import TaskList from './tasks/TaskList';
import axios from 'axios';

/*const instance = axios.create({
  baseURL: 'http://localhost:3001/todos',
  timeout: 1000
});

function App() {
  return (
    <div>
      <TaskAdd/>
      <TaskList/>
    </div>
  )
}*/

const queryClient = new QueryClient();

const instance = axios.create({
  baseURL: 'http://localhost:3001/todos',
  timeout: 1000
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

/*async function createFetchTodos() {
  const { data } = await axios.get('/');
  return data;
}

async function createPostTodos(dta) {
  const { data } = await axios.post('/addTodo', {
    firstName: 'Fred',
    lastName: 'Danny'
  })
  .then(function (response) {

  })
}*/

function Todos() {
  const queryClient = useQueryClient();

  const fetchTest = async () =>
    await (await fetch("http://localhost:3001/todos")).json();

  const fetchTodos = async () =>
    await (await fetch("http://localhost:3001/todos/fetchTodos")).json();

  async function postTodo(data) { 
    return await (await fetch("http://localhost:3001/todos/addTodo"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
    }).json();
  }

  
  const query = useQuery('todos', fetchTest);

  const getTodos = useQuery('getTodos', fetchTodos);

  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTodos')
    },
  })

  const tasks = useState([]);

  /*const { data, error, isError, isLoading } = useQuery(['todos'], createFetchTodos)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      {data.now}
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Add</button>
      </form>
    </div>
  )*/

  return (
    <div className="App">
      <header className="App-header">To-Do List</header>
      <div>
        {query.status === "error" && <div>{query.error.message}</div>}
        {query.status === "loading" && <div>Loading...</div>}
        {query.status === "success" && <div>{query.data.now}</div>}
      </div>

      <button onClick={() => {
        mutation.mutate({
          sally: "fuck you",
          name: "bitch nigger"
        })
      }}>
        Add Todo
      </button>
    </div>
  );
}

export default App;