// https://maps.googleapis.com/maps/api/geocode/json?&address=Bulgaria
var list = $('#text').children('li');
var len = list.length;

for ( var i = 0; i<len; i+=2){
    var el = list[i-1];
    var el3 = list[i+1];
    var el2 = list[i-3];
    var el4 = list[i];
    
    if(i>3 && !el2.classList.contains('red')){
        el.className += 'red';
        el3.className += 'red';
    } else {
        el4.className += 'red';
    }
    
    // el2.className += 'red';
    console.log(el);
}
