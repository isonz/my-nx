import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout-routes.module';
import { HeaderComponent } from './header/header.component';
import { SideComponent } from './side/side.component';
import { ContentComponent } from './content/content.component';
import { SideNodeComponent } from './side/side-node/side-node.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToggleComponent } from './toggle/toggle.component';

// 声明模块中拥有的视图类
const components = [
  LayoutComponent,
  HeaderComponent,
  TabsComponent,
  SideComponent,
  SideNodeComponent,
  ContentComponent,
  ToggleComponent
];

// 能够动态创建的视图类
const entryComponents = [
];

// 服务提供者
const providers = [
  // LayoutService
];

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutesModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  entryComponents: [
    ...entryComponents
  ],
  providers: [
    ...providers
  ]
})
export class LayoutModule { }
