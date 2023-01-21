import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PreviewGalleryComponent, PreviewImage } from 'preview-gallery';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EditProduct, FormBreakPoints, FormProduct, Product } from 'src/app/shared/types/types';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [
    '../../styles/login-signup-form.scss',
    './add-product.component.scss'
  ]
})
export class AddProductComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("gallery") gallery!: PreviewGalleryComponent
  checkoutForm!: FormGroup;
  isButtonPressed: boolean = false;
  product!: Product;
  isHandset: boolean = false;
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL
  destroy$ = new Subject();
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private api: ApiService,
    private router: Router) {}

  ngOnInit(): void {
    this.product = history?.state?.product
    this.editMode = !!this.product
    this.subscribeWidthChange()
    this.setForm()
  }

  ngOnDestroy(): void {
    this.destroy$.next(null)
    this.destroy$.complete()
  }

  ngAfterViewInit(): void {
    if (this.product) {
      const imgs = this.product.images.map(img => ({
        id: img.id,
        path: img.image
      }))
      this.gallery.setUrls(imgs)
    }
  }

  getUpdatedImages(images: string[]): any {
    const productImages = this.product.images.map(img => img.image)
    const addedImages = images.filter(img => !productImages.includes(img))
    const deletedImages = productImages.filter(img => !images.includes(img))
    const deletedImageIds = this.product.images.map(img => {
      if(deletedImages.includes(img.image)) {
        return img.id
      }
      return
    }).filter(img => img)
    return {
      addedImages,
      deletedImageIds
    }
  }

  subscribeWidthChange() {
    this.store.pipe(
      select(getHandset),
      takeUntil(this.destroy$)
      ).subscribe((isHandset: boolean) => {
      this.isHandset = isHandset
      this.hostWidth = isHandset ? FormBreakPoints.SMALL : FormBreakPoints.LARDGE
    })
  }

  setForm(): void {
    if (this.product) {
      this.checkoutForm = this.fb.group({
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required],
        description: [this.product.description, Validators.required],
        images: [this.product.images.map(i => i.image)]
      })
    } else {
      this.checkoutForm = this.fb.group({
        name: [null, Validators.required],
        price: [null, Validators.required],
        description: [null, Validators.required],
        images: null
      })
    }
  }

  getSelectedImages(event: Array<PreviewImage>): void {
    this.checkoutForm.get("images")?.setValue(event.map(img => img.path))
  }

  editProduct(value: FormProduct): Observable<EditProduct> {
    const form: any = {
      id: this.product.id,
      ...value,
      imageData: this.getUpdatedImages(value.images)
    }
    delete form.images
    return this.api.editProduct(form);
  }

  sendForm(): void {
    this.isButtonPressed = true
    if(!this.checkoutForm.valid) return
    this.editMode ?
    this.editProduct(this.checkoutForm.value)
    .subscribe(() => {
      this.setForm();
      this.router.navigate(['/'])
    }):
    this.api.addNewProduct(this.checkoutForm.value)
    .subscribe(() => {
      this.setForm();
      this.router.navigate(['/'])
    })
  }
}
