
function TodoItem({data}) {
    const lineBlockStyles ="flex gap-3"
  return (
    <section className="todo-line flex justify-between py-3">
        <div className={lineBlockStyles}>
            <input type="checkbox" />
            <p className="text-gray-50">{data.content}</p>
        </div>
        <div className={lineBlockStyles}>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </section>
  )
}

export default TodoItem