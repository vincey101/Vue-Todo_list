import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'


const app = createApp(App)

//create store for the to do list items

const store = createStore({
    state() {
        return {
            todos: [

                { id: "fist-item", name: "first-todo-item", completed: false, location: "home" }
            ],
        }
    },
    getters: {
        todos(state) {
            return state.todos
        }

    },
    mutations: {
        loadStore() {
            if (localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                } catch (error) {
                    console.log('could not initialize store', error);
                }
            }
        },

        updateTodo(state, todoItem) {
            let id = todoItem.id;
            let name = todoItem.name;
            let completed = todoItem.completed;

            let findEl = state.todos.find((x) => x.id == id);
            if (findEl !== null) {
                if (completed !== undefined) {
                    findEl.completed = completed;
                }
                if (name !== undefined) {
                    findEl.name = name;
                }
            }
            else {
                console.log(`To Do List Item ${id} couldn't be found`);
            }
        },

        addTodo(state, todoItem) {
            if (todoItem.id !== undefined && typeof todoItem.name == 'string' && typeof todoItem.completed == "boolean") {
                state.todos.push({
                    id: todoItem.id,
                    name: todoItem.name,
                    commpleted: todoItem.completed,
                    location: "home"
                })
            }

        },
        deleteTodo(state, todoItem) {
            let id = todoItem.id;
            let removedEl = state.todos.findIndex((x) => x.id == id);
            if (removedEl !== null) {
                state.todos.splice(removedEl, 1);
            }
        },

        moveTodoItem(state, todoItem) {
            let id = todoItem.id;
            let location = todoItem.location;
            let findEl = state.todos.find((x) => x.id == id);

            if (findEl !== null) {
                findEl.location = location;
            }
            else {
                console.log(`To Do List Item ${id} couldn't be found`);
            }
        }
    },

});

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});

app.use(router)
app.use(store)
app.mount('#app')

// app.use(router).use(store).mount('#app')
