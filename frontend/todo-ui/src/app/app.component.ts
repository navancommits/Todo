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
      <h1 class="title">TODO List</h1>

      <form [formGroup]="form" (ngSubmit)="add()" class="form-row">
        <input
          formControlName="title"
          placeholder="Add a todo..."
          class="input"
        />
        <button type="submit" [disabled]="form.invalid" class="btn">
          Add
        </button>
      </form>

      <ul class="todo-list">
        <li *ngFor="let t of todos$ | async" class="todo-item">
          <span class="todo-text">{{ t.title }}</span>
          <button type="button" (click)="remove(t)" class="delete-btn">
            Delete
          </button>
        </li>
      </ul>

      <p *ngIf="(todos$ | async)?.length === 0" class="empty">
        No items yet.
      </p>
    </main>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 50px auto;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #ffffff;
    }

    .title {
      text-align: center;
      margin-bottom: 25px;
      font-weight: 600;
      color: #333;
    }

    .form-row {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border 0.2s ease;
    }

    .input:focus {
      outline: none;
      border-color: #1976d2;
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      background-color: #1976d2;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }

    .btn:hover:not(:disabled) {
      background-color: #155fa0;
    }

    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #eee;
      transition: background 0.2s ease;
    }

    .todo-item:hover {
      background: #f9f9f9;
    }

    .todo-text {
      font-size: 14px;
      color: #444;
    }

    .delete-btn {
      border: none;
      background: #e53935;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: background 0.2s ease;
    }

    .delete-btn:hover {
      background: #c62828;
    }

    .empty {
      text-align: center;
      margin-top: 15px;
      color: #777;
      font-size: 14px;
    }
  `]
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