import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/items.service';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  selectedVal: String = 'CPU';
  listCategory: any[]=[];
  form: FormGroup;

  ram: Boolean = false;
  mb: Boolean = false;
  cpu: Boolean = true;
  gpu: Boolean = false;
  
  constructor(
    private router: Router,
    private itemService: ItemsService,
    private platform: Platform,
    private toastCtrl: ToastController
  ){
    this.platform.ready().then(()=>{
      this.listCategory = [
        {
          type: 'CPU',
          name: 'CPU'
        },{
          type: 'RAM',
          name: 'RAM'
        },{
          type: 'Motherboard',
          name: 'Motherboard'
        },{
          type: 'GPU',
          name: 'GPU'
        }
      ]
    })
  }

  OnChange(event) {
    if (event.target.value === 'GPU'){
      this.gpu = true;
      this.ram = false;
      this.mb = false;
      this.cpu = false;
    } else if (event.target.value === 'RAM'){
      this.gpu = false;
      this.ram = true;
      this.mb = false;
      this.cpu = false;
    } else if (event.target.value === 'Motherboard'){
      this.gpu = false;
      this.ram = false;
      this.mb = true;
      this.cpu = false;
    } else {
      this.gpu = false;
      this.ram = false;
      this.mb = false;
      this.cpu = true;
    }
  }

  ngOnInit() {
    this.buildForm();
    this.setCategoryValidators();
    this.gpu = false;
  }

  buildForm() {
    this.form = new FormGroup( {
      img: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      brand: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      model: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      stock: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      chooseCategory: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      // CPU
      bClock: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      bstClock: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cCount: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tCount: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      // RMA
      speed: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      size: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      // Motherboard
      chipset: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      fCpu: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  setCategoryValidators() {
    // ram
    const speed = this.form.get('speed');
    const size = this.form.get('size');
    // cpu
    const bClock = this.form.get('bClock');
    const bstClock = this.form.get('bstClock');
    const cCount = this.form.get('cCount');
    const tCount = this.form.get('tCount');
    // mb
    const chipset = this.form.get('chipset');
    const fCpu = this.form.get('fCpu');

    if (this.gpu = true) {
      speed.setValidators(null);
      size.setValidators(null);
      bClock.setValidators(null);
      bstClock.setValidators(null);
      cCount.setValidators(null);
      tCount.setValidators(null);
      chipset.setValidators(null);
      fCpu.setValidators(null);
    } else if (this.cpu = true) {
      speed.setValidators(null);
      size.setValidators(null);
      chipset.setValidators(null);
      fCpu.setValidators(null);
    } else if (this.ram = true) {
      bClock.setValidators(null);
      bstClock.setValidators(null);
      cCount.setValidators(null);
      tCount.setValidators(null);
      chipset.setValidators(null);
      fCpu.setValidators(null);
    } else {
      speed.setValidators(null);
      size.setValidators(null);
      bClock.setValidators(null);
      bstClock.setValidators(null);
      cCount.setValidators(null);
      tCount.setValidators(null);
    }
  }

  onSubmit() {
    const bClock = this.form.value.bClock;
    const brand = this.form.value.brand;
    const bstClock = this.form.value.bstClock;
    const cCount = this.form.value.cCount;
    const chipset = this.form.value.chipset;
    const chooseCategory = this.form.value.chooseCategory;
    const fCpu = this.form.value.fCpu;
    const img = this.form.value.img;
    const model = this.form.value.model;
    const price = this.form.value.price;
    const size = this.form.value.size;
    const speed = this.form.value.speed;
    const stock = this.form.value.stock;
    const tCount = this.form.value.tCount;
    
    this.itemService.addItem(bClock, brand, bstClock, cCount, chipset, chooseCategory, fCpu, img, model, price, size, speed, stock, tCount);
    this.form.reset();
    this.router.navigate(['admin-page']);
    this.presentToast(model)
  }

  async presentToast(model) {
    const toast = await this.toastCtrl.create({
      message: 'Item '+model+' added.',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }
}
