import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AccordionModule,
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { PagesModule } from '../pages/pages.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { DeltaIndicatorComponent } from './delta-indicator/delta-indicator.component';
import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import { EstimateTableComponent } from './estimate-table/estimate-table.component';


@NgModule({
  declarations: [
    DiscoverComponent,
    DeltaIndicatorComponent,
    EstimateTableComponent,
  ],
  imports: [
    DiscoverRoutingModule,
    AccordionModule,
    AlertModule,
    BadgeModule,
    CollapseModule,
    CommonModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    PagesModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    SpinnerModule,
    TableModule,
    SharedModule,
    WidgetsModule,
  ]
})
export class DiscoverModule {}
