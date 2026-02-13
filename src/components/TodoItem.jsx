
function TodoItem({data, hdlDelete}) {

    const lineBlockStyles ="flex gap-5"
  return (
    <section className="todo-line flex justify-between py-3 text-gray-50">
        <div className={lineBlockStyles}>
            <input type="checkbox" />
            <p className="">{data.content}</p>
        </div>
        <div className={lineBlockStyles}>
            <button className="rounded-md bg-gray-400 p-1 w-20 hover:bg-purple-300">
                Edit</button>
            <button className="w-10 h-10 rounded-full cursor-pointer hover:text-purple-500 hover:bg-white"
            onClick={() => hdlDelete(data.userId, data.id)} >
                X</button>
        </div>
    </section>
  )
}

export default TodoItem