import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public producto!: [
    id: string,
    Name: string,
    Description: string,
    Stock: string,
    type: string,
    price: string,
    provaider: string,
    status: boolean];

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerProduct(product : Producto){
    return this.http.post(`${this.baseUrl}/productos`,product);
  }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/productos`);
  }
  
  updateProduct(producto: Producto): Observable<Producto> {
    const url = `${this.baseUrl}/productos/${producto.id}`; // URL del producto específico a actualizar
    console.log(url)
    return this.http.put<Producto>(url, producto);
  }
  

}
