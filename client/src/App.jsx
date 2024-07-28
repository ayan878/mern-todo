import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import TodoList from "./components/TodoList";
import TodoListCompleted from "./components/TodoListCompleted";
import fetchTodo from "./api/readTodoRequest";
import { addTodo } from "./api/addTodo";
import { updateTodo } from "./api/updateTodoRequest";
import { deleteTodo } from "./api/deleteTodoList";

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showTodo, setShowTodo] = useState(true);

console.log(showTodo);

  // Fetch todos
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery("todos", fetchTodo);

  // Add a new todo
  const mutationAdd = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // Update a todo
  const mutationUpdate = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // Delete a todo
  const mutationDelete = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleAdd = () => {
    if (title && description) {
      mutationAdd.mutate({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  const handleComplete = (id) => {
    mutationUpdate.mutate(id, { completed: true });
  };

  const handleUncomplete = (id) => {
    mutationUpdate.mutate(id, { completed: false });
  };

  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);

  

  return (
    <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold p-8 flex justify-center items-center">
        My Todos
      </h1>
      <div className="bg-zinc-800 gap-4 p-6 md:h-44 w-fit">
        <div className="flex flex-col gap-4 border-b items-center border-gray-600 pb-4 sm:w-auto sm:flex-row sm:items-start">
          <div>
            <h3 className="text-white font-semibold">Title:</h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-72 p-2 placeholder-gray-400"
              placeholder="What's the title of your To Do"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white">Description:</h3>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-72 p-2 placeholder-gray-400"
              placeholder="What's the description of your To Do"
            />
          </div>
          <button
            className="font-bold text-white bg-green-700 w-full md:w-16 h-10 md:mt-6 mt-4"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className={`p-2 text-white font-semibold ${
              showTodo ? "bg-green-700" : "bg-zinc-600"
            }`}
            onClick={() => setShowTodo(true)}
          >
            To Do
          </button>
          <button
            className={`p-2 text-white font-semibold ${
              !showTodo ? "bg-green-700" : "bg-zinc-600"
            }`}
            onClick={() => setShowTodo(false)}
          >
            Completed
          </button>
        </div>
        {showTodo ? (
          <TodoList
            todos={activeTodos}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ) : (
          <TodoListCompleted
            todos={completedTodos}
            handleUncomplete={handleUncomplete}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
