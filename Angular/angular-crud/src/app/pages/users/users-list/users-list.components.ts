import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { apiUsuarios } from '../../../services/api-usuarios';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Usuários</h2>
    <a routerLink="/usuarios/novo">Criar novo usuário</a>
    <div *ngIf="loading">Carregando...</div>
    <ul *ngIf="!loading && users.length">
      <li *ngFor="let u of users">
        <strong>{{ u.nome }}</strong> — {{ u.idade }} — {{ u.cidade }}/{{ u.estado }}
        <br />
        <small>{{ u.telefone }}</small>
        <br />
        <a [routerLink]="['/usuarios/', u.id]">Editar</a> |
        <a (click)="onDelete(u.id)" style="cursor:pointer; color:red">Excluir</a>
      </li>
    </ul>
    <p *ngIf="!loading && users.length === 0">Nenhum usuário encontrado.</p>
  `
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private api: apiUsuarios) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getUsers().subscribe({
      next: data => {
        this.users = data || [];
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onDelete(id: number) {
    if (!confirm('Deseja realmente excluir este usuário?')) return;

    // chama API (no mock server isso só retorna a resposta configurada)
    this.api.deleteUser(id).subscribe({
      next: () => {
        // atualizar UI localmente (já que mock não persiste)
        this.users = this.users.filter(u => u.id !== id);
      },
      error: err => console.error(err)
    });
  }
}
