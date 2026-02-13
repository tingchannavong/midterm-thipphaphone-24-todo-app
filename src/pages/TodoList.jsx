import React from 'react'

function TodoList() {
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

        </section>
        {/* create block */}
        {/* fetch block */}
    </div>

  )
}

export default TodoList