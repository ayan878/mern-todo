import React, { useState } from "react";

function EditTodo({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.desc);

  const handleSave = () => {
    if (title && description) {
      onSave({ ...todo, title, description });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 rounded shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Todo</h2>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="What's the title of your To Do"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">
            Description:
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="What's the description of your To Do"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
