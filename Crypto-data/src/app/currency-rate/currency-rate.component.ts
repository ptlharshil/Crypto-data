import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ServiceService } from "../service.service"
import { Chart } from 'chart.js'
import { Location } from '@angular/common';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css']
})
export class CurrencyRateComponent {
  @ViewChild('box', { static: false }) box!: ElementRef<HTMLInputElement>

  val = ''
  newChart: any = Chart
  currency = ''
  canvasDiv: any
  newCan: any
  chart: any = Chart
  count = 0
  canvasElements: any = []
  newComp: any

  constructor(private service: ServiceService, private location: Location) { }
  @Output() hideComponent: EventEmitter<void> = new EventEmitter<void>();

  goBack(): void {
    this.location.back();
  }
  getValue(val: string) {
    this.count++
    this.canvasDiv = document.getElementById('canvasWrap')
    this.newCan = document.createElement('canvas')
    this.newCan.id = 'canvas' + `${this.count}`
    this.canvasElements = Array.from(this.canvasDiv.querySelectorAll('canvas'));
    this.newChart = this.service.currencyData(val, this.count)
    this.canvasElements.splice(0, 0, this.newCan)
    for (let i = 0; i < this.canvasElements.length; i++) {
      this.canvasDiv.appendChild(this.canvasElements[i]);
    }

    this.box.nativeElement.value = '';
  }
}
