import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [allcounter, setAllCounter] = useState(0);
  const [comcounter, setComCounter] = useState(0);
  const [notcomcounter, setNotComCounter] = useState(0);

  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    if (todoStr === null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todoStr));
    }
  }, []);

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setAllCounter(todos.length);
    const todosNotCom = todos.filter((x) => x.completed === false);
    setNotComCounter(todosNotCom.length);
    const todosCom = todos.filter((x) => x.completed === true);
    setComCounter(todosCom.length);

    if (isFirst) {
      setIsFirst(false);
      return;
    }
    saveTodos();
  }, [todos]);

  const moveUp = (idx) => {
    if (todos[idx - 1] != null) {
      const newTodos = [...todos];
      const todo = newTodos[idx - 1];
      newTodos[idx - 1] = newTodos[idx];
      newTodos[idx] = todo;
      setTodos(newTodos);
      console.log("Moved Up");
    } else {
      alert("Cannot move further");
      return;
    }
  };

  const moveDown = (idx) => {
    if (todos[idx + 1] != null) {
      const newTodos = [...todos];
      const todo = newTodos[idx + 1];
      newTodos[idx + 1] = newTodos[idx];
      newTodos[idx] = todo;
      setTodos(newTodos);
      console.log("Moved Down");
    } else {
      alert("Cannot move lower");
      return;
    }
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };

  const saveTodos = () => {
    const todoStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todoStr);
  };

  const keyEnterHandler = () => {
    if (todoInput === "") {
      alert("Todo cannot be empty");
      return;
    } else {
      const newTodos = [{ title: todoInput, completed: false }, ...todos];
      setTodos(newTodos);
      setTodoInput("");
    }
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(event) => {
            setTodoInput(event.target.value);
          }}
          value={todoInput}
          onKeyUp={(e) => {
            if (e.key != "Enter") return;
            keyEnterHandler();
          }}
        />
        <div>
          {todos.map((todo, i) => (
            <Todo
              title={todo.title}
              completed={todo.completed}
              key={i}
              onDelete={() => deleteTodo(i)}
              onMark={() => markTodo(i)}
              onMoveUp={() => moveUp(i)}
              onMoveDown={() => moveDown(i)}
            />
          ))}
        </div>
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({allcounter}) </span>
          <span className="text-warning">Pending ({notcomcounter}) </span>
          <span className="text-success">Completed ({comcounter})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Rapepol Nanan 640610664
        </p>
      </div>
    </div>
  );
}
