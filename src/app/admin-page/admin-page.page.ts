import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { IonItemSliding, AlertController, ToastController } from '@ionic/angular';
import { Motherboard, Ram, Cpu, Items } from '../items.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  cpus: Cpu[];
  rams: Ram[];
  mbs: Motherboard[];
  gpu: Items[];

  constructor(
    private itemService: ItemsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.cpus = this.itemService.getAllCpus();
    this.rams = this.itemService.getAllRams();
    this.mbs = this.itemService.getAllMbs();
    this.gpu = this.itemService.getAllGpu();
  }

  delete(item, slidingItem){
    slidingItem.close();
    const id = item.id;
    const category = item.category;
    this.itemService.deleteItem(id, category);
    this.router.navigate(['admin-page'])
    this.ionViewWillEnter()
    this.presentToast(item.model);
  }

  async presentAlert(item, slidingItem) {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Item',
      message: 'Apakah yakin ingin menghapus? Jika sudah dihapus, tidak bisa dikembalikan lagi.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => this.delete(item, slidingItem)
        }
      ]
    });
    await alert.present();
  }

  async presentToast(model) {
    const toast = await this.toastCtrl.create({
      message: 'Item '+model+' deleted.',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

}
