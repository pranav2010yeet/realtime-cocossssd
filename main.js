status=""
output=[]

function preload(){

}

function setup(){
  canvas=createCanvas(300,300)
  canvas.center() 
  video=createCapture(VIDEO)
  video.hide()
  video.size(300,300)
  //code for intializing coco ssd
  objectdetector=ml5.objectDetector("cocossd", modelnotloaded)
  
}

function modelnotloaded(){
  console.log("Yes the model has loaded I think or not")
  status=true
  document.getElementById("status").innerHTML="Status : Detecting Objects"
 
}

function gotresults(error,results ){
if (error) {
  console.log(error)
   

}
else {
  console.log(results)
  output=results 
}
  
}

function draw(){
    image(video,0,0,300,300)
  
if (status !="") {
  objectdetector.detect(video,gotresults)
  for (let i = 0; i < output.length; i++) {
    objectname=output[i].label
    objectaccuracy=floor(output[i].confidence*100)+"% "
    x=output[i].x
    y=output[i].y
    width=output[i].width 
    height=output[i].height 
    r = random(255)
  g = random(255)
    b = random(255)
    fill(r,g,b)
    textSize(15)
    text(objectname+" "+objectaccuracy,x,y)
    noFill()
stroke(r,g,b)
rect(x,y,width,height)
    document.getElementById("number").innerHTML="Number of objects = "+ output.length

  }
}
}

