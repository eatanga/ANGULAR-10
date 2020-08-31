import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  @Input()
  product: Product;

  @Output()
  productDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit() {
  }
  deleteProduct() {
    this.httpClientService.deleteProduct(this.product.id).subscribe(
      (product) => {
        this.productDeletedEvent.emit();
        this.router.navigate(['admin', 'products']);
      }
    );
  }
  editProduct() {
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'edit', id: this.product.id } });
  }


}
