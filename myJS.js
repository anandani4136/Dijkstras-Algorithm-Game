
win=false
Time = 0
var a;
var myMap = new Map();
var scoreMap = new Map();
var pathCosts = new Map();
var bestPath='';
var bestScore=0;

var djScore=0;
var animScore=0;
var bestTime=10000;

var relaxMode=true;
var hardMode=false;

function relaxModes()
{
    relaxMode=true;
    hardMode=false;
    initialize();
    //alert("RELAX MODE")
}

function hardModes()
{
    hardMode=true;
    relaxMode=false;
    initialize();
    //alert("HARD MODE")
}


var linA=[{x1:200,y1:300,x2:400,y2:100,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linB=[{x1:400,y1:100,x2:900,y2:100,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linC=[{x1:900,y1:100,x2:1100,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

var linD=[{x1:900,y1:500,x2:1100,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linE=[{x1:400,y1:500,x2:900,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linF=[{x1:200,y1:300,x2:400,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

var linG=[{x1:200,y1:300,x2:400,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linH=[{x1:400,y1:300,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linI=[{x1:900,y1:300,x2:1100,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

var linJ=[{x1:400,y1:100,x2:400,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linK=[{x1:400,y1:300,x2:400,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linL=[{x1:900,y1:100,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linM=[{x1:900,y1:300,x2:900,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

var linN=[{x1:400,y1:300,x2:900,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linO=[{x1:400,y1:300,x2:900,y2:100,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linP=[{x1:400,y1:100,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
var linQ=[{x1:400,y1:500,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]


var mOfLine=0;
var bOfLine=0;
var oldX=0;
var oldY=0;
var newX=0;
var newY=0;
var aLine='';

var animation=false;
var moveComplete=false;

var paths=['ABC','FED','GHI','API','FQI','GOC','GND','AJHI','FKHI','AJOC','FKND','ABLI','FEMI','GOLI','GHLC','GKQI','GJPI','GNMI','APLC','FQMD','AJHLC','GKQMD','FKHMD','ABLMD','ABOHI','ABOJPI','ABOGFED','ABOND','ABONMI','GHMD','GJBC','GKED','GJBLI','GKEMI','GHPBC','GHQED','FEMLC','FENHI','FENKQI','FENGABC','FENOC','FENOLI'];

//var pathEX=['ABLMD','ABOHI','ABOJPI','ABOGFED','ABOND','ABONMI','GHMD','GJBC','GKED','GJBLI','GKEMI','GHPBC','GHQED','FEMLC','FENHI','FENKQI','FENGABC','FENOC','FENOLI','','']

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomScore(min,max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var myPathScore=['Z','BB','HH','EE','O','P','N','Q','J','K','L','M']

function loadPathCosts(ctx)
{
    myMap.forEach(function (value, key) {
        var rVal=0;
        if(hardMode) {
            if (djScore < 5) {
                rVal = getRandomInt(50);
            }
            else if (djScore >= 5 && djScore < 10) {

                    rVal = getRandomScore(50, 75);
                }
            else {

                    rVal = getRandomScore(75, 100);

            }
            }
        else
        {
            rVal = getRandomInt(25);
        }
        value[0].wt = rVal;
    });

    for(var i=0;i<paths.length;i++)
    {

        var temp=sortString(paths[i]);
        var score=0;
        for(var j=0;j<temp.length;j++)
        {
            if(myMap.has(temp[j]))
            {
                score=score + myMap.get(temp[j])[0].wt;
            }
        }
        pathCosts.set(temp,score);
        //alert("PATH COSTS="+temp+"-->"+score)
    }

    bestPath='';
    bestScore=10000;
    pathCosts.forEach(function (value, key) {
        if(value<bestScore)
        {
            bestPath=key;
            bestScore=value;
        }
    });

    //alert("INITIALIZE - BEST PATH COSTS [PATH]="+bestPath+"-->[SCORE]="+bestScore)
    ctx.fillStyle = "#111111";
    ctx.font = "12px Arial";
    var strShow="S/N#-"+getRandomScore(100000,900000)+"-"+bestPath+"-"+getRandomScore(1000,999);
    ctx.fillText(strShow, 1550, 685);
}

function labelMatrix(ctx)
{
    //alert(lineCost)
    ctx.fillStyle = "#c53230";
    ctx.font = "40px Arial";
    ctx.fillText("START >", 15, 314);
    ctx.fillText("< STOP", 1130, 314);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#24dbba";//"#0051ff";
    ctx.fillText('A/'+linA[0].wt, 225, 200);
    ctx.fillText('B/'+linB[0].wt, 625, 75);
    ctx.fillText('C/'+linC[0].wt, 1035, 200);
    ctx.fillText('D/'+linD[0].wt, 1035, 400);
    ctx.fillText('E/'+linE[0].wt, 625, 525);
    ctx.fillText('F/'+linF[0].wt, 225, 400);

    ctx.fillText('G/'+linG[0].wt, 300, 285);
    ctx.fillText('H/'+linH[0].wt, 625, 285);
    ctx.fillText('I/'+linI[0].wt, 1000, 285);

    ctx.fillText('J/'+linJ[0].wt, 410, 200);
    ctx.fillText('K/'+linK[0].wt, 410, 400);

    ctx.fillText('L/'+linL[0].wt, 910, 200);
    ctx.fillText('M/'+linM[0].wt, 910, 400);

    ctx.fillText('N/'+linN[0].wt, 510, 390);
    ctx.fillText('O/'+linO[0].wt, 510, 230);

    ctx.fillText('P/'+linP[0].wt, 750, 230);
    ctx.fillText('Q/'+linQ[0].wt, 750, 390);
}

function labelAnimMatrix(ctx)
{
    //alert(lineCost)
    ctx.fillStyle = "#c53230";
    ctx.font = "40px Arial";
    ctx.fillText("START >", 15, 314);
    ctx.fillText("< STOP", 1130, 314);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#24dbba";//"#0051ff";
    ctx.fillText('A/', 225, 200);
    ctx.fillText('B/', 625, 75);
    ctx.fillText('C/', 1035, 200);
    ctx.fillText('D/', 1035, 400);
    ctx.fillText('E/', 625, 525);
    ctx.fillText('F/', 225, 400);

    ctx.fillText('G/', 300, 285);
    ctx.fillText('H/', 625, 285);
    ctx.fillText('I/', 1000, 285);

    ctx.fillText('J/', 410, 200);
    ctx.fillText('K/', 410, 400);

    ctx.fillText('L/', 910, 200);
    ctx.fillText('M/', 910, 400);

    ctx.fillText('N/', 510, 390);
    ctx.fillText('O/', 510, 230);

    ctx.fillText('P/', 750, 230);
    ctx.fillText('Q/', 750, 390);
}


function initialize() {


     linA=[{x1:200,y1:300,x2:400,y2:100,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linB=[{x1:400,y1:100,x2:900,y2:100,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linC=[{x1:900,y1:100,x2:1100,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

     linD=[{x1:900,y1:500,x2:1100,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linE=[{x1:400,y1:500,x2:900,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linF=[{x1:200,y1:300,x2:400,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

     linG=[{x1:200,y1:300,x2:400,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linH=[{x1:400,y1:300,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linI=[{x1:900,y1:300,x2:1100,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

     linJ=[{x1:400,y1:100,x2:400,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linK=[{x1:400,y1:300,x2:400,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linL=[{x1:900,y1:100,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linM=[{x1:900,y1:300,x2:900,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]

     linN=[{x1:400,y1:300,x2:900,y2:500,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linO=[{x1:400,y1:300,x2:900,y2:100,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linP=[{x1:400,y1:100,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]
     linQ=[{x1:400,y1:500,x2:900,y2:300,clr:'#00ecff',wt:0,select:false,misc:0,firewall:false}]


    myMap.clear();
    scoreMap.clear();
    pathCosts.clear();

    myMap.set('A',linA)
    myMap.set('B',linB)
    myMap.set('C',linC)
    myMap.set('D',linD)
    myMap.set('E',linE)
    myMap.set('F',linF)
    myMap.set('G',linG)
    myMap.set('H',linH)
    myMap.set('I',linI)
    myMap.set('J',linJ)
    myMap.set('K',linK)
    myMap.set('L',linL)
    myMap.set('M',linM)
    myMap.set('N',linN)
    myMap.set('O',linO)
    myMap.set('P',linP)
    myMap.set('Q',linQ)


    //loadPathCosts();

    var mycanvas = document.getElementById("myCanvas");
    var ctx = mycanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

    loadPathCosts(ctx);

    ctx.lineWidth = 7;

    ctx.strokeStyle = "#00ecff"
/**
    ctx.font = "15px Arial";
    ctx.fillStyle = "#1d56dd";
    if(djScore<5) {
        ctx.fillText("Complexity = LOW", 1550, 25);
    }
    else if (djScore>=5 && djScore<10)
    {
        ctx.fillText("Complexity = MEDIUM", 1550, 25);
    }
    else
    {
        ctx.fillText("Complexity = HIGH", 1550, 25);
    }
    ctx.fillText("Dijkstra Score = "+djScore, 1550, 50);
    ctx.fillText("Mine-Track Score = "+animScore, 1550, 100);
    ctx.fillText("Best-Time Score = "+bestTime, 1550, 125);
*/

    ctx.font = "20px Arial";
    ctx.fillStyle = "#1d56dd";
    if(djScore<5) {
        ctx.fillText("Complexity = LOW", 1450, 200);
    }
    else if (djScore>=5 && djScore<10)
    {
        ctx.fillText("Complexity = MEDIUM", 1450, 200);
    }
    else
    {
        ctx.fillText("Complexity = HIGH", 1450, 200);
    }
    ctx.fillText("Dijkstra Score = "+djScore, 1450, 150);
    ctx.fillText("Mine-Track Score = "+animScore, 1450, 400);
    ctx.fillText("Best-Time (secs) = "+bestTime, 1450, 450);
    ctx.font = "Italic 15px Arial";

    ctx.fillText("Developed by Ronit Anandani", 25, 675);



    ctx.beginPath()

    myMap.forEach(function(value, key) {
        //alert(key + ' = ' + value);
        ctx.moveTo(value[0].x1,value[0].y1)
        ctx.lineTo(value[0].x2,value[0].y2);
    });


    ctx.stroke()

    mycanvas.addEventListener("click", handleMouseClick, false);
    //mycanvas.addEventListener("mouseover", handleMouseHover, false);

    labelMatrix(ctx);

}


function drawBackground(x,y) {

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)


    ctx.lineWidth = 7;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#00ecff";//"blue"

    ctx.font = "20px Arial";
    ctx.fillStyle = "#1d56dd";
    if(djScore<5) {
        ctx.fillText("Complexity = LOW", 1450, 200);
    }
    else if (djScore>=5 && djScore<10)
    {
        ctx.fillText("Complexity = MEDIUM", 1450, 200);
    }
    else
    {
        ctx.fillText("Complexity = HIGH", 1450, 200);
    }
    ctx.fillText("Dijkstra Score = "+djScore, 1450, 150);
    ctx.fillText("Mine-Track Score = "+animScore, 1450, 400);
    ctx.fillText("Best-Time (secs) = "+bestTime, 1450, 450);
    ctx.font = "Italic 15px Arial";

    ctx.fillText("Developed by Ronit Anandani", 25, 675);

    myMap.forEach(function(value, key) {
        //alert(key + ' = ' + value);
        ctx.beginPath()
        ctx.moveTo(value[0].x1,value[0].y1)
        ctx.lineTo(value[0].x2,value[0].y2);
        if (ctx.isPointInStroke(x, y)) {
            if(!value[0].select)
            {
                value[0].select=true;
                value[0].clr='red'
                ctx.strokeStyle = value[0].clr
                scoreMap.set(key,parseInt(value[0].wt));

            }
            else
            {
                value[0].select=false;
                value[0].clr='#00ecff'
                ctx.strokeStyle = value[0].clr
                scoreMap.delete(key);
            }
        }
        else{
            ctx.strokeStyle = value[0].clr
        }
        ctx.stroke();

        }
        );

    labelMatrix(ctx);

}

function loadFirewall()
{

    // FIRST Firewall
    var firstFW = getRandomInt(2);
    if(firstFW==0)
    {
        myMap.get('A')[0].firewall=true;
    }
    else if (firstFW==1)
    {
        myMap.get('G')[0].firewall=true;
    }
    else
    {
        myMap.get('F')[0].firewall=true;
    }

    // SECOND Firewall
    var secondFW1 = getRandomInt(2);
    if(secondFW1==0)
    {
        myMap.get('B')[0].firewall=true;
    }
    else if (secondFW1==1)
    {
        myMap.get('H')[0].firewall=true;
    }
    else
    {
        myMap.get('E')[0].firewall=true;
    }

    var secondFW2 = getRandomInt(3);
    if(secondFW2==0)
    {
        myMap.get('N')[0].firewall=true;
    }
    else if (secondFW2==1)
    {
        myMap.get('O')[0].firewall=true;
    }
    else if (secondFW2==1)
    {
        myMap.get('P')[0].firewall=true;
    }
    else
    {
        myMap.get('Q')[0].firewall=true;
    }



    // THIRD Firewall
    var thirdFW = getRandomInt(2);
    if(thirdFW==0)
    {
        myMap.get('D')[0].firewall=true;
    }
    else if (thirdFW==1)
    {
        myMap.get('C')[0].firewall=true;
    }
    else
    {
        myMap.get('I')[0].firewall=true;
    }

}



function animateBackground(x,y) {

    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 7;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#00ecff";//"blue"

    ctx.font = "20px Arial";
    ctx.fillStyle = "#1d56dd";
    if(djScore<5) {
        ctx.fillText("Complexity = LOW", 1450, 200);
    }
    else if (djScore>=5 && djScore<10)
    {
        ctx.fillText("Complexity = MEDIUM", 1450, 200);
    }
    else
    {
        ctx.fillText("Complexity = HIGH", 1450, 200);
    }
    ctx.fillText("Dijkstra Score = "+djScore, 1450, 150);
    ctx.fillText("Mine-Track Score = "+animScore, 1450, 400);
    ctx.fillText("Best-Time (secs) = "+bestTime, 1450, 450);
    ctx.font = "Italic 15px Arial";

    ctx.fillText("Developed by Ronit Anandani", 25, 675);


    myMap.forEach(function(value, key) {
            //alert(key + ' = ' + value);
            ctx.beginPath()
            ctx.moveTo(value[0].x1,value[0].y1)
            ctx.lineTo(value[0].x2,value[0].y2);
            if (ctx.isPointInStroke(x, y)) {

                if(!value[0].select)
                {
                    value[0].select=true;
                    value[0].clr='red'
                    ctx.strokeStyle = value[0].clr
                    value[0].misc=1
                    oldX=value[0].x1
                    newX=value[0].x1+increment;
                    scoreMap.set(key,parseInt(value[0].wt));
                }
                else
                {
                    aLine='';
                    value[0].select=false;
                    value[0].clr='#00ecff'
                    ctx.strokeStyle = value[0].clr
                    scoreMap.delete(key);
                }
            }
            else{
                ctx.strokeStyle = value[0].clr
            }

        ctx.stroke();
        }
    );

    labelAnimMatrix(ctx);
    animateMove(ctx);

}


function sortString(str){
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

function calculateScore()
{
    var path="";
    var score=0;
    scoreMap.forEach(function(value, key) {

        path=path+key;
        score=score+value

    });

    path = sortString(path)

    if(pathCosts.has(path)) {
        var counter = 0;
        if (path.length == bestPath.length) {


            for (var i = 0; i < path.length; i++) {
                if (bestPath.indexOf(path[i]) > -1) {
                    counter = counter + 1;
                }
            }

            if (counter == path.length) {
                djScore++;

                alert("WOW - SUCCESS!!! YOU NAILED IT - SCORE="+djScore)

                path=""
                score=""
                counter=0
                initialize();
            }
            else
            {
                alert("SORRY TRY AGAIN - BEST PATH WAS [PATH]=" + bestPath + "-->[SCORE]=" + bestScore)

                path=""
                score=""
                counter=0
                initialize();
            }
        }

        else {
            alert("SORRY TRY AGAIN - BEST PATH WAS [PATH]=" + bestPath + "-->[SCORE]=" + bestScore)

            path=""
            score=""
            counter=0
            initialize();
        }
    }
    else if (path.length > 7) {
        alert("SORRY TRY AGAIN - BEST PATH WAS [PATH]=" + bestPath + "-->[SCORE]=" + bestScore)

        path=""
        score=""
        counter=0
        initialize();
    }
}


function handleMouseClick(e){
    //alert("Mouse Clicked");

    var canvas = document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;


    //alert(mouseX+"-"+mouseY);//alert(mouseY);
    if(animation){
        animateBackground(mouseX,mouseY);

        window.setTimeout(calculateAnimationScore, 2000);
        //calculateAnimationScore();
    }
    else {
        drawBackground(mouseX, mouseY);
        window.setTimeout(calculateScore, 300);
        //calculateScore();
    }

}


function getSlope(line)
{
    if(myMap.get(line)[0].x1 == myMap.get(line)[0].x2)
    {
        mOfLine=0;
    }
    else {
        mOfLine = (myMap.get(line)[0].y2 - myMap.get(line)[0].y1) / (myMap.get(line)[0].x2 - myMap.get(line)[0].x1)
    }
    bOfLine = (myMap.get(line)[0].y2) - (mOfLine * myMap.get(line)[0].x2)
    //alert(mOfLine+" (-M B-) "+bOfLine);
}

var animTimer;

function startAnimation() {
    //document.getElementById("b1").style.visibility = "hidden"
    animTimer = setInterval(function(){ startTimer(); }, 1000);
    animation=true;
    loadFirewall();
    animate();

}
function stopAnimation() {
    animation=false;
    cancelAnimationFrame(a);
    stopTimer();
    if(bestTime>Time)
    {
        bestTime=Time;
    }
    Time=0;
    
}
function startTimer(){
    setInterval(function () {document.getElementById("time").innerHTML = Time + " seconds";}, 1000);
    Time++
}

function stopTimer(){
    clearInterval(animTimer)
}

//all functions in this method will run at the speed of your computers frame rate
function animate(){

    a=requestAnimationFrame(animate);
    //initialize();
    //drawBackground();
    animateBackground();
    //doMove();

}

var increment=3;
var animY=false;

function animateMove(ctx)
{
    ctx.clearRect(newX-1,newY-1, 19, 19);

    myMap.forEach(function(value, key) {
        if(value[0].misc==1)
        {
            if(oldX==0 && newX==0)
            {
                oldX=value[0].x1;
                newX=value[0].x1 + increment;
            }


            var x2 = value[0].x2;
            var x1 = value[0].x1;
            //////// vertical lines
            var y1 = value[0].y1;
            var y2 = value[0].y2;

            if(x2>x1) {
                if (newX > x2) {
                    oldX = value[0].x1;
                    newX = value[0].x1 + increment;
                    value[0].misc=0;
                    //oldX=0
                    //oldY=0
                    //newX=0
                    //newY=0
                }
                getSlope(key);
                oldY= (mOfLine * oldX)+ bOfLine;
                oldX = oldX + increment;
                newX = newX + increment;
                newY= (mOfLine * newX)+ bOfLine;
                ctx.strokeStyle = "green"
                ctx.fillStyle="green"
                ctx.fillRect(newX, newY, 15, 15);
                //ctx.stroke();
                if(value[0].firewall)
                {
                    //alert("Firewall!!!  on Line->"+key)

                    ctx.fillStyle="red"
                    ctx.fillRect(newX, newY, 30, 30);

                    ctx.fillStyle="yellow"
                    ctx.fillRect(newX+7, newY+7, 15, 15);

                    ctx.font = "25px Arial";
                    ctx.fillStyle = "#ff3d38";
                    ctx.fillText("FIREWALL", oldX, oldY);


                    value[0].select=false;
                    value[0].clr='#00ecff'
                    ctx.strokeStyle = value[0].clr
                    scoreMap.delete(key);
                }
            }

            if(x1>x2) {
                if (newX < x2) {
                    oldX = value[0].x1;
                    newX = value[0].x1 - increment;
                    value[0].misc=0;
                    //oldX=0
                    //oldY=0
                    //newX=0
                    //newY=0
                }
                getSlope(key);
                oldY= (mOfLine * oldX)+ bOfLine;
                oldX = oldX - increment;
                newX = newX - increment;
                newY= (mOfLine * newX)+ bOfLine;
                ctx.strokeStyle = "green"
                ctx.fillStyle="green"
                ctx.fillRect(newX, newY, 15, 15);
                //ctx.stroke();
                if(value[0].firewall)
                {
                    //alert("Firewall!!!  on Line->"+key)

                    ctx.fillStyle="red"
                    ctx.fillRect(newX, newY, 30, 30);
                    ctx.fillStyle="yellow"
                    ctx.fillRect(newX+7, newY+7, 15, 15);

                    ctx.font = "25px Arial";
                    ctx.fillStyle = "#ff3d38";
                    ctx.fillText("FIREWALL", oldX, oldY);

                    value[0].select=false;
                    value[0].clr='#00ecff'
                    ctx.strokeStyle = value[0].clr
                    scoreMap.delete(key);
                }
            }


            if(x1==x2 && y2>y1) {

                if(animY)
                {
                    newY = newY + increment;
                    oldY = oldY + increment;
                    ctx.strokeStyle = "green"
                    ctx.fillStyle="green"
                    //alert(key+"-PRINT-NEW="+newX+"-"+newY);
                    ctx.fillRect(newX, newY, 15, 15);
                }
                else{
                    oldY = value[0].y1;
                    newY = value[0].y1 + increment;
                    oldX = x1;
                    newX = x2;

                    animY=true;
                }
                if(newY > y2) // stop traversing
                {
                    animY=false;
                    value[0].misc=0;
                }

            }

        }
            //alert(key + ' = ' + value);
        }
    );


}


function calculateAnimationScore()
{
    var path="";
    //var score=0;
    scoreMap.forEach(function(value, key) {
        path=path+key;
        //score=score+value

    });

    path = sortString(path)

    if(pathCosts.has(path)) {
        animScore++;
        alert("WOW - SUCCESS!!! YOU NAILED IT - SCORE="+animScore)
        path=""
        //score=""

        initialize();
        stopAnimation();
        startAnimation();
        Time=0;
    }
    else if (path.length > 7) {
        alert("SORRY TRY AGAIN - YOU MAXED OUT")
        path=""
        //score=""

        initialize();
        stopAnimation();
        startAnimation();
        Time=0;
    }
}








