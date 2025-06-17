import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: (newTodo: { title: string }) =>
      axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: newTodo.title,
        completed: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
      setShowForm(false);
    },
  });

  return (
    <div className="my-4">
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {showForm ? "Cancel" : "Add New Todo"}
      </button>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (title.trim()) {
              createTodo.mutate({ title });
            }
          }}
          className="mt-4 space-y-2"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new todo"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create Todo
          </button>
        </form>
      )}
    </div>
  );
}
