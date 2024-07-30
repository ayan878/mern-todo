import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../api/deleteTodoList";


export default function TodoListCompleted({todos}) {
  console.log("completed", todos);
  const queryClient=useQueryClient();

  // Delete a todo
  const mutationDelete = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };
  

  return (
    <ul className="w-full max-w-md mt-6">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="bg-zinc-800 p-4 mb-4 rounded flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">{todo.title}</h1>
            <h2 className="text-lg text-gray-400">{todo.desc}</h2>
            {/* Correct field name */}
          </div>
          <div className="flex gap-2">
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

