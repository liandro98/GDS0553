import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products!: Producto[];

  clonedProducts: { [s: string]: Producto } = {};

  constructor(private producto: ProductoService, private fb : FormBuilder, private messageService: MessageService){}

  registerForm = this.fb.group({
    rqName:['', Validators.required],
    rqDescription:['', Validators.required],
    rqStock:['', Validators.required],
    rqType:['', Validators.required],
    rqPrice:['', Validators.required],
    rqProvaider:['', Validators.required],
    rqStatus:['', Validators.required]
  });

  ngOnInit(){
    this.producto.getProducts().subscribe(
      response => {
        console.log(response)
        this.products = response
      },
      error => console.log(error)
    )
  }

  get rqName(){
    return this.registerForm.controls['rqName'];
  }

  get rqDescription(){
    return this.registerForm.controls['rqDescription'];
  }

  get rqStock(){
    return this.registerForm.controls['rqStock'];
  }

  get rqType(){
    return this.registerForm.controls['rqType'];
  }

  get rqPrice(){
    return this.registerForm.controls['rqPrice'];
  }

  get rqProvaider(){
    return this.registerForm.controls['rqProvaider'];
  }

  get rqStatus(){
    return this.registerForm.controls['rqStatus']
  }

  onRowEditInit(product: Producto) {
        this.clonedProducts[product.id as string] = { ...product };
    }

    onRowEditSave(product: Producto) {

            delete this.clonedProducts[product.id as string];

            this.producto.updateProduct(product)

            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        
    }

    onRowEditCancel(product: Producto, index: number) {
        this.products[index] = this.clonedProducts[product.id as string];
        delete this.clonedProducts[product.id as string];
    }

  enviarDatos(){
    const data = {...this.registerForm.value};

    this.producto.registerProduct(data as Producto).subscribe(
      response => {
        console.log(response)
      },
      error => console.log(error)
    )
  }


}
