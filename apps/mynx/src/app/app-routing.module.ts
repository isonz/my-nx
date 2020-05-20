import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { publicRouters } from './routes';



@NgModule({
  imports: [
    RouterModule.forRoot(
      publicRouters,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules,
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
