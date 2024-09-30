"use client";
import React, { useEffect, useState } from "react";
interface TodoItem {
  id: number;
  todo: string;
  check: boolean;
}
export default function Home() {
  const [list, setList] = useState<TodoItem[]>(() => {
    const storedList = localStorage.getItem("TODO_LIST");
    return storedList ? JSON.parse(storedList) : {};
  });
  // const [checked, setChecked] = useState({});

  // useEffect(() => {
  //   setList(() => {
  //     const storedList = localStorage.getItem("TODO_LIST");
  //     return storedList ? JSON.parse(storedList) : {};
  //   });
  // }, []);

  console.log("list: ", list);

  useEffect(() => {
    localStorage.setItem("TODO_LIST", JSON.stringify(list));
  }, [list]);

  // useEffect(() => {
  //   setChecked(() => {
  //     const checkedList = JSON.parse(localStorage.getItem("checkStatus"));
  //     return checkedList || [];
  //   });
  // }, []);

  // console.log("checked: ", checked);

  // useEffect(() => {
  //   localStorage.setItem("checkStatus", JSON.stringify(checked));
  // }, [checked]);

  const addItem = (item: any) => {
    if (item.trim() !== "") {
      setList((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          todo: item.trim(),
          check: false,
        },
      ]);
    }
    console.log(list);
  };
  const handleKey = (e: any) => {
    if (e.keyCode === 13) {
      addItem(e.target.value);
      e.target.value = "";
    }
  };
  const delItem = (index: any) => {
    const updatedList = list.filter((_, k) => k !== index);
    setList(updatedList);
    console.log(list);
    // setChecked((prevChecked) => {
    //   const newChecked = { ...prevChecked };
    //   delete newChecked[index];
    //   return newChecked;
    // });
  };

  const isChecked = (index: any) => {
    setList((prev) =>
      prev.map((item, i) =>
        i == index ? { ...item, check: !item.check } : item
      )
    );
    // setChecked((prevChecked) => ({
    //   ...prevChecked,
    //   [index]: !prevChecked[index],
    // }));
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
      {/* <button
        onClick={addItem}
        className="todoAddBtn"
      >
        Add
      </button> */}
      <h2>
        {list.length > 0
          ? list.length + (list.length == 1 ? " task:" : " tasks:")
          : "No tasks pending."}
      </h2>
      <ul>
        {list.map((item, i) => (
          <li className="todoList" key={i}>
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
            <button onClick={() => delItem(i)} className="todoDelBtn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
