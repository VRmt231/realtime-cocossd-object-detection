img = "";
status = "";
var data = [];

3
function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    
}



function modelLoaded(){
    console.log("a new model, CocoSsD has appeared!")
    status = true;
    
}

function gotResult(error, results){
 if(error){
     console.log(error);
 }
 console.log(results);
 data = results

     
 }


function draw(){
    image(video, 0 , 0, 380, 380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for( i = 0; i < data.length; i++){
            document.getElementById("status").innerHTML = "Status - Object Detected";
            document.getElementById("number-of-objects").innerHTML = "Number of Objects detected are - " + data.length;
            fill(r,g,b);
            percent = floor(data[i].confidence * 100);
            text(data[i].label + " " + percent + "%", data[i].x + 15, data[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(data[i].x, data[i].y, data[i].width, data[i].height);
        }
    }
}