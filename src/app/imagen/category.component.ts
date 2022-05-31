import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImagenService } from '../services/imagen.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  imagen: File;
  imagenMin: File;

  categoryForm: FormGroup;

  constructor(
    private imagenService: ImagenService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuider: FormBuilder,
    private spinner: NgxSpinnerService
  ) { 
    this.categoryForm = this.formBuider.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      image: ['',Validators.required],
    })
  }

  ngOnInit() {
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
    this.imagenService.upload("/v1/category/image/", this.imagen).subscribe(
      data => {
        this.categoryForm.patchValue({image:data.imageUrl});
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
    if (!this.categoryForm.value.image) {
      alert("Por favor anexe uma imagem!")
      return;
    }
    const params = {
      code: this.categoryForm.value.code,
      description: this.categoryForm.value.description,
      image: this.categoryForm.value.image,
    };
    this.spinner.show();
    this.categoryService.save(params).subscribe(
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
    this.categoryForm.patchValue({
      code: '',
      description: '',
      image: '',
    })
  }

}
