import { Trash } from "lucide-react";


export default function TodoListCompleted(todos) {
 
console.log('completed',todos);

  const handleDelete = (id) => {
    // Implement the delete logic here
    // Example: call deleteTodo function and update the list
    console.log("Delete todo with id:", id);
  };

  return (
    <ul className="w-full max-w-md mt-6">
      {todos.map((todo) => (
        <li
          key={todo.id}
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

