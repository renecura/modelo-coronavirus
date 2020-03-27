class Chart {

  constructor() {
    this.options = {
      title: 'Evolución del virus',
      hAxis: {title: 'Día',  titleTextStyle: {color: '#333'}},
      vAxis: {
        viewWindowMode:'explicit',
        viewWindow: {
          max:1000,
          min:0
        },
      },
      curveType: 'function',
      colors: ['#FF0000','#008080','#C400C4','#000000']
    };
  
    this.chart = new google.visualization.LineChart(
      document.getElementById('chart_div')
    );

    this.data = [["Día", "Susceptible", "Infectada", "Recuperada"]];
   
  }

  addData(day, s, i, r) {
    this.data.push([day,s,i,r]);
  }

  draw() {
    const data = google.visualization.arrayToDataTable(this.data);
    this.chart.draw(data, this.options);
  }

  simulate(infectionRate, recoverRate) {
    const ir = infectionRate / 1000;
    const rr = recoverRate / 10;

    let s = 990;
    let i = 10;
    let r = 0;

    this.data = [["Día", "Susceptible", "Infectada", "Recuperada"]];

    for(let d = 0; d < 100; d++){
      this.addData(d, s, i , r);
      
      let dr = rr * i; // Los que se recuperan.
      i -= dr; // Los recuperados se restan de los infectados
      r += dr; // Sumo los nuevos recuperados
      
      let di = ir * i * s;
      i += di;
      s -= di;      
    }

    this.draw();
  }

}

function refresh() {
  console.log($('#infectionRate').val(), $('#recoverRate').val());
  chart.simulate($('#infectionRate').val(), $('#recoverRate').val()); 
}

if (typeof module !== "undefined") {
  module.exports = { Chart, refresh };
}

let chart;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(() => {
  chart = new Chart();
  refresh();
});
