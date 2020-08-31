import { Component, OnInit } from '@angular/core';
import {Product} from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Array<Product>
  productsRecieved: Array<Product>;
  selectedProduct: Product;
  action: string;

  constructor(private httpClientService: HttpClientService, private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(){
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
        // get the parameter id. this will be the id of the product whose details 
        // are to be displayed when action is view.
        const id = params['id'];
        // if id exists, convert it to integer and then retrive the product from
        // the products array
        if (id) {
          this.selectedProduct = this.products.find(product => {
            return product.id === +id;
          });
        }
      }
    );
  }

  // we will be taking the products response returned from the database
  // and we will be adding the retrieved   
  handleSuccessfulResponse(response) {
    this.products = new Array<Product>();
    //get products returned by the api call
    this.productsRecieved = response;
    for (const product of this.productsRecieved) {
    
      const productwithRetrievedImageField = new Product();
      productwithRetrievedImageField.id = product.id;
      productwithRetrievedImageField.name = product.name;
      //populate retrieved image field so that product image can be displayed
      productwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + product.picByte;
      productwithRetrievedImageField.brand = product.brand;
      productwithRetrievedImageField.price = product.price;
      productwithRetrievedImageField.picByte=product.picByte;
      this.products.push(productwithRetrievedImageField);
    }
  }


  addProduct() {
    this.selectedProduct = new Product();
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'add' } });
  }
  viewProduct(id: number) {
    this.router.navigate(['admin', 'products'], { queryParams: { id, action: 'view' } });
  }

}
