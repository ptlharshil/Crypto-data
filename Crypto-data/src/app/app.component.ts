import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Chart, registerables } from 'chart.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('box1', { static: false }) box1!: ElementRef<HTMLInputElement>
  @ViewChild('box2', { static: false }) box2!: ElementRef<HTMLInputElement>
  @ViewChild('box3', { static: false }) box3!: ElementRef<HTMLInputElement>
  @ViewChild('compareWrap', { static: false }) compareWrap!: ElementRef;

  title = 'Crypto-data';
  val = ''
  canvasDiv: any
  canvasDiv1: any
  newCan: any
  newCan1: any
  chart: any = Chart
  cnt = 0
  canvasElements: any = []
  newComp: any
  compareData: any = Chart

  constructor(private service: ServiceService, private router: Router) {
    Chart.register(...registerables)
  }

  showNewComponent: boolean = false;

  comparison(box1: string, box2: string, box3: string) {

    this.cnt++
    this.canvasDiv1 = document.getElementById('compareWrap')
    this.newCan1 = document.createElement('canvas')
    this.newCan1.id = 'ctx' + `${this.cnt}`
    this.canvasElements = Array.from(this.canvasDiv1.querySelectorAll('canvas'));
    this.compareData = this.service.compareData(box1, box2, box3, this.cnt)

    this.canvasElements.splice(0, 0, this.newCan1)
    for (let i = 0; i < this.canvasElements.length; i++) {
      this.canvasDiv1.appendChild(this.canvasElements[i]);
    }

    this.box1.nativeElement.value = '';
    this.box2.nativeElement.value = '';
    this.box3.nativeElement.value = '';
  }

  ngOnInit() {
    this.chart = this.service.cryptoData()
  }
}
