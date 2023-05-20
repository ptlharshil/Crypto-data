import { Component, ViewChild, ElementRef } from '@angular/core';
import { ServiceService } from './service.service';
import { Chart, registerables } from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('box', { static: false }) box!: ElementRef<HTMLInputElement>
  title = 'Crypto-data';
  val = ''
  newChart: any = Chart
  currency = ''
  canvasDiv: any
  newCan: any
  chart: any = Chart
  count = 0

  constructor(private service: ServiceService) {
    Chart.register(...registerables)
  }


  getValue(val: string) {
    this.count++
    this.canvasDiv = document.getElementById('canvasWrap')
    this.newCan = document.createElement('canvas')
    this.newCan.id = 'canvas' + `${this.count}`
    if (this.count > 1) {
      var canvasElements = Array.from(this.canvasDiv.querySelectorAll('canvas'));
      this.newChart = this.service.currencyData(val, this.count)
      canvasElements.splice(0, 0, this.newCan)

      for (const canvas of canvasElements) {

        this.canvasDiv.appendChild(canvas);
      }
    } else {
      this.newChart = this.service.currencyData(val, this.count)
      this.canvasDiv.append(this.newCan)
    }
    this.box.nativeElement.value = '';
  }

  ngOnInit() {


    this.chart = this.service.cryptoData()
  }
}
