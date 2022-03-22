import { computed, ref } from 'vue'

export default function useTodos() {
  const title = ref('')
  const todos = ref([{ title:'学习Vue',done:false }])

  function addTodo () {
    todos.value.push({
      title: title.value,
      done: false
    })
    title.value = ''
  }

  function clear() { 
    todos.value = todos.value.filter((v) => !v.done);
  }

  const active = computed(() => todos.value.filter((v) => !v.done).length);
  const all = computed(() => todos.value.length);
  const allDone = computed({ 
    get: function () { 
      return active.value === 0; 
    }, 
    set: function (value) { 
      todos.value.forEach((todo) => { todo.done = value; }); 
    },
  });

  return { title, todos, addTodo, clear, active, all, allDone }
}
