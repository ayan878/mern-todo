import { CircleCheck, Edit } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../api/updateTodoRequest";
import { useState } from "react";
import EditTodo from "./EditTodo";

export default function TodoList({ todos }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const queryClient = useQueryClient();

  // Mutation for updating todo
  const mutationUpdate = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // Handle marking todo as complete
//   const handleComplete = (id) => {
//     mutationUpdate.mutate({ id, updates: { completed: true } });
//   };

  const handleComplete=(id)=>{
    mutationUpdate.mutate(id);
  }

  // Handle opening the edit modal
  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedTodo(null);
  };

  return (
    <>
      {showEditModal && selectedTodo ? (
        <EditTodo
          todo={selectedTodo}
          onClose={closeEditModal}
          onSave={(updatedTodo) => {
            mutationUpdate.mutate({
              id: updatedTodo._id,
              updates: updatedTodo,
            });
            closeEditModal();
          }}
        />
      ) : (
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
                  onClick={() => handleEdit(todo)}
                />
                <CircleCheck
                  className={`text-green-500 cursor-pointer ${
                    todo.completed ? "opacity-50" : ""
                  }`}
                  onClick={() => handleComplete(todo._id)} // Pass only the id
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
