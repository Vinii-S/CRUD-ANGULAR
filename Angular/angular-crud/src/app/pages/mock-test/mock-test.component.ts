import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mock-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dados do Mock Server</h2>
    <pre *ngIf="resposta">{{ resposta | json }}</pre>
    <p *ngIf="erro" style="color:red;">{{ erro }}</p>
  `
})
export class MockTestComponent implements OnInit {
  resposta: any;
  erro = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://8b135bfb-9204-4df5-826c-963b46fe9aeb.mock.pstmn.io/teste')
      .subscribe({
        next: (data) => this.resposta = data,
        error: (err) => {
          console.error(err);
          this.erro = 'Erro ao buscar dados do mock';
        }
      });
  }
}
