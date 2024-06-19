document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('conversionForm');
    const msg = document.querySelector('.msg');

    async function getExchangeRates(from, to, amount) {
        const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '28368b2012msh9f0b3c706f64c23p16454djsn849dd8d9ae89',
                'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const amount = await response.json();
        
            msg.textContent = `1${from} = ${amount.result.toFixed(2)} ${to}`;
        } catch (error) {
            console.error(error);
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const formData = new FormData(form);
        const from = formData.get('from');
        const to = formData.get('to');
        const amount = formData.get('amount');
        getExchangeRates(from, to, amount);
    });

    const dropdonws = document.querySelectorAll(".dropdown select");
   

    for(let select of dropdonws) {
        for(currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            if(select.name === "from" && currCode === "USD") {
                newOption.selected = "selected";
            }
            
            if(select.name === "to" && currCode === "INR") {
                newOption.selected = "selected";
            }
           
            select.append(newOption);
        }

        
    select.addEventListener("change", (evt) => {
        updateFLag(evt.target);
    })
    }


    const updateFLag = (element) => {
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
     let img = element.parentElement.querySelector(".img");
     img.src = newSrc;
    }
});
