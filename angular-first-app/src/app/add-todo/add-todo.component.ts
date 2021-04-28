import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title: string;
  description: string;
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  onSubmit(form?: NgForm) {
    const todo = {
      sno: Math.floor(Math.random() * 100 + 1),
      title: this.title,
      description: this.description,
      active: true,
    };
    this.addTodo.emit(todo);
    form.reset();
  }
}
