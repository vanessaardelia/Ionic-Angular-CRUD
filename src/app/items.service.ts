import { Injectable } from '@angular/core';
import { Items, Cpu, Ram, Motherboard } from './items.module';
import { cpus } from 'os';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private cpus: Cpu[] = [
    {
      id: 'c1',
      category: 'CPU',
      model: 'i7-1065G7',
      brand: 'Intel',
      image: ['https://www.notebookcheck.net/fileadmin/_processed_/f/3/csm_Intel_10th_Gen_Core_i7_badge_f4602b745a.jpg'],
      price: 426000,
      stock: 10,
      baseClock: 1.30,
      boostClock: 300,
      coreCount: 4,
      threadCount: 8
    }
  ];

  private rams: Ram[] = [
    {
      id: 'r1',
      category: 'RAM',
      model: 'DDR4 TSUNAMI X RGB',
      brand: 'V-Gen',
      image: ['http://oc.jagatreview.com/wp-content/uploads/2018/05/Vgen_tsunamiX_RGB-500x265.jpg'],
      price: 560000,
      stock: 10,
      speed: 3600,
      size: 16
    }
  ];

  private mbs: Motherboard[] = [
    {
      id: 'm1',
      category: 'Motherboard',
      model: 'RICOH FB21-L2S',
      brand: 'Intel',
      image: ['https://cotscomputers.com/wp-content/uploads/2018/02/MilPAC-I-rugged-militart-computer-with-16-removable-drives-550x364.jpg'],
      price: 800000,
      stock: 10,
      chipset: 'C246',
      processor: '8th generation Intel® Core™ i7'
    }
  ];

  private gpu: Items[] = [
    {
      id: 'g1',
      category: 'GPU',
      model: 'GeForce RTX A',
      brand: 'NVIDIA',
      image: ['https://cdn.wccftech.com/wp-content/uploads/2019/07/GeForce_Super-2080S-4_1561506665-Custom-1-1030x687.jpg'],
      price: 500000,
      stock: 10
    }
  ];

  constructor() { }

  getAllCpus() {
    return this.cpus.filter(cpus => {
      return cpus.stock !== 0;
    });
  }

  getAllRams() {
    return this.rams.filter(rams => {
      return rams.stock !== 0;
    });
  }

  getAllMbs() {
    return this.mbs.filter(mbs => {
      return mbs.stock !== 0;
    });
  }

  getAllGpu() {
    return this.gpu.filter(gpu => {
      return gpu.stock !== 0;
    });
  }

  getItem(itemId: String){
    if (itemId.substr(0,1) === 'c') {
      return this.cpus.find(cpus => {
        return cpus.id === itemId;
      });
    } else if (itemId.substr(0,1) === 'r') {
      return {...this.rams.find(rams => {
        return rams.id === itemId;
      })};
    } else if (itemId.substr(0,1) === 'm') {
      return {...this.mbs.find(mbs => {
        return mbs.id === itemId;
      })};
    } else {
      return {...this.gpu.find(gpu => {
        return gpu.id === itemId;
      })};
    }
  }

  deleteItem(id, category) {
    if (category === 'CPU') {
      this.cpus = this.cpus.filter(cpu => {
        return cpu.id != id;
      });
    } else if (category === 'RAM') {
      this.rams = this.rams.filter(rams => {
        return rams.id !== id;
      });
    } else if (category === 'Motherboard') {
      this.mbs = this.mbs.filter(mbs => {
        return mbs.id !== id;
      });
    } else {
      this.gpu = this.gpu.filter(gpu => {
        return gpu.id !== id;
      });
    }
  }

  addItem(bClock, brand, bstClock, cCount, chipset, chooseCategory, fCpu, img, model, price, size, speed, stock, tCount){
    if (chooseCategory === 'CPU'){
      if(img.includes(",")) {
        img = img.split(",");
        for(var i = 0; i<img.length; i++){
          img[i]= img[i].trim()
        }
      } else {
        img = img.split(" ")
      }
      const id = 'c'+(this.cpus.length+1);
      this.cpus.push({
        id: id,
        category: chooseCategory,
        model: model,
        brand: brand,
        image: img,
        price: price,
        stock: stock,
        baseClock: bClock,
        boostClock: bstClock,
        coreCount: cCount,
        threadCount: tCount
      });
    } else if (chooseCategory === 'RAM'){
      if(img.includes(",")) {
        img = img.split(",");
        for(var i = 0; i<img.length; i++){
          img[i]= img[i].trim()
        }
      } else {
        img = img.split(" ")
      }
      const id = 'r'+(this.cpus.length+1);
      this.rams.push({
        id: id,
        category: chooseCategory,
        model: model,
        brand: brand,
        image: img,
        price: price,
        stock: stock,
        speed: speed,
        size: size
      });
    } else if (chooseCategory === 'Motherboard'){
      if(img.includes(",")) {
        img = img.split(",");
        for(var i = 0; i<img.length; i++){
          img[i]= img[i].trim()
        }
      } else {
        img = img.split(" ")
      }
      const id = 'm'+(this.cpus.length+1);
      this.mbs.push({
        id: id,
        category: chooseCategory,
        model: model,
        brand: brand,
        image: img,
        price: price,
        stock: stock,
        chipset: chipset,
        processor: fCpu
      })
    } else {
      if(img.includes(",")) {
        img = img.split(",");
        for(var i = 0; i<img.length; i++){
          img[i]= img[i].trim()
        }
      } else {
        img = img.split(" ")
      }
      const id = 'g'+(this.cpus.length+1);
      this.gpu.push({
        id: id,
        category: chooseCategory,
        model: model,
        brand: brand,
        image: img,
        price: price,
        stock: stock
      })
    }
  }

  editItem(id, bClock, brand, bstClock, cCount, chipset, chooseCategory, fCpu, img, model, price, size, speed, stock, tCount){
    if (chooseCategory === 'CPU'){
      for(var i = 0; i<this.cpus.length; i++){
        if(this.cpus[i].id == id) {
          this.cpus[i].model = model
          this.cpus[i].brand = brand
          this.cpus[i].image = img

          if(img.includes(",")) {
            img = img.split(",");
            for(var j = 0; j<img.length; j++){
              img[j] = img[j].trim()
              this.cpus[i].image = img
            }
          } else {
            const hasil = new Array();
            hasil.push(img)
            this.cpus[i].image = hasil
          }

          this.cpus[i].price = price
          this.cpus[i].stock = stock
          this.cpus[i].baseClock = bClock
          this.cpus[i].boostClock = bstClock
          this.cpus[i].coreCount = cCount
          this.cpus[i].threadCount = tCount
        } else {
          console.log('barang tidak ditemukan')
        }
      }
    } else if (chooseCategory === 'RAM'){
      for(var i = 0; i<this.rams.length; i++){
        if(this.rams[i].id == id) {
          this.rams[i].model = model
          this.rams[i].brand = brand
          this.rams[i].price = price
          this.rams[i].stock = stock
          this.rams[i].speed = speed
          this.rams[i].size = size

          if(img.includes(",")) {
            img = img.split(",");
            for(var j = 0; j<img.length; j++){
              img[j] = img[j].trim()
              this.rams[i].image = img
            }
          } else {
            const hasil = new Array();
            hasil.push(img)
            this.rams[i].image = hasil
          }
        } else {
          console.log('barang tidak ditemukan')
        }
      }
    } else if (chooseCategory === 'Motherboard'){
      for(var i = 0; i<this.mbs.length; i++){
        if(this.mbs[i].id == id) {
          this.mbs[i].model = model
          this.mbs[i].brand = brand
          this.mbs[i].price = price
          this.mbs[i].stock = stock
          this.mbs[i].chipset = chipset
          this.mbs[i].processor = fCpu

          if(img.includes(",")) {
            img = img.split(",");
            for(var j = 0; j<img.length; j++){
              img[j] = img[j].trim()
              this.mbs[i].image = img
            }
          } else {
            const hasil = new Array();
            hasil.push(img)
            this.mbs[i].image = hasil
          }
        } else {
          console.log('barang tidak ditemukan')
        }
      }
    } else if (chooseCategory === 'GPU') {
      for(var i = 0; i<this.gpu.length; i++){
        if(this.gpu[i].id == id) {
          this.gpu[i].model = model
          this.gpu[i].brand = brand
          this.gpu[i].price = price
          this.gpu[i].stock = stock
          
          if(img.includes(",")) {
            img = img.split(",");
            for(var j = 0; j<img.length; j++){
              img[j] = img[j].trim()
              this.gpu[i].image = img
            }
          } else {
            const hasil = new Array();
            hasil.push(img)
            this.gpu[i].image = hasil
          }
        } else {
          console.log('barang tidak ditemukan')
        }
      }
    } else {
      console.log('error')
    }
  }
}
