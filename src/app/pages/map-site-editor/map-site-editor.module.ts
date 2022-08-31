import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { IonicModule } from '@ionic/angular';
import { MapSiteEditorPageRoutingModule } from './map-site-editor-routing.module';
import { MapSiteEditorPage } from './map-site-editor.page';
import { SceneComponent } from './scene-component/scene.component';
import { LayoutComponent } from './layout-component/layout.component';
import { BannerSettingPanelComponent } from './banner-setting-panel/banner-setting-panel.component';
import { NgxPopperModule } from 'ngx-popper';
import { TabMenuScenesComponent } from './tab-menu-scenes/tab-menu-scenes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragAndDropModule,
    MapSiteEditorPageRoutingModule,
    NgxPopperModule.forRoot({
      hideOnClickOutside: false
    })
  ],
  declarations: [MapSiteEditorPage, SceneComponent, LayoutComponent, BannerSettingPanelComponent,TabMenuScenesComponent],
  entryComponents: [SceneComponent, LayoutComponent, BannerSettingPanelComponent,TabMenuScenesComponent]
})
export class MapSiteEditorPageModule {}
