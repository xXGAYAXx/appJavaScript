
var nameElt = document.getElementById("nameStation");                                                           
var adressElt = document.getElementById("adressStation");                                                
var statusElt = document.getElementById("statusStation");                                                 
var availableBikeStandsElt = document.getElementById("availableBikeStands");                                                    
var bikeStandsElt = document.getElementById("bikeStands");                                                  
var availableBikesElt = document.getElementById("availableBikes");
var bankingElt = document.getElementById("banking");
var infosWindowElt = document.getElementById("infosWindow");
var reservationElt = document.getElementById("reservation");
var FailElt = document.getElementById('messFail');                                                      
var resaOKElt = document.getElementById('messOK');
var emptyCanvasElt = document.getElementById('messEmptyCanvas');
var reservationBtnElt = document.getElementById('resaBtn');
var infosNameData = document.getElementById('infosNameData');
var infosAdressData = document.getElementById('infosAdressData');
var infosBikeStandsData = document.getElementById('infosBikeStandsData');
var infosAvailableBikesData = document.getElementById('infosAvailableBikesData');
var infosAvailableBikeStandsData = document.getElementById('infosAvailableBikeStandsData');
var infosBankingData = document.getElementById('infosBankingData');
var infosReservStoked = document.getElementById('infosReservStoked');
var timeOut = document.getElementById("timeOut"); 
var validStation = document.getElementById("validStation");
var chronoElt = document.getElementById('chrono');
var resetCanvasElt = document.getElementById('reset');
var validCanvasElt = document.getElementById('valid');

var slide = new Slide();
slide.autoSlide();

document.addEventListener('keydown', function (event)
{                                                      
    if (event.keyCode == 39)
    {                                                                               
        slide.toRight();                                                                            
    }                                                                                              
    if (event.keyCode == 37)
    {                                                                                           
        slide.toLeft();                                                                            
    }                                                                                                           
});  
  
function initMap() 
{
    map = new google.maps.Map(map, 
    {
      center: {lat: 45.764043, lng: 4.835659},
      zoom: 13
    });      
}
  
function requette (url)
{
    return new Promise(function (resolve, reject)
    {
        var req = new window.XMLHttpRequest(); 
        req.onreadystatechange = function()
        {
           if (req.readyState === 4)
           {
               if (req.status === 200)
               {
                   resolve(req.responseText);
               }
               else
               {
                   reject(req);
               }
           }
        } 
        req.open("GET", url);
        req.send();        
    });     
}

var getInfos = function()
{
    return new Promise(function(resolve, reject)
    {
        requette("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=42cf398be2c55d44619e24174650eefaa481486c").then (function (response)
        {   
            var data = JSON.parse(response);
            resolve(data);
        }).catch(function(error)
        {
            console.log(error);
        })
    })
}; 

var infoWindow = new InfoWindow();
var newCanvas = new Canvas();
newCanvas.init();



var stationsTab = [];
var stockedName;

