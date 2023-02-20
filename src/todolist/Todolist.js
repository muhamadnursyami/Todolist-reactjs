import React, { useState } from "react";
import "./Todolist.css";
export default function Todolist() {
  const [activity, setActivity] = useState("");
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);
  const handleSumbitCreateAndEdit = (e) => {
    e.preventDefault();

    if (activity.length < 3)
      return alert("Di isi Dong bang, minimal 3 huruf bang ");

    if (edit.id) {
      const updateTodo = {
        ...todos,
        activity,
      };

      const indexEditTodo = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const updateDataTodo = [...todos];
      updateDataTodo[indexEditTodo] = updateTodo;

      setActivity("");
      setTodos(updateDataTodo);
      return handleCancel();
    }
    setTodos([...todos, { id: new Date(), activity, ceklis: false }]);
    setActivity("");
  };

  const handleDelete = (todoId) => {
    const result = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodos(result);
  };

  const handleEdit = (todo) => {
    setActivity(todo.activity);
    setEdit(todo);
  };
  const handleCancel = () => {
    setEdit({});
    setActivity("");
  };

  const handleCeklis = (todo) => {
    const ceklisUpdate = {
      ...todo,
      ceklis: todo.ceklis ? false : true,
    };
    const indexTodoState = todos.findIndex((todoIndex) => {
      return todo.id === todoIndex.id;
    });

    const updateTodoCeklis = [...todos];
    updateTodoCeklis[indexTodoState] = ceklisUpdate;
    setTodos(updateTodoCeklis);
    // handleDelete();
  };

  return (
    <div className="todo">
      <h3>Todolist</h3>

      <form onSubmit={handleSumbitCreateAndEdit}>
        <input
          placeholder="Enter your new todo"
          type="text"
          value={activity}
          onChange={(e) => {
            setActivity(e.target.value);
          }}
        />
        <button type="submit">
          {edit.id ? "Simpan Perubahan" : "Tambah "}
        </button>
        {edit.id && <button onClick={handleCancel}>Batal</button>}
      </form>

      {todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <div className="task">
              <p key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.ceklis}
                  onChange={handleCeklis.bind(this, todo)}
                />
                {todo.ceklis ? <strike>{todo.activity}</strike> : todo.activity}

                {todo.ceklis ? (
                  <>
                    ( Selesai )
                    <button onClick={handleDelete.bind(this, todo.id)}>
                      Hapus
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="tombol"
                      onClick={handleEdit.bind(this, todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="tombol-kanan"
                      onClick={handleDelete.bind(this, todo.id)}
                    >
                      Hapus
                    </button>
                  </>
                )}
              </p>
            </div>
          );
        })
      ) : (
        <p>
          <i>Data Kosong</i>
        </p>
      )}
    </div>
  );
}
