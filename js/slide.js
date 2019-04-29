

function Slide()
{ 
    var thisSlide = this;
    var i = 0;
    
    this.slide1 = document.getElementById("slide1"); 
    this.slide2 = document.getElementById("slide2"); 
    this.slide3 = document.getElementById("slide3");
    this.slide4 = document.getElementById("slide4");  
    this.slideTab = [slide1, slide2, slide3, slide4];
    this.slideBox = document.getElementById('slideBox');
    this.rightIcon = document.getElementsByClassName('iconSlideRight');  
    this.leftIcon = document.getElementsByClassName('iconSlideLeft');
    this.vitesse = 3000; 
    this.interval;
    
    this.hideSlide = function()
    {                                                                              
        thisSlide.slide1.style.display = "none";                                                                  
        thisSlide.slide2.style.display = "none";                                                               
        thisSlide.slide3.style.display = "none";                                                               
        thisSlide.slide4.style.display = "none";                                                                   
        thisSlide.slideTab[i].style.display = "block";                                                                  
    }                                                                                                                                                          

    this.autoSlide = function()
    {                                                                                                                                                              
        thisSlide.interval = setInterval(function()
        {                                                                          
            if ( i < thisSlide.slideTab.length)
            {                                                                            
                thisSlide.hideSlide();                                                                         
                i++;                                                                                                                                     
            }                                                                                                   
            else
            {                                                                                               
                i = 0;                                                                                          
            }                                                                                                   
        }, thisSlide.vitesse);                                                                                                                                             
    }

    this.toRight = function()
    {                                                                                  
        clearInterval(thisSlide.interval);                                                                                
        if (i < thisSlide.slideTab.length - 1)
        {                                                                             
            i = i + 1;                                                                                          
            thisSlide.hideSlide();                                                                             
        }
        else
        {
            i = 0;
            thisSlide.hideSlide();
        }                                                                                                       
    }

    this.toLeft = function ()
    {                                                                                          
        clearInterval(thisSlide.interval);                                                                                
        if (i > 0)
        {                                                                                             
            i = i - 1;                                                                                              
            thisSlide.hideSlide();                                                                             
        }
        else
        {
            i = thisSlide.slideTab.length - 1;
            thisSlide.hideSlide();
        }                                                                                                       
    } 
    
    this.slideBox.addEventListener('touchstart', function()
    {
        thisSlide.toRight();
    });
    
    for(i=0; i<this.leftIcon.length; i++)
    {
        thisSlide.leftIcon[i].addEventListener('click', function()
        {
            thisSlide.toLeft();
        });
    }
    
    for(i=0; i<this.rightIcon.length; i++)
    {
        thisSlide.rightIcon[i].addEventListener('click', function()
        {
            thisSlide.toRight();
        });
    }
          
}                                                                                                                   









