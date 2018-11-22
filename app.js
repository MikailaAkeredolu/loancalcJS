document.getElementById('loan-form').addEventListener('submit', function(e){
//Hide results
document.getElementById('results').style.display = 'none';
document.getElementById('loading').style.display = 'block';

//show the loader on click
   setTimeout(calculateResults, 2000);
   
    e.preventDefault();
});

function calculateResults(){
    console.log('calculatiing..');

    //UI vars - inputs
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    //outputs
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const prinicipal = parseFloat(amount.value); //convert amount input val to decimals
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value)  * 12;


    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (prinicipal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - prinicipal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
       showError('Please check your numbers');
    }
}

function showError(error){

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    
//create a div
const errorDiv = document.createElement('div');

//Get elements
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

//add boostrap  class
errorDiv.className = 'alert alert-danger';

//create text node and append to div
errorDiv.appendChild(document.createTextNode(error));

//insert error above heading
card.insertBefore(errorDiv, heading);

//remove error div after 3 secs
// setTimeout(function(){
// errorDiv.remove();
// }, 3000);

setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();

}
