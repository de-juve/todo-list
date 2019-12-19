import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as Faker from 'faker';
import * as moment from 'moment';
import { ITodo } from '../../models/todo.model';
import { UtilService } from '../../services/util.service';
// @ts-ignore
Faker.locale = 'ru';



@Component({
  selector: 'dmb-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  list: ITodo[] = [];
  canAdd = true;
  showAdd: boolean;

  todo: ITodo;
  timerIds = new Map<number, number>([]);

  constructor(private chr: ChangeDetectorRef) { }

  ngOnInit() {
    this.generageTodos();
  }

  isSoon = (todo: ITodo) => moment(todo.date).isSameOrAfter(moment()) && moment(todo.date).diff(moment(), 'day') <= 3;
  isPast = (todo: ITodo) => moment(todo.date).isBefore(moment());

  trackById(index: number, item) {
    return item.name;
  }


  drop(dragDrop: CdkDragDrop<ITodo[], any>) {
    if (dragDrop.previousContainer.id === dragDrop.container.id) {
      moveItemInArray(
        dragDrop.container.data,
        dragDrop.previousIndex,
        dragDrop.currentIndex
      );
    }

  }

  onShowAdd() {
    if (!!this.todo) {
      return;
    }
    this.showAdd = true;
  }

  onEdit(item: ITodo) {
    this.showAdd = false;
    this.todo = !!item ? {...item} : null;
  }

  onCheckTodo(todo: ITodo) {
    if (todo.id && this.timerIds.has(todo.id)) {
      return;
    }
    this.timerIds.set(todo.id, setTimeout(() => this.doneTodo(todo), 700000));
  }

  onCancelDone(id: number) {
    if (this.timerIds.has(id)) {
      clearTimeout(this.timerIds.get(id));
      this.timerIds.delete(id);
    }
  }

  onAdd(todo: ITodo) {
    this.list.push(todo);
    this.showAdd = false;
  }

  onHideAdd() {
    this.showAdd = false;
  }

  onSave(todo: ITodo) {
    const indx = this.list.findIndex(n => n.id === todo.id);
    if (indx >= 0) {
      this.list[indx] = {...todo};
      this.list = [...this.list];
    }
    this.todo = null;
  }

  private doneTodo(todo: ITodo) {
    const indx = this.list.findIndex(n => n.id === todo.id);
    if (indx >= 0) {
      this.list.splice(indx, 1);
    }
  }

  private generageTodos() {
    for (let i = 0; i < 100; i++) {
      this.list.push({
        id: i,
        name: Faker.company.catchPhrase(),
        comment: `${Faker.company.catchPhraseDescriptor()} ${Faker.company.catchPhrase()}`,
        date: moment().add(UtilService.randomInt(-10, 10), 'days').toDate(),
        sort: i,
      })
    }
  }
}
