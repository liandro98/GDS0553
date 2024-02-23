import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule} from 'primeng/card';
import { InputTextModule  } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';


//Módulos PrimeNg
const modPrimeng: any = [
  CardModule,
  InputTextModule,
  ButtonModule,
  ToastModule
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modPrimeng
  ],
  exports:[
    modPrimeng //agregar el arreglo de componentes
  ]
})
export class PrimengModule { }
