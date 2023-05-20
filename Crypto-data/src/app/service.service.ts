import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Chart } from 'chart.js'

const apiKey = 'coinrankingc3241fd9ebbd571d3101fb333a248b8d026d3d88bebd95c9'
const Headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': `${apiKey}`,
    'Access-Control-Allow-Origin': '*'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  result: any
  coinPrice: any
  coinName: any
  chart: any = []
  curr=''
  display=''
  private url = "https://api.coinranking.com/v2/coins"

  constructor(private http: HttpClient) { }
  

  currencyData(value:any, count:number){
    const apiCall = `${this.url}`
    var res: any
    this.http.get(apiCall, Headers).subscribe((data) => {
    
    res = data

    res.data.coins.map((coin:any)=>{
      if(coin.name===value)
      {
        this.chart = new Chart('canvas'+`${count}`, {
          type: 'line',
          data: {
            labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23],
            datasets: [
              {
                label: coin.name,
                data: coin.sparkline,
                borderWidth: 3,
                fill: false,
                backgroundColor: "yellow",
                borderColor: "red"
              }
            ]
          }
        })
        
      }
      
    })

  })
  return this.chart
  }
  
  cryptoData() {

      const apiCall = `${this.url}`
      var res: any
      this.http.get(apiCall, Headers).subscribe((data) => {
      
      res = data
      this.coinPrice = res.data.coins.map((coin: any) => coin.price)
      this.coinName = res.data.coins.map((coin: any) => coin.name)
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.coinName,
          datasets: [
            {
              label: "Crypto Prices",
              data: this.coinPrice,
              borderWidth: 3,
              fill: false,
              backgroundColor: "yellow",
              borderColor: "red"
            }
          ]
        }
      })
    })
    
    return this.chart
  }
}
