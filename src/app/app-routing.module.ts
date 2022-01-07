import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//IMporting Guards
import { AutoLoginGuard } from './core/guard/auth-login/auto-login.guard';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { IntroGuard } from './core/guard/intro-guard/intro.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./shared/pages/auth/auth.module').then(m => m.AuthPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]   // Check if we should show the introduction or forward to inside
  },
  {
    path: 'intro',
    loadChildren: () => import('./shared/pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  // {
  //   path: 'setting',
  //   loadChildren: () => import('./shared/popover-controller/popover-routing.module').then(m => m.PopoverRoutingModule),
  // },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
