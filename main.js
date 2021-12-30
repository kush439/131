song = "";
song1 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
song = loadSound("music.mp3");
song1 = loadSound("music1.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    canvas.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
} 

function gotPoses(results){
 if(results.length>0)
 {
     console.log(results);
     leftWristX = results[0].pose.leftWrist.x;
     leftWristY = results[0].pose.rightWrist.y;
     console.log("leftWristX = " +  leftWristX + "leftWristY = " +  leftWristY );

     rightWristX = results[0].pose.rightWrist.x;
     rightWristY = results[0].pose.rightWrist.y;
     console.log("rightWristX = " +  rightWristX + "rightWristY = " +  rightWristY );

     scoreLeftWrist = results[0].pose.keypoints[9].score;
     scoreRightWrist = results[0].pose.keypoints[10].score;
     console.log("scoreleftWrist = " +  scoreLeftWrist + "scorerigthWrist = " +  scoreRightWrist);
 }
}

function modelLoaded(){
    console.log('Posenet is Initialised');
}
    function play()

{
    song.play();
    song.setVolume(1);
    song.rate(5);
}

function draw()
{
    fill("#ff0000");
    stroke("#ff0000");
    image(video, 0 , 0 , 600 , 500);
    if(scoreLeftWrist>0)
    {
        console.log("leftWrist");
        song.stop();
        song1.play();
    }
    else if(scoreRightWrist>0)
    {
        console.log("rightWrist");
        song1.stop();
        song.play();
        
    }
}