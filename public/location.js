function openbycoords(lat, lon) {
    const request = new XMLHttpRequest();

    const url = "https://api.openweathermap.org/geo/1.0/reverse?";
    const key =   "074eba4301bafa70fd8450f804c2bb40";

    request.open("GET", `${url}lat=${lat}&lon=${lon}&appid=${key}`, true);
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            const data = JSON.parse(request.responseText);
            let placeName = data[0].name;
            console.log("Getting the info about " + placeName)
            location.href = "/weather?place="+placeName;
        }
    }
    request.send();
}

var successCallback = function(position){
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    openbycoords(x,y);
};

var errorCallback = function(error){
    var errorMessage = 'Unknown error';
    switch(error.code) {
        case 1:
        errorMessage = 'Permission denied';
        break;
        case 2:
        errorMessage = 'Position unavailable';
        break;
        case 3:
        errorMessage = 'Timeout';
        break;
    }
    console.log(errorMessage);
};

var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
};


navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
