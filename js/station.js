function Station()
{ 
    this.numberStation = "";
    this.nameContrat = "";
    this.nameStation = "";
    this.adressStation = "";
    this.positionStation = "";
    this.banking = "";
    this.bonus = "";
    this.bikeStands = "";
    this.availableBikeStands = "";
    this.availableBikes = "";
    this.lastUpdate = "";
    this.status = "";
    var station = this;
    
    this.hydratation = function(number, nameContrat, nameStation, adress, position, banking, bonus, bikeStands, availableBikeStands, availableBikes, lastUpdate, status)
    {
        station.numberStation = number;
        station.nameContrat = nameContrat;
        station.nameStation = nameStation;
        station.adressStation = adress;
        station.positionStation = position;
        station.banking = banking;
        station.bonus = bonus;
        station.bikeStands = bikeStands;
        station.availableBikeStands = availableBikeStands;
        station.availableBikes = availableBikes;
        station.lastUpdate = lastUpdate;
        station.status = status;
    }
}