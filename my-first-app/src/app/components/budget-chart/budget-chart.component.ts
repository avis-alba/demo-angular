import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartPointData, TableData } from 'src/app/utils/types';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetChartComponent implements OnInit, AfterViewInit, OnChanges {
  
  public responsiveData: ChartPointData[];
  public chartId: string;
  public showChart: boolean;

  @Input() chartData: ChartPointData[];
  @Input() table: TableData;

  constructor(private _ref: ChangeDetectorRef) {}
  
  ngOnInit(): void {

    if (this.table.name === 'Доход') {
      this.chartId = 'column-chart-income';
    }
    
    if (this.table.name === 'Расход') {
      this.chartId = 'column-chart-outcome';
    }
  }

  ngAfterViewInit(): void {

    if (this.chartData.length) {

      this.showChart = true;
      this.displayChart(this.chartData, this.chartId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.chartData.length && this.chartId) {

      this.showChart = true;
      this.displayChart(this.chartData, this.chartId);
    
    } else {

      this.showChart = false;
    }
  }

  public displayChart(data: any[], id: string): void {

    let name: string;
    const responsiveData = [];

    if (id.includes('income')) {
      name = 'Доход'
    }
    if (id.includes('outcome')) {
      name = 'Расход'
    } 

    for (let point of data) {

      const respPoint = {...point};
      respPoint.pointWidth = 20;
      responsiveData.push(respPoint);
    }

    Highcharts.chart(id, {
      chart: {
          type: 'column',
          zooming: {
            mouseWheel: {
              enabled: false
            }
          }
      },
      title: {
          text: name
      },
      subtitle: {
          text: 'для выбранных позиций'
      },
      xAxis: {
          categories: [],
          labels: {
            enabled: false
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Сумма (₽)'
          },
      },
      legend: {
        enabled: true,
        alignColumns: false
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          },
          series: {
            showInLegend: true,
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              headerFormat: ``,
              pointFormatter: function() {
                const name = this.series.userOptions.name;
                const category = data.find(v => v.name === name).category;
                const value = data.find(v => v.name === name).data[0];
                return `${category}: <span style="font-weight: bold">${this.series.userOptions.name}</span> <strong style="color: ${this.series.color}">${value}</strong>`
              }
            }
          },
      },
      accessibility: {
        enabled: false
      },
      responsive: {
        rules: [{
          chartOptions: {
            chart: {
              width: '100%'
            },
            series: responsiveData
          },
          condition: {
            maxWidth: 600
          }
        }]
      },
      series: data
    });
  }

}
