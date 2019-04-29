function MarkOptions()
{   
    this.pinImage;
    this.position;
    this.name;
    this.map;
    
    this.colorMarkGreen = function()
    {
        this.pinImage = new google.maps.MarkerImage('images/greenMark.png');
    }
    
    this.colorMarkRed = function()
    {
        this.pinImage = new google.maps.MarkerImage('images/mark.png');
    }
    
    this.colorMarkBlue = function()
    {
        this.pinImage = new google.maps.MarkerImage('images/blueMark.png');
    }
    
    this.colorMarkYellow = function()
    {
        this.pinImage = new google.maps.MarkerImage('images/yellowMark.png');
    }
    
}