import axios from "axios";

var api_url = "/";
if (process.env.NODE_ENV === "development") {
  api_url = process.env.REACT_APP_DEV_API_URL;
}

var token = localStorage.getItem("token");
var user_id = localStorage.getItem("user_id");

export const login = async (credentials) => {
  const response = await axios
    .post(
      api_url + "users/login",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: credentials,
      }
    )
    .catch((err) => console.log(err.toJSON()));
  user_id = response.data.id;
  token = response.data.token;
  return response;
};

export const register = async (reg) => {
  const response = await axios
    .post(
      api_url + "users/register",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: reg,
      }
    )
    .catch((err) => console.log(err.toJSON()));
  user_id = response.data.id;
  token = response.data.token;
  return response;
};

export const getTodos = async () => {
  return axios
    .get(api_url + "todos/fetchTodos/" + user_id, {
      headers: {
        "x-access-token": token,
      },
    })
    .then((data) => {
      return data;
    });
};

export const deleteTodo = async (task_id) => {
  return await axios
    .delete(api_url + "todos/deleteTodo/" + task_id, {
      headers: {
        "x-access-token": token,
      },
    })
    .then((data) => {
      return data;
    });
};

export const addTodo = async (params) => {
  const { response } = await axios.post(
    api_url + "todos/addTodo/" + user_id,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": token,
      },
      params: params,
    }
  );
  return response;
};

export const updateTodo = async (params) => {
  const { response } = await axios.put(
    api_url + "todos/updateTodo/" + params.id,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": token,
      },
      params: params,
    }
  );
  return response;
};

export const completeTodo = async (params) => {
  const { response } = await axios.put(
    api_url + "todos/completeTodo/" + params.id,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": token,
      },
      params: params,
    }
  );
  return response;
};
