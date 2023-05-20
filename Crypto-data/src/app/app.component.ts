import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceService } from './service.service';
import {Chart, registerables} from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crypto-data';
  inputValue: any
  val=''
  info:any=[]
  newChart:any=Chart
  //charts:any
  currency=''
  coinName:any
  currentIndex=0
  canvasDiv:any
  newCan:any
  chart:any=Chart
  length=0
  count=0
  
  constructor(private service:ServiceService){
    Chart.register(...registerables)
  }
  // ngAfterViewInit() {
  //   this.createChart();
  // }

  // createChart() {
  //   const canvas = document.getElementById('canvas0') as HTMLCanvasElement;

  //   if (this.newChart) {
  //     this.ctx = canvas.getContext('2d');
  //     this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   }

  // }

  getValue(val:string){
    // this.createChart()
    this.count++
    this.canvasDiv=document.getElementById('canvasWrap')
    this.newCan=document.createElement('canvas')
    this.newCan.id='canvas'+`${this.count}`
    this.newChart=this.service.currencyData(val,this.count)
    this.canvasDiv.append(this.newCan)
    
  }
  
  ngOnInit(){
    
  
    this.chart=this.service.cryptoData()
  }
}
