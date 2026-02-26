import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TodoApiService, TodoItem } from './todo-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="container">
      <h1>TODO</h1>

      <form [formGroup]="form" (ngSubmit)="add()" class="row">
        <input formControlName="title" placeholder="Add a todo..." />
        <button type="submit" [disabled]="form.invalid">Add</button>
      </form>

      <ul>
        <li *ngFor="let t of todos$ | async">
          <span>{{ t.title }}</span>
          <button type="button" (click)="remove(t)">Delete</button>
        </li>
      </ul>
    </main>
  `
})
export class AppComponent implements OnInit {

  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  todos$ = this.todosSubject.asObservable();

  form = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  constructor(private api: TodoApiService) {}

  ngOnInit(): void {
    this.api.getAll().subscribe(items => {
      this.todosSubject.next(items);
    });
  }

  add(): void {
    if (this.form.invalid) return;

    const value = this.form.controls.title.value!;

    this.api.create(value).subscribe(created => {
      const current = this.todosSubject.value;
      this.todosSubject.next([created, ...current]);
      this.form.reset();
    });
  }

  remove(item: TodoItem): void {
    this.api.delete(item.id).subscribe(() => {
      const current = this.todosSubject.value;
      this.todosSubject.next(current.filter(x => x.id !== item.id));
    });
  }
}