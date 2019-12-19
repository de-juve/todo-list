import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'dmb-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoViewComponent implements OnInit {
  @Input() todo: ITodo;
  @Input() isFinishing: boolean;
  @Output() done = new EventEmitter<ITodo>();
  @Output() remove = new EventEmitter<number>();
  @Output() edit = new EventEmitter<ITodo>();
  @Output() cancelDone = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
