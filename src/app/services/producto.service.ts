import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  registerProduct(product: Producto) { 
    return this.http.post(this.baseUrl, product); 
  }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  updateProduct(producto: Producto): Observable<Producto> {
    const url = `${this.baseUrl}/${producto.id}`;
    return this.http.put<Producto>(url, producto);
  }

  deleteProduct(productId: string): Observable<any> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete(url);
  }
  
}