window.onload = function()
{
    getInfos().then(function(data)
    {
        data.forEach(function(infos)
        {
            var station = new Station();
            
            station.hydratation(infos.number, infos.contract_name, infos.name, infos.address, infos.position, infos.banking, infos.bonus, infos.bike_stands, infos.available_bike_stands, infos.available_bikes, infos.last_update, infos.status);
     
            stationsTab.push(station); 
            
            var markOption = new MarkOptions(); 

            if ((station.status == 'OPEN') && (station.availableBikes >0))
            {
                markOption.colorMarkGreen();
            }
            else
            {
                markOption.colorMarkRed();
            }

            var mark = new google.maps.Marker
            ({
                map : map,
                position : station.positionStation,
                name : station.nameStation,
                icon: markOption.pinImage
            });  

            google.maps.event.addListener(mark, "click", function()
            {
                
                newCanvas.clearCanvas();
                resetCanvasElt.addEventListener('click', function() 
                {
                    newCanvas.clearCanvas();   
                });	

                validCanvasElt.addEventListener('click',function()
                {
                    if((stock != undefined) || (stockTouch != undefined))
                    {
                        reservationBtnElt.style.display = 'block';
                        emptyCanvasElt.style.display = 'none';
                        FailElt.style.display = 'none'; 
                        resaOKElt.style.display = 'none'; 
                    }
                    else
                    {
                      emptyCanvasElt.style.display = 'block';  
                    }
                }); 
                
                infosWindowElt.style.display = 'inline-block';
                FailElt.style.display = 'none';                                                     
                resaOKElt.style.display = 'none';   
                emptyCanvasElt.style.display = 'none';   
                reservationBtnElt.style.display = 'none'; 
                idStation = stationsTab.indexOf(station);
                
                infoWindow.hydratation(station.numberStation, station.nameStation, station.adressStation, station.positionStation, station.banking, station.bikeStands, station.availableBikeStands, station.availableBikes, station.lastUpdate)
                
                if(station.banking == 'false')
                {
                    infoWindow.banking = "NON";
                }
                else
                {
                    infoWindow.banking = "OUI";
                }
                
                if(station.status == 'OPEN')
                {
                    infoWindow.status = 'OUVERTE';
                }
                else
                {
                    infoWindow.status = 'FERMEE';
                }
                
                if((infoWindow.availableBikes == 0) || (station.status == 'CLOSED'))
                {
                    FailElt.style.display = 'block'; 
                    validStation.style.display = 'none';
                }
                else
                {
                    validStation.style.display = 'block';
                }
                
                infoWindow.innerHTMLInfos(nameElt, infoWindow.nameStation);
                infoWindow.innerHTMLInfos(adressElt, infoWindow.adressStation);          
                infoWindow.innerHTMLInfos(statusElt, infoWindow.status);
                infoWindow.innerHTMLInfos(availableBikeStandsElt, infoWindow.availableBikeStands);
                infoWindow.innerHTMLInfos(bikeStandsElt, infoWindow.bikeStands);
                infoWindow.innerHTMLInfos(availableBikesElt, infoWindow.availableBikes);           
                infoWindow.innerHTMLInfos(bankingElt, infoWindow.banking);   
            });
        });
    });
    
    var idStation;
    
    newReservation = new Reservation();
    
    if(sessionStorage.getItem('name'))
    {   
        newReservation.minutes = sessionStorage.getItem('min');
        newReservation.seconds = sessionStorage.getItem('sec');
        newReservation.showInfosStocked();
        var intervalTimer = setInterval(newReservation.timer, 1000);
    }
    else
    {     
        infosReservStoked.style.display = 'none'; 
    }
    
    reservationBtnElt.addEventListener('click', function()
    {
        clearInterval(intervalTimer);
    });

    reservationBtnElt.addEventListener('click', function()
    {
        newCanvas.clearCanvas();
        sessionStorage.clear();
        newReservation.minutes = 20;
        newReservation.seconds = 0;

        reservationBtnElt.addEventListener('click', function()
        {
            clearInterval(intervalTimer);
        });

        reservationBtnElt.style.display = 'none';    
        resaOKElt.style.display = 'block';
        newReservation.timer();
        var intervalTimer = setInterval(newReservation.timer, 1000);

        if(stationsTab[idStation].availableBikes > 0)
        {
            infoWindow.availableBikes = stationsTab[idStation].availableBikes - 1;
            availableBikesElt.innerHTML = infoWindow.availableBikes;
        }
        else
        {
            FailElt.style.display = 'block';
        }

        sessionStorage.setItem('name', infoWindow.nameStation);
        sessionStorage.setItem('address', infoWindow.adressStation);
        sessionStorage.setItem('availableBikeStands', infoWindow.availableBikeStands);
        sessionStorage.setItem('bikeStands', infoWindow.bikeStands);
        sessionStorage.setItem('availableBikes', infoWindow.availableBikes);
        sessionStorage.setItem('banking', infoWindow.banking);

        newReservation.showInfosFooter();
    });  
}

     






    

            
    

