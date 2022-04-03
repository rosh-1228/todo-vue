const app = Vue.createApp({
  data () {
    return {
      newTodo: '',
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  directives: {
    focus: {
      mounted (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo () {
      if (!this.newTodo.trim()) { return }
      const todoId = this.todos.length ? this.todos.slice(-1)[0].id + 1 : 1
      this.todos.push({
        id: todoId,
        content: this.newTodo,
        editable: false
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.newTodo = ''
    },
    edit (todo) {
      todo.editable = true
    },
    updateTodo (updateTodo) {
      updateTodo.editable = false
      if (updateTodo.content === '') { this.deleteTodo(updateTodo) }
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    deleteTodo (deleteTodo) {
      const deleteIndex = this.todos.findIndex(todo => {
        return todo === deleteTodo
      })
      this.todos = this.todos.filter((_, index) =>
        index !== deleteIndex
      )
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
})

app.mount('#app')
