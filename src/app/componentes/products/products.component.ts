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
  products: Producto[] = [];
  clonedProducts: { [s: string]: Producto } = {};

  constructor(
    private producto: ProductoService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  registerForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    type: ['', Validators.required],
    price: ['', Validators.required],
    provaider: ['', Validators.required],
    status: ['', Validators.required]
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.producto.getProducts().subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.error('Error al cargar:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falla en la carga de los productos' });
      }
    );
  }

  get name() {
    return this.registerForm.controls['name'];
  }

  get description() {
    return this.registerForm.controls['description'];
  }

  get stock() {
    return this.registerForm.controls['stock'];
  }

  get type() {
    return this.registerForm.controls['type'];
  }

  get price() {
    return this.registerForm.controls['price'];
  }

  get provaider() {
    return this.registerForm.controls['provaider'];
  }

  get status() {
    return this.registerForm.controls['status'];
  }

  onRowEditInit(product: Producto) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Producto) {
    delete this.clonedProducts[product.id as string];

    this.producto.updateProduct(product).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Producto actuallizado' });
      },
      error => {
        console.error('Error updating product:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falla al cargar el producto' });
      }
    );
  }

  onRowEditCancel(product: Producto, index: number) {
    this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  enviarDatos() {
    const data = { ...this.registerForm.value };

    this.producto.registerProduct(data as Producto).subscribe(
      response => {
        this.loadProducts();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Producto registrado' });
      },
      error => {
        console.error('Error registering product:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el producto' });
      }
    );
  }

  deleteProduct(productId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.producto.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado exitosamente' });
        },
        error => {
          console.error('Error al eliminar el producto:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto' });
        }
      );
    }
  }

}
