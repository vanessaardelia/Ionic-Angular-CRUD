import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  ram: Boolean = false;
  mb: Boolean = false;
  cpu: Boolean = true;
  gpu: Boolean = false;

  loadedItem: any;

  form: FormGroup;

  id: String;
  selectedVal: String;
  img: String;
  brand: String;
  model: String;
  price: Number;
  stock: Number;
  // CPU
  bClock: Number;
  bstClock: Number;
  cCount: Number;
  tCount: Number;
  // RAM
  speed: Number;
  size: Number;
  // Motherboard
  chipset: String;
  fCpu: String;


  constructor(
    private router: Router,
    private itemService: ItemsService,
    private activateRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ){}

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);

    this.loadedItem = this.itemService.getItem(id);

    this.id = this.loadedItem.id;
    this.selectedVal = this.loadedItem.category;
    this.img = this.loadedItem.image;
    this.brand = this.loadedItem.brand;
    this.model = this.loadedItem.model;
    this.price = this.loadedItem.price;
    this.stock = this.loadedItem.stock;

    if (id.substr(0,1) === 'c') {
      this.cpu = true;
      this.gpu = false;
      this.mb = false;
      this.ram = false;

      this.bClock = this.loadedItem.baseClock;
      this.bstClock = this.loadedItem.boostClock;
      this.cCount = this.loadedItem.coreCount;
      this.tCount = this.loadedItem.threadCount;
    } else if (id.substr(0,1) === 'r') {
      this.ram = true;
      this.mb = false;
      this.gpu = false;
      this.cpu = false;

      this.speed = this.loadedItem.speed;
      this.size = this.loadedItem.size;
    } else if (id.substr(0,1) === 'm') {
      this.mb = true;
      this.ram = false;
      this.gpu = false;
      this.cpu = false;

      this.chipset = this.loadedItem.chipset;
      this.fCpu = this.loadedItem.processor;
    } else {
      this.mb = false;
      this.ram = false;
      this.gpu = true;
      this.cpu = false;
    }
  }

  buildForm() {
    this.form = new FormGroup( {
      img: new FormControl( null, {
        updateOn: 'blur'
      }),
      brand: new FormControl( null, {
        updateOn: 'blur'
      }),
      model: new FormControl( null, {
        updateOn: 'blur'
      }),
      price: new FormControl( null, {
        updateOn: 'blur'
      }),
      stock: new FormControl( null, {
        updateOn: 'blur'
      }),
      // CPU
      bClock: new FormControl( null, {
        updateOn: 'blur'
      }),
      bstClock: new FormControl( null, {
        updateOn: 'blur'
      }),
      cCount: new FormControl( null, {
        updateOn: 'blur'
      }),
      tCount: new FormControl( null, {
        updateOn: 'blur'
      }),
      // RAM
      speed: new FormControl( null, {
        updateOn: 'blur'
      }),
      size: new FormControl( null, {
        updateOn: 'blur'
      }),
      // Motherboard
      chipset: new FormControl( null, {
        updateOn: 'blur'
      }),
      fCpu: new FormControl( null, {
        updateOn: 'blur'
      })
    });
  }

  onSubmit() {
    const id = this.loadedItem.id;
    const chooseCategory = this.loadedItem.category;

    const bClock = this.form.value.bClock;
    const brand = this.form.value.brand;
    const bstClock = this.form.value.bstClock;
    const cCount = this.form.value.cCount;
    const chipset = this.form.value.chipset;
    const fCpu = this.form.value.fCpu;
    const img = this.form.value.img;
    const model = this.form.value.model;
    const price = this.form.value.price;
    const size = this.form.value.size;
    const speed = this.form.value.speed;
    const stock = this.form.value.stock;
    const tCount = this.form.value.tCount;
    
    this.presentAlert(id, bClock, brand, bstClock, cCount, chipset, chooseCategory, fCpu, img, model, price, size, speed, stock, tCount);
  }

  async presentToast(model) {
    const toast = await this.toastCtrl.create({
      message: 'Item '+model+' is changed.',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(id, bClock, brand, bstClock, cCount, chipset, chooseCategory, fCpu, img, model, price, size, speed, stock, tCount) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Perubahan',
      message: 'Apakah yakin ingin menyimpan perubahan?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Simpan',
          handler: () => {
            this.itemService.editItem(id, bClock, brand, bstClock, cCount, chipset, chooseCategory, fCpu, img, model, price, size, speed, stock, tCount);
            this.router.navigate(['admin-page']);
            this.presentToast(model)
          }
        }
      ]
    });
    await alert.present();
  }
}
