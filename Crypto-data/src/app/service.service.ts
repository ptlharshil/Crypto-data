import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Chart } from 'chart.js'

const apiKey = ''
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
  @ViewChild('error', { static: false }) error!: ElementRef<HTMLDivElement>;

  coinPrice: any
  coinName: any
  chart: any = []
  curr = ''
  errorDiv: any
  divError: any
  curr1: any
  curr2: any
  curr3: any

  private url = "https://api.coinranking.com/v2/coins"

  constructor(private http: HttpClient) { }

  compareData(val1: string, val2: string, val3: string, cnt: number) {
    const apiCall = `${this.url}`
    var res: any
    this.divError = document.getElementById('error')
    if (this.divError.firstChild) {
      this.divError.removeChild(this.divError.firstChild)
    }
    this.http.get(apiCall, Headers).subscribe((data) => {
      res = data
      this.coinName = res.data.coins.map((coin: any) => coin.name.toLowerCase())
      if (!this.coinName.includes(val1.toLowerCase()) &&
        !this.coinName.includes(val1.toLowerCase()) &&
        !this.coinName.includes(val1.toLowerCase())) {
        this.errorDiv = document.getElementById('error')
        var errorElement = document.createElement('span')
        errorElement.innerHTML = 'Please enter a valid currency name'
        this.errorDiv.appendChild(errorElement)

      } else {

        const sparkline1 = [Array]
        const sparkline2 = [Array]
        const sparkline3 = [Array]
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        res.data.coins.map((coin: any) => {
          if (coin.name.toLowerCase() === val1.toLowerCase()) {
            this.curr1 = coin.name
            sparkline1.push(coin.sparkline)
          } else if (coin.name.toLowerCase() === val2.toLowerCase()) {
            this.curr2 = coin.name
            sparkline2.push(coin.sparkline)
          } else if (coin.name.toLowerCase() === val3.toLowerCase()) {
            this.curr3 = coin.name
            sparkline3.push(coin.sparkline)
          }
        })


        this.chart = new Chart('ctx' + `${cnt}`, {
          type: 'line',
          data: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            datasets: [
              {
                label: val1.toLowerCase(),
                data: sparkline1[1],
                borderWidth: 3,
                fill: false,
                backgroundColor: color,
                borderColor: color
              },
              {
                label: val2.toLowerCase(),
                data: sparkline2[1],
                borderWidth: 3,
                fill: false,
                backgroundColor: "black",
                borderColor: "black"
              },
              {
                label: val3.toLowerCase(),
                data: sparkline3[1],
                borderWidth: 3,
                fill: false,
                backgroundColor: "purple",
                borderColor: "purple"
              }
            ]
          }

        })
      }
    })
    return this.chart
  }

  currencyData(value: any, count: number) {
    const apiCall = `${this.url}`
    var res: any
    this.http.get(apiCall, Headers).subscribe((data) => {

      res = data
      this.divError = document.getElementById('error')
      if (this.divError.firstChild) {
        this.divError.removeChild(this.divError.firstChild)
      }
      this.coinName = res.data.coins.map((coin: any) => coin.name.toLowerCase())
      if (!this.coinName.includes(value.toLowerCase())) {
        this.errorDiv = document.getElementById('error')
        var errorElement = document.createElement('span')
        errorElement.innerHTML = 'Please enter a valid currency name'
        this.errorDiv.appendChild(errorElement)
      }
      const letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      res.data.coins.map((coin: any) => {
        if (coin.name.toLowerCase() === value.toLowerCase()) {

          this.divError = document.getElementById('error')
          if (this.divError.firstChild) {
            this.divError.removeChild(this.divError.firstChild)
          }
          this.chart = new Chart('canvas' + `${count}`, {
            type: 'line',
            data: {
              labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
              datasets: [
                {
                  label: coin.name,
                  data: coin.sparkline,
                  borderWidth: 3,
                  fill: false,
                  backgroundColor: color,
                  borderColor: color
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
