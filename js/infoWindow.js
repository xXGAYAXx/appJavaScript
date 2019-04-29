function InfoWindow()
{
    this.numberStation = "";
    this.nameStation = "";
    this.adressStation = "";
    this.positionStation = "";
    this.banking = "";
    this.bikeStands = "";
    this.availableBikeStands = "";
    this.availableBikes = "";
    this.status = "";
    var infosWin = this;
    
    this.innerHTMLInfos = function(HTMLElement, infos)
    {
        HTMLElement.innerHTML = infos;
    }
    
    this.hydratation = function(number, nameStation, adress, position, banking, bikeStands, availableBikeStands, availableBikes, lastUpdate, status)
    {
        infosWin.numberStation = number;
        infosWin.nameStation = nameStation;
        infosWin.adressStation = adress;
        infosWin.positionStation = position;
        infosWin.banking = banking;
        infosWin.bikeStands = bikeStands;
        infosWin.availableBikeStands = availableBikeStands;
        infosWin.availableBikes = availableBikes;
        infosWin.status = status;
    }
    
}