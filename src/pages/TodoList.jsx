import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import useUserStores from "../stores/todoStores";
import { array } from "zod";

function TodoList() {
  const user = useUserStores((state) => state.user); // grab user from zustand

  // For display
  const [todoItems, setTodoItems] = useState([]);
  const [addItem, setAddItem] = useState({ content: "" });

  // Get ID from global zustand
  const TODO_API = `https://drive-accessible-pictures-send.trycloudflare.com/todos/${user.userId}`;

  const fetchUserTodo = async () => {
    // do error handling later
    try {
      const res = await axios.get(TODO_API);
      // console.log(res);

      if (res.status === 200) {
        // console.log(res.data);
        setTodoItems(res.data);
      }
    } catch (error) {
      if (res.status == 429) {
        alert("Too many requests. Try again later.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTodo();
  }, []);

  const hdlIsDone = async (todoId, arrayIndex) => {
    // set new isDone value
    const newIsDoneValue = !todoItems[arrayIndex].isdone;

    // specify array index!!
    setTodoItems((prev) => {
      // create array 
      const newArray = [...prev];
      // update array object by create new objecct but change only one category/key
      newArray[arrayIndex] = {
        ...newArray[arrayIndex],
        "isdone": !newArray[arrayIndex].isdone
      };
      return newArray;
    });

    // change style of array is true
    // console.log(todoItems)

    // submit patch
    const UPDATE_API = `https://drive-accessible-pictures-send.trycloudflare.com/todos/${user.userId}/${todoId}`;

    try {
      const res = await axios.patch(UPDATE_API, 
        {
        "content" : todoItems[arrayIndex].content, 
        "isdone" : newIsDoneValue
        }
    );
      console.log(res);
    } catch (error) {
         console.log(error);
         console.log(error.response);
    }
  };

  const hdlChange = (e) => {
    const { name, value } = e.target;
    setAddItem({ ...addItem, [name]: value });
  };

  const hdlAdd = async (e) => {
    e.preventDefault();

    const ADD_API = `https://drive-accessible-pictures-send.trycloudflare.com/todos/${user.userId}`;

    try {
      const res = await axios.post(ADD_API, addItem);
      console.log(res);
      // res data is not always 200!! console.log alws please
      if (res.status === 201) {
        console.log("hurray added");
        fetchUserTodo();
        // clear data in add
        setAddItem({ content: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hdlDelete = async (userId, todoId) => {
    // send user id, send to do id
    const DELETE_API = `https://drive-accessible-pictures-send.trycloudflare.com/todos/${userId}/${todoId}`;

    try {
      const res = await axios.delete(DELETE_API);

      if (res.status === 200) {
        fetchUserTodo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-box mx-auto mt-25 p-5 w-xl h-auto bg-[#202936] text-xl rounded-md">
      <h1 className="text-white p-2 text-3xl">My Todo</h1>
      <form
        onSubmit={hdlAdd}
        className="create-form w-full flex justify-between border-b border-b-gray-50 p-3"
      >
        <input
          className="text-gray-100 p-1 w-100"
          type="text"
          placeholder="new task"
          name="content"
          value={addItem.content}
          onChange={hdlChange}
        />
        <button
          type="submit"
          className="h-10 w-20 text-center text-white bg-blue-400 rounded-xl px-4 py-2"
        >
          Add
        </button>
      </form>
      <section className="edit-block pt-5">
        {todoItems.map((obj, index) => (
          <TodoItem
            key={obj.id}
            data={obj}
            arrayIndex={index}
            hdlDelete={hdlDelete}
            hdlIsDone={hdlIsDone}
          />
        ))}
      </section>
      {/* <pre className="text-white">{JSON.stringify(todoItems, 0, 2)}</pre> */}
    </div>
  );
}

export default TodoList;
