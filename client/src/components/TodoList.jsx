
import { CircleCheck, Edit,} from "lucide-react";
import { useMutation } from "react-query";
import { updateTodo } from "../api/updateTodoRequest";



export default function TodoList({ todos }) {
  // Mutation for updating todo
  const { mutate: toggleCompletion } = useMutation(
    (todo) => updateTodo(todo._id, { completed: !todo.completed }),
    {
      onSuccess: () => {
        // Refetch or update query data after a successful mutation
      },
      onError: (error) => {
        console.error("Error updating todo:", error);
      },
    }
  );

  return (
    <ul className="w-full max-w-md mt-6 shadow-lg">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="bg-zinc-800 p-4 mb-4 rounded flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">{todo.title}</h1>
            <h2 className="text-lg text-gray-400">{todo.desc}</h2>
          </div>
          <div className="flex gap-2">
            <Edit
              className="text-white cursor-pointer"
              onClick={() => removeTodo(todo._id)}
            />
            <CircleCheck
              className={`text-green-500 cursor-pointer ${
                todo.completed ? "opacity-50" : ""
              }`}
              onClick={() => toggleCompletion(todo)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
