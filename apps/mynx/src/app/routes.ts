import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthComponent } from './public/no-auth/no-auth.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';

// 公共路由
export const publicRouters: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren:() => import('./layout/layout.module').then(m => m.LayoutModule), canActivateChild: [AuthGuard], canLoad: [AuthGuard] },   //懒加载，在根模块中未注册
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'no-auth', component: NoAuthComponent},
  { path: '**', component: PageNotFoundComponent  }
];


// Layout 公共路由
export const layoutRouters: Routes = [
  { path: '', component: LayoutComponent,
    children:[
      { path: 'dashboard', loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard] },
      { path: 'admins', loadChildren: () => import('./main/admins/admins.module').then(m => m.AdminsModule), canLoad: [AuthGuard]},
    ],
    canLoad: [AuthGuard]
  },
];
