import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
})
export class RegistrationsComponent implements OnInit {
  allowNewServer = false;
  title = 'my-first-app';
  todos: Todo[];
  localItem: string = null;
  todaydate = new Date();
  jsonval = { name: 'Alex', age: '25', address: { a1: 'Paris', a2: 'France' } };
  months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 5000);
    this.localItem = localStorage.getItem('todos');
    if (this.localItem) {
      this.todos = JSON.parse(this.localItem);
    } else {
      this.todos = [];
    }
  }

  ngOnInit(): void {}
  deleteTodo(todo: Todo) {
    console.log(todo);
    // const index=this.todos.indexOf(todo);
    // this.todos.splice(index,1);
    //delete this.todos= this.todos[index];
    this.todos = this.todos.filter(function (value, index, arr) {
      return value.sno != todo.sno;
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  TodoAdd(todo: Todo) {
    this.todos.push(todo);
    console.log(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  checkToDo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
