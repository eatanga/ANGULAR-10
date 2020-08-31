package com.rbstore.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rbstore.db.ProductRepository;
import com.rbstore.model.Product;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "products")
public class ProductController {
	
	private byte[] bytes;
	
	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping("/get")
	public List<Product> getProducts() {
		return productRepository.findAll();
	}
	
	@PostMapping("/upload")
	public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		this.bytes = file.getBytes();
	}

	@PostMapping("/add")
	public void createProduct(@RequestBody Product product) throws IOException {
		product.setPicByte(this.bytes);
		productRepository.save(product);
		this.bytes = null;
	}
	
	@DeleteMapping(path = { "/{id}" })
	public Product deleteProduct(@PathVariable("id") long id) {
		Product product = productRepository.getOne(id);
		productRepository.deleteById(id);
		return product;
	}
	
	@PutMapping("/update")
	public void updateProduct(@RequestBody Product product) {
		productRepository.save(product);
	}

}
