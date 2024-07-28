// Define the fetchTodo function
const fetchTodo = () => {
  return fetch("http://localhost:3000/todos", {
    method: "GET", // HTTP method should be in quotes
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
};

// Export the function as default
export default fetchTodo;
