import { Component, OnInit } from '@angular/core';
import { Items, Cpu, Ram, Motherboard } from '../items.module';
import { ItemsService } from '../items.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  cpus: Cpu[];
  rams: Ram[];
  mbs: Motherboard[];
  gpu: Items[];
  grid: Boolean;

  constructor(
    private itemService: ItemsService
  ) { }

  ngOnInit() {
    this.grid = false;
  }

  ionViewWillEnter() {
    this.cpus = this.itemService.getAllCpus();
    this.rams = this.itemService.getAllRams();
    this.mbs = this.itemService.getAllMbs();
    this.gpu = this.itemService.getAllGpu();
  }

  changeLayout() {
    this.grid = !this.grid;
  }

}
