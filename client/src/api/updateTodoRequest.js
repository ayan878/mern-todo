// export default async function updateTodoList(id, updatedData) {
//   try {
//     // Send PUT request to update the todo
//     const response = await fetch(`http://localhost:3000/todos/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData), // Include updated data in request body
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Return the updated todo item or response JSON
//     const updatedTodo = await response.json();
//     return updatedTodo;
//   } catch (error) {
//     // Handle and log errors
//     console.error("Failed to update todo:", error);
//     throw error; // Optionally re-throw error if you want to handle it in the calling function
//   }
// }


export const updateTodo = async (todo) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title:todo.text,
        desc:todo.text,
        completed:todo.completed
    }),
  });
  if (!response.ok) {
    throw new Error("Error updating todo");
  }
  return response.json();
};