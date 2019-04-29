function Reservation()
{
    var reserv = this;
    var intervalTimer;
    
    this.minutes = 20;
    this.seconds = 0;
    this.name = sessionStorage.getItem('name');
    this.address = sessionStorage.getItem('address');
    this.bikeStands = sessionStorage.getItem('bikeStands')
    this.availableBikes = sessionStorage.getItem('availableBikes');
    this.availableBikeStands = sessionStorage.getItem('availableBikeStands');
    this.banking = sessionStorage.getItem('banking');
    
 
    this.showInfosFooter = function()
    {
        infosNameData.innerHTML = sessionStorage.getItem('name');
        infosAdressData.innerHTML = sessionStorage.getItem('address'); 
        infosBikeStandsData.innerHTML = sessionStorage.getItem('bikeStands');
        infosAvailableBikesData.innerHTML = sessionStorage.getItem('availableBikes');
        infosAvailableBikeStandsData.innerHTML = sessionStorage.getItem('availableBikeStands');
        infosBankingData.innerHTML = sessionStorage.getItem('banking');
        infosReservStoked.style.display = 'block';    
    }
    
    this.showInfosStocked = function()
    {
        infosNameData.innerHTML = reserv.name;
        infosAdressData.innerHTML = reserv.address; 
        infosBikeStandsData.innerHTML = reserv.bikeStands;
        infosAvailableBikesData.innerHTML = reserv.availableBikes;
        infosAvailableBikeStandsData.innerHTML = reserv.availableBikeStands;
        infosBankingData.innerHTML = reserv.banking;
        infosReservStoked.style.display = 'block';
        chronoElt.innerHTML = sessionStorage.getItem('tps');  
    }
       
    this.timer = function()
    {    
        if((reserv.seconds == 0) && (reserv.minutes == 0))
        {
            clearInterval(intervalTimer);
            sessionStorage.clear();
            infosReservStoked.style.display = 'none'; 
            timeOut.style.display = 'block';  
        }
        else if (reserv.seconds > 0)
        {
            reserv.seconds = reserv.seconds - 1;
        }
        else
        {
            reserv.minutes = reserv.minutes - 1;
            reserv.seconds = 59;
        }
        var tps = reserv.minutes + " : " + reserv.seconds;
        chronoElt.innerHTML = tps;
        sessionStorage.setItem('tps', tps);
        sessionStorage.setItem('min', reserv.minutes);
        sessionStorage.setItem('sec', reserv.seconds);
    };   
}

    
    
    

