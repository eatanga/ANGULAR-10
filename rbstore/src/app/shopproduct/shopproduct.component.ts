import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shopproduct',
  templateUrl: './shopproduct.component.html',
  styleUrls: ['./shopproduct.component.css']
})
export class ShopproductComponent implements OnInit {

  products: Array<Product>;
  productsRecieved: Array<Product>;

  cartProducts: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit(){
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    //retrieve the cart item from local storage
    let data = localStorage.getItem('cart');
    //Convert to JSON if NULL else initialize as empty
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }
  }

  // Take the products response returned from the database
  // and add to the retrieved data  
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
      productwithRetrievedImageField.picByte = product.picByte;
      this.products.push(productwithRetrievedImageField);
    }
  }
  addToCart(productId) {
    //retrieve product from products array using the product id
    let product = this.products.find(product => {
      return product.id === +productId;
    });
    let cartData = [];
    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    // add the selected product to cart data
    cartData.push(product);
    //updated the cartProducts
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));
    //make the isAdded field of the data added to cart as true
    product.isAdded = true;
  }

  updateCartData(cartData) {
    this.cartProducts = cartData;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartProducts = [];
    localStorage.clear();
  }
}