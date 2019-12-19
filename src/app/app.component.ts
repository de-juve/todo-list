import { Component } from '@angular/core';

@Component({
  selector: 'dmb-root',
  template: `
      <main class="root-container">
          <dmb-todo-list></dmb-todo-list>
      </main>`,
  styles: []
})
export class AppComponent {
}
