"use client";
import React, { useEffect, useState } from "react";
interface TodoItem {
  id: number;
  todo: string;
  check: boolean;
}
export default function Home() {
  const [list, setList] = useState<TodoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage after component mounts (client-side only)
  useEffect(() => {
    const storedList = localStorage.getItem("TODO_LIST");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
    setIsLoaded(true);
  }, []);

  console.log("list: ", list);

  // Save to localStorage whenever list changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("TODO_LIST", JSON.stringify(list));
    }
  }, [list, isLoaded]);

  const addItem = (item: string) => {
    if (item.trim() !== "") {
      setList((prev) => [
        ...prev,
        {
          id: Date.now(), // Use timestamp for unique ID
          todo: item.trim(),
          check: false,
        },
      ]);
    }
  };

  const addItemFromInput = () => {
    const inputElement = document.getElementById("ip") as HTMLInputElement;
    if (inputElement && inputElement.value.trim() !== "") {
      addItem(inputElement.value);
      inputElement.value = "";
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      addItem(target.value);
      target.value = "";
    }
  };
  const delItem = (id: number) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    console.log(list);
  };

  const isChecked = (index: number) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, check: !item.check } : item
      )
    );
  };

  return (
    <div className="todo">
      <div>
        <h1 className="todoTitle">Todo List</h1>
        <input
          placeholder="write a task and press enter..."
          className="todoInput"
          id="ip"
          onKeyDown={handleKey}
        />
      </div>
      <button onClick={addItemFromInput} className="todoAddBtn">
        Add
      </button>
      <h2>
        {list.length > 0
          ? list.length + (list.length === 1 ? " task:" : " tasks:")
          : "No tasks pending."}
      </h2>
      <ul>
        {list.map((item, i) => (
          <li className="todoList" key={item.id}>
            <input
              className="checkStatus"
              type="checkbox"
              checked={item.check || false}
              // onClick={() => isChecked(i)}
              onChange={() => isChecked(i)}
            />
            {/* <p>{checked ? "ischecked":"notchecked"}</p> */}
            <span
              className={item.check ? "strike" : ""}
              onClick={() => isChecked(i)}
            >
              {item.todo}
            </span>
            <button onClick={() => delItem(item.id)} className="todoDelBtn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
