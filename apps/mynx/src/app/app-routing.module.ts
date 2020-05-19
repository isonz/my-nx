import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './public/app.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },   //懒加载，在根模块中未注册
  { path: 'admins', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule), canLoad: [AuthGuard]},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules,
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
