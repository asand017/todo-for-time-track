import React, { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';
import Task from './tasks/Task';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  const queryClient = useQueryClient();
  const fetchTest = async () =>
    await (await fetch("http://localhost:3001/todos")).json();

  const query = useQuery('todos', fetchTest);

  const tasks = useState([]);

  useEffect(() => {
    console.log(query);
  }, [])

  return (
    <div className="App">
      <header className="App-header">To-Do List</header>
      
    </div>
  );
}

export default App;
