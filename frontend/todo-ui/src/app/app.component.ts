import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoApiService, TodoItem } from './todo-api.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="container">
      <h1>TODO</h1>

     <form [formGroup]="form" (ngSubmit)="add()" class="row">
        <input
            formControlName="title"
            placeholder="Add a todo..."
        />
        <button type="submit" [disabled]="form.invalid || saving">Add</button>
      </form>

      <p *ngIf="error" class="error">{{ error }}</p>

      <ul>
        <li *ngFor="let t of todos">
          <span>{{ t.title }}</span>
          <button type="button" (click)="remove(t)" [disabled]="deletingId === t.id">
            Delete
          </button>
        </li>
      </ul>

      <p *ngIf="!loading && todos.length === 0">No items yet.</p>
    </main>
  `,
  styles: [`
    .container { max-width: 680px; margin: 40px auto; font-family: system-ui, sans-serif; }
    .row { display: flex; gap: 8px; }
    input { flex: 1; padding: 10px; }
    button { padding: 10px 12px; cursor: pointer; }
    ul { list-style: none; padding: 0; margin-top: 16px; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
    .error { color: #b00020; }
  `]
})
export class AppComponent implements OnInit {
  todos: TodoItem[] = [];
  loading = false;
  saving = false;
  deletingId: string | null = null;
  error: string | null = null;

  form = new FormGroup({
  title: new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(200)]
  })
});

 constructor(
  private api: TodoApiService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.error = null;

    this.api.getAll().subscribe({
        next: (items) => {
        this.todos = items;
        this.loading = false;
        this.cdr.detectChanges();   // 👈 ADD THIS
        },
        error: () => {
        this.error = 'Failed to load todos.';
        this.loading = false;
        this.cdr.detectChanges();   // 👈 ADD THIS
        }
    });
  }

  add(): void {    
    if (this.form.invalid) return;

    const value = this.form.controls.title.value.trim();
    if (!value) return;

    this.saving = true;
    this.error = null;

    this.api.create(value).subscribe({
      next: (created) => {
        this.todos = [created, ...this.todos];
        this.form.controls.title.setValue('');
        this.saving = false;
      },
      error: () => { this.error = 'Failed to add todo.'; this.saving = false; }
    });
  }

  remove(item: TodoItem): void {
    this.deletingId = item.id;
    this.error = null;

    this.api.delete(item.id).subscribe({
      next: () => {
        this.todos = this.todos.filter(x => x.id !== item.id);
        this.deletingId = null;
      },
      error: () => { this.error = 'Failed to delete todo.'; this.deletingId = null; }
    });
  }
}