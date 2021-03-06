const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const total_tests = document.querySelector(".total-tests .value");
const active_cases = document.querySelector(".active-cases .value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

let app_data = [],dates = []; 

let country_code = geoplugin_countryCode();
let user_country;

country_list.forEach(country =>{
    if(country.code == country_code)
        {
            user_country = country.name;
        }
});

let active,recovered,death;

function fetchData(user_country){
   fetch(`https://covid-193.p.rapidapi.com/statistics?country=${user_country}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8fb27c9942msh57da11a84110d03p16888ajsn687adaaeb0ce"
	}
})
.then(response => {
	return response.json();
})

.then(data=>{
       app_data = [];
       dates = [];
       dates = Object.keys(data);
       
       dates.forEach(date => {
           let DATA = data[date];
           
           app_data.push(DATA);
       });
      
   })
    
    .then(() => {
       updateUI();
   })
    
.catch(err => {
	console.log(err);
});

}

fetchData(user_country);

function updateUI(){
    updateStats();
    axesLinearChart();
}

function updateStats(){
    
     country_name_element.innerHTML = app_data[4][0].country;
     total_cases_element.innerHTML = app_data[4][0].cases.total;
    
     new_cases_element.innerHTML = app_data[4][0].cases.new;
       
     
     recovered = app_data[4][0].cases.recovered;
     recovered_element.innerHTML = app_data[4][0].cases.recovered;
       
     death =app_data[4][0].deaths.total;
     deaths_element.innerHTML = app_data[4][0].deaths.total;
     new_deaths_element.innerHTML = app_data[4][0].deaths.new;
       
       total_tests.innerHTML = app_data[4][0].tests.total;
       
       active = app_data[4][0].cases.total - recovered - death;
    
       active_cases.innerHTML =`${app_data[4][0].cases.total - recovered - death}`;
       
}

let myPieChart;

function axesLinearChart(){
    
    if(myPieChart)
        {
            myPieChart.destroy();
        }
    
    myPieChart = new Chart(ctx, {
   
    type: 'doughnut',
        
    data : {
        
         labels: [
        'active-cases',
        'recovered',
        'deaths'
    ],
        
    datasets: [{
        label:"myfirstdataset",
        data:[active,recovered,death],
        backgroundColor:["rgb(255,140,105)","rgb(124,252,0)","rgb(255,0,0)"],
        fontSize: "4em"
        
    }]

    // These labels appear in the legend and in the tooltips when hovering different arcs
   
    },
    options:{
                responsive:true,
                maintainAspectRatio:false
            }
    
        
});
    
   
}

