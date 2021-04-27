import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() i: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheck: EventEmitter<Todo> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
  onClick(todo: Todo) {
    this.todoDelete.emit(todo);
    console.log('delete clicked... ');
  }
  onCheckClick(todo: Todo) {
    // console.log('clicked', todo);
    this.todoCheck.emit(todo);
  }
}
