import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'mock', renderMode: RenderMode.Server },
  { path: 'usuarios', renderMode: RenderMode.Server },
  { path: 'usuarios/novo', renderMode: RenderMode.Server },
  { path: 'usuarios/:id/editar', renderMode: RenderMode.Server }
];
