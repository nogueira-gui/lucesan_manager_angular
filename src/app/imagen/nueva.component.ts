import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImagenService } from '../services/imagen.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { CampaignService } from '../services/campaign.service';
import { Campaign } from '../models/campaign';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  imagen: File;
  imagenMin: File;

  productForm: FormGroup;

  categories: Category[] = [];
  campaigns: Campaign[] = [];

  constructor(
    private imagenService: ImagenService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private campaignService: CampaignService,
    private router: Router,
    private formBuider: FormBuilder,
    private spinner: NgxSpinnerService
  ) { 
    this.productForm = this.formBuider.group({
      name: ['', Validators.required],
      description: [''],
      category: ['',Validators.required],
      subCategory: [''],
      campaign: ['',Validators.required],
      images: ['',Validators.required],
      highlighted: [false,Validators.required],
      price: [0,Validators.required],
      quantity: [0, Validators.required],
      available: [true, Validators.required]
    })
  }

  ngOnInit() {
    this.categoryService.list().subscribe(
      data => {
        this.categories=data;
      }
    );
    this.campaignService.list().subscribe(
      data => {
        this.campaigns=data;
      }
    );
  }

  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    this.spinner.show();
    this.imagenService.upload("v1/product/image", this.imagen).subscribe(
      data => {
        this.productForm.patchValue({images:data.imageUrl});
        this.spinner.hide();
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  onSubmit(): void {
    if (!this.productForm.value.images) {
      alert("Por favor anexe uma imagem e clique em fazer upload")
      return;
    }
    const params = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      category: this.productForm.value.category,
      subCategory: this.productForm.value.subCategory,
      campaign: this.productForm.value.campaign,
      images: this.productForm.value.images,
      highlighted: this.productForm.value.highlighted,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      available: true,
    };
    this.spinner.show();
    this.productService.save(params).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/']);
      },
      err => {
        alert(err.message);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
    this.productForm.patchValue({
      name: '',
      description: '',
      category: '',
      subCategory: '',
      campaign: '',
      images: '',
      highlighted: false,
      price: 0,
      quantity: null,
      available: true,
    })
  }

  changeCategory(event: any): void {
    this.productForm.patchValue({category:event.target.value});
  } 

  navigateToCreateCategory(): void {
    this.router.navigate(['/category']);
  }

  changeCampaign(event: any): void {
    this.productForm.patchValue({campaign:event.target.value});
  } 

  navigateToCreateCampaign(): void {
    this.router.navigate(['/campaign']);
  }
}
