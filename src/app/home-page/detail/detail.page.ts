import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadedItem: any;

  ram: Boolean = false;
  mb: Boolean = false;
  cpu: Boolean = true;
  gpu: Boolean = false;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
  
  constructor(
    private itemService: ItemsService
  ) { }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  
  ngOnInit() {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);

    if (id.substr(0,1) === 'c') {
      this.cpu = true;
      this.gpu = false;
      this.mb = false;
      this.ram = false;
    } else if (id.substr(0,1) === 'r') {
      this.ram = true;
      this.mb = false;
      this.gpu = false;
      this.cpu = false;
    } else if (id.substr(0,1) === 'm') {
      this.mb = true;
      this.ram = false;
      this.gpu = false;
      this.cpu = false;
    } else {
      this.mb = false;
      this.ram = false;
      this.gpu = true;
      this.cpu = false;
    }

    this.loadedItem = this.itemService.getItem(id);
  }
}
