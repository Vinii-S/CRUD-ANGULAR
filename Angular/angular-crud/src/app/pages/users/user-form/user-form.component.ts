import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { apiUsuarios } from '../../../services/api-usuarios'; // ajuste o nome/caminho se necessário
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <h2>{{ isEdit ? 'Editar' : 'Criar' }} Usuário</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Nome
        <input formControlName="nome" />
      </label><br/>
      <label>Idade
        <input type="number" formControlName="idade" />
      </label><br/>
      <label>Cidade
        <input formControlName="cidade" />
      </label><br/>
      <label>Estado
        <input formControlName="estado" />
      </label><br/>
      <label>Telefone
        <input formControlName="telefone" />
      </label><br/>
      <button type="submit" [disabled]="form.invalid">Salvar</button>
      <a routerLink="/usuarios">Voltar</a>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  form!: FormGroup; // será inicializado no ngOnInit
  isEdit = false;
  private currentId?: number;

  constructor(
    private fb: FormBuilder,
    private api: apiUsuarios, // ajuste se seu service tiver outro nome
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // inicializa o form aqui (evita uso de this.fb antes do constructor)
    this.form = this.fb.group({
      nome: ['', Validators.required],
      idade: [null, [Validators.required, Validators.min(0)]],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.currentId = Number(idParam);

      // tenta obter o usuário (se o mock não fornecer rota dinâmica,
      // você pode obter a lista inteira e filtrar localmente)
      this.api.getUser(this.currentId).subscribe({
        next: (user: User) => {
          // preencher form com os valores do user (tipos já corretos)
          this.form.patchValue({
            nome: user.nome,
            idade: user.idade,
            cidade: user.cidade,
            estado: user.estado,
            telefone: user.telefone
          });
        },
        error: err => {
          console.error('Erro ao obter usuário:', err);
          // fallback: se mock não suportar GET /usuarios/:id, considerar carregar lista e filtrar
        }
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    // normaliza/garante os tipos esperados pelo backend/Service
    const raw = this.form.value;
    const payload: Omit<User, 'id'> = {
      nome: String(raw.nome ?? ''),
      idade: Number(raw.idade ?? 0),
      cidade: String(raw.cidade ?? ''),
      estado: String(raw.estado ?? ''),
      telefone: String(raw.telefone ?? '')
    };

    if (this.isEdit && this.currentId != null) {
      // updateUser espera Partial<User> ou Omit<User,'id'> — se o service tiver tipo restrito, ajuste com cast
      this.api.updateUser(this.currentId, payload as Partial<User>).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: err => console.error('Erro ao atualizar usuário:', err)
      });
    } else {
      this.api.createUser(payload).subscribe({
        next: (res) => {
          console.log('Resposta do create:', res);
          this.router.navigate(['/usuarios']);
        },
        error: err => console.error('Erro ao criar usuário:', err)
      });
    }
  }
}
