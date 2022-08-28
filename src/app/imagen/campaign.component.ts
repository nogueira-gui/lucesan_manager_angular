import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImagenService } from '../services/imagen.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  imagen: File;
  imagenMin: File;

  campaignForm: FormGroup;

  constructor(
    private imagenService: ImagenService,
    private campaignService: CampaignService,
    private router: Router,
    private formBuider: FormBuilder,
    private spinner: NgxSpinnerService
  ) { 
    this.campaignForm = this.formBuider.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
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
    this.imagenService.upload("v1/campaign/image", this.imagen).subscribe(
      data => {
        console.log(data);
        this.campaignForm.patchValue({image:data.imageUrl});
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
    if(!this.campaignForm.value.image){
      alert("Por favor faça o upload da mensagem!");
      return;
    }
    const params = {
      description: this.campaignForm.value.description,
      name: this.campaignForm.value.name,
      image: this.campaignForm.value.image,
    };
    this.spinner.show();
    this.campaignService.save(params).subscribe(
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
    this.campaignForm.patchValue({
      description: '',
      name: '',
      image: '',
    })
  }

}
