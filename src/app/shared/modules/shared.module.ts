import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat-module';
import { HeaderComponent } from '../components/header/header.component';
import { ScannerTableComponent } from '../components/scanner-table/scanner-table.component';



@NgModule({
    declarations: [
        HeaderComponent,
        ScannerTableComponent
    ],
    imports: [
        CommonModule,
        MatModule
    ],
    exports: [MatModule,HeaderComponent, ScannerTableComponent]
})

export class SharedModule { }