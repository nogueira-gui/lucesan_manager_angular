import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleComponent } from './detalle.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Campaign } from '../models/campaign';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  campaigns: Campaign[] = [];
  campaign: any = []
  option: string = 'productOption';
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private campaignService: CampaignService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadProductList();
  }

  selectedOption(elementId: any): void {
    var elementRemove = document.getElementById(this.option);
    elementRemove.classList.remove('active');
    var element = document.getElementById(elementId);
    element.classList.add('active');
    this.option = elementId;
    if (!this.campaign.length && this.option === 'campaignOption') {
      // TODO call to backend to load banners list
      console.log("load campaign...");
    }
    if (!this.categories.length && this.option === 'categoryOption') {
      this.loadCategories();
    }
  }

  loadProductList(): void {
    this.productService.list().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  loadCategories(): void {
    this.categoryService.list().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  loadCampaigns(): void {
    this.campaignService.list().subscribe(
      data => {
        this.campaigns = data;
      }
    )
  }

  deleteProduct(id: number): void {
    this.spinner.show();
    this.productService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.loadProductList();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  deleteCategory(id: number): void {
    this.spinner.show();
    this.categoryService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.loadCategories();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  deleteCampaign(id: number): void {
    this.spinner.show();
    this.campaignService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.loadCampaigns();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  deactive(id: number): void {
    this.spinner.show();
    this.productService.deactive(id).subscribe(
      data => {
        this.spinner.hide();
        this.loadProductList();
      }, err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  active(id: number): void {
    console.log("ativar...")
    // this.spinner.show();
    // this.productService.delete(id).subscribe(
    //   data => {
    //     this.spinner.hide();
    //     this.loadProductList();
    //   }, err =>{
    //     this.spinner.hide();
    //     console.log(err);
    //   }
    // );
  }

  abrirModal(i: number): void {
    const modalRef = this.modalService.open(DetalleComponent);
    modalRef.componentInstance.index = i;
  }

}
