import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataServiceService } from './../services/data-service.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
    ],
    providers: [DataServiceService]
})
export class SharedModule { }
