function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded()
{
  console.log('modelLoaded!');

}
function draw()
{
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}
var previous_results="";
function gotResult(error,results)
{
  if (error) {
    console.error(error);
  }
  else{
    if ((results[0].confidence>0.5)&&(preivous_results!=results[0].label)) {
      console.log(results);
      preivous_results=results[0].label;
      var synth=window.speechSynthesis;
      speakdata="object detected is:"+results[0].label;
      var utterthis=new SpeechSynthesisUtterance(speakdata);
      synth.speak(utterthis);
      document.getElementById("result_object_name").innerHTML=results[0].label;
      document.getElementById("result_object_accuracy").innerHTML=results[0].confidence;
    }
  }
}