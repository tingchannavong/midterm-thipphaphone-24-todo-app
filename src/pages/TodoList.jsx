import axios from 'axios'
import { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem';

function TodoList() {
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
    const id = 24; // to grab from zustand
    const TODO_API = `https://drive-accessible-pictures-send.trycloudflare.com/todos/${id}`;

    const fetchUserTodo = async () => {
        // do error handling later
        try {
            const res = await axios.get(TODO_API);
            // console.log(res);
            // console.log(res.data);

             if (res.status === 200) {
                setTodoItems(res.data)  
             }
        } catch (error) {
            console.log(error);
        }
    }
    fetchUserTodo();
    }, [])

  return (

    <div className="login-box mx-auto mt-25 p-5 w-xl h-auto bg-[#202936] text-xl rounded-md">
        <h1 className="text-white p-2 text-3xl">My Todo</h1>
        <form className="create-form w-full flex justify-between border-b border-b-gray-50 p-3">
            <input className='text-gray-100'
            type="text" 
            placeholder='new task' />
            <button className='h-10 w-20 text-center text-white bg-blue-400 rounded-xl px-4 py-2'>
                Add</button>
        </form>
        <section className="edit-block">
            {todoItems.map( obj => <TodoItem key={obj.id} data={obj}/>)}
        </section>
    </div>

  )
}

export default TodoList