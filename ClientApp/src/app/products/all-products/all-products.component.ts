import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, AfterViewInit {
  
  products: Product[] = [];
  displayedColumns = ['asin', 'title', 'price', 'BSR' ];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.dataSource.data = this.productsService.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
