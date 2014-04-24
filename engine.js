/* 
 * Copyright (C) 2014 cartagen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//Create an Array -- it's going to be the scrambled index of all words specified in the array vocabwords.
vocabindex=new Array()
for (i=0; i < vocabwords.length; i++) {
vocabindex[i]=i
}

scramble(vocabindex)
	//pickmatrix[0-3] contains the current vocabwords index values for each of the 4 picture buttons.
pickmatrix=new Array()
	//textline is just a string of 12 characters that contains the text to be drawn.
textline=new Array()
	//We apply case rules to textline, the product will go into formattedtextline.
formattedtextline=new Array()
	//prizestack contains a value for each prize earned in sequential order.
prizestack=new Array()
	//wrongresponse holds the number of wrong responses by the user. Useful for computing mean.
wrongresponse=0
	//rightresponse holds the number of correct responses by the user. Useful for computing mean.
rightresponse=0
	//meancorrect (1-100) is the mean correct responses.
meancorrect=0
	//count holds our current position in the vocabwords array we are advancing through.
count=0
	//rightpick holds the correct choice for the current problem.
rightpick=0
	//guesses is the number of incorrect responses per the current word problem.
guesses=0
	//lettercase(0-32) stores letter case view mode. 0 for lower-case, 32 for upper-case.
lettercase=32
	//slot is just a generic counter.
slot=0
	//rval is the dummy name of an interval method we will use.
rval=0
	//gamestate stores the current status of the game.
gamestate="Initialize"

var animStartFrame = 0
var animFrameRate = 0 
var animLength = 0
var animCurrentFrame = 0

pcntr = 0

procedureName = 0

bgrpath="bgr/"
chrpath="chr/"
picpath="pic/"
anmpath="anm/"
przpath="prz/"


function rotate() {
setpicks(count)
maketextline(vocabwords[vocabindex[count]])
dumptextline()
rightpick=count

count++
if (count == vocabwords.length) {
if (confirm("CONGRATULATIONS --- You have completed all words --- Play Again ?")) 
  {
  	var destination = "index.html?reload=true";
    window.location.replace(destination);
    window.location.href=destination;
  } else {
 	//FIX -- For now, go back to start, but this should close app
    var destination = "index.html?reload=true";
    window.location.replace(destination);
    window.location.href=destination;
         }
}
gamestate="UserInput"
//set big image to the ? picture.
changeimg(anmpath + "20" + ".gif", "bigmessage");
}

function judge(resp)
	{
	if(gamestate=="UserInput") { //This function executes ONLY if GAMESTATE = UserInput
		gamestate="ProcessingUserInput"; //We will now begin processing user input
		if(pickmatrix[resp]==rightpick) { givereward(resp) } //user's response correct?
		else { incorrect(resp) }
		//Update the mean (upper right corner of game field).
	}
	drawmean(); //update the mean score
}

function incorrect(resp){
	//Ugh! The user responded incorrectly!
	wrongresponse++
	//Turn the bgColor to dark gray.
	document.bgColor="#770000";
	//That's one guess used up! Increment guesses.
	guesses++
	//Replace image picked with a red "X".
	changeimg(anmpath + "128.gif","pick" + resp)
	//Execute the "Wrong" Animation
	animate(0, 300, 5, 0, "wrong")	
}

function givereward(resp){
	//then give the user a point!
	rightresponse++
	//set all 4 Buttons to the invisible image.
	clearbuttons();
		if (guesses<=maxguesses)
		{
		getprize(); //add prize to prizestack
		drawprizes(); //draw the prizes
		//display the chosen picture in the big image.	
		changeimg(picpath+vocabindex[count-1]+".gif", "bigmessage");
		if (Math.floor((prizestack.length)%lengthoflevel)==0)
			{
			document.bgColor="#2222FF";
			//If the user has acumulated enough prizes to pass the level, 
			//perform a super duper animation
			//set the big picture to PERFECT!
			changeimg(anmpath+"perfect.gif", "bigmessage");
			//draw the accumulated prizes onto the letter slots:
			//first, clear the letter slots:
			cleartextline();
			//now draw the prizes:
				firstPrize = (prizestack.length-lengthoflevel)
				for (i=0;i<(((prizestack.length-1)%lengthoflevel)+1);i++)
				{
				changeimg(przpath+prizestack[firstPrize+i]+".gif","text" + (i + 1))
				}
			//Lastly, do animation
			animate(50, 150, 40, 0, "setcomplete")
			} 
		else {
			document.bgColor="#118822";
			//Execute the correct-on-first-pick animation loop.
			animate(10, 140, 20, 0, "perfect")
			}
		} 
		else {
		//And Execute the less-exciting animation loop.
		document.bgColor="#118822";
		//set the button picked to GOOD JOB
		changeimg(anmpath + "goodjob.gif", "pick" + resp);
		animate(30, 80, 20, 0, "good")		
		}
	//Either case, reset guesses to zero.
	guesses=0
}


function animate(animStartFrame, animFrameRate, animLength, animCurrentFrame,procedureName){
		//alert ("animate(" + animStartFrame + "," + animFrameRate + "," + animLength + "," + animCurrentFrame + ")",animFrameRate);
		if (animCurrentFrame < animLength)
		{
			changeimg(anmpath + animArray[eval(animStartFrame + animCurrentFrame)] + ".gif","char")
			animCurrentFrame++
				if (procedureName=="perfect")
				{
				prizeanimation(animCurrentFrame);
				}
				if (procedureName=="setcomplete")
				{
				minimonkeyanimation(animCurrentFrame)
				}		
			setTimeout("animate(" + animStartFrame + "," + animFrameRate + "," + animLength + "," + animCurrentFrame + ",'" + procedureName + "')",animFrameRate)
		} else {
				continueGamePlay(procedureName);
				}
}

function continueGamePlay(procedureName)
{
if (procedureName=="wrong")
{
gamestate="UserInput";
}
if (procedureName=="perfect")
{
nextword();
}
if (procedureName=="good")
{
nextword();
}
if (procedureName=="setcomplete")
{
nextword();
}
}

function minimonkeyanimation(pcntr) {
changeimg(anmpath+((pcntr % 2)+17)+".gif","pick0")
changeimg(anmpath+((pcntr % 2)+17)+".gif","pick1")
changeimg(anmpath+((pcntr % 2)+17)+".gif","pick2")
changeimg(anmpath+((pcntr % 2)+17)+".gif","pick3")
}

function prizeanimation(pcntr) {
	//Call this function to draw a single frame of a 4-frame animation.
	//it just reads pcntr and mods it by 4 to decide which frame to show.
	//first clear all buttons.
	clearbuttons()
	//Draw the prize in one of the 4 pick's.
	changeimg(przpath+prizestack[prizestack.length-1]+".gif","pick" + (pcntr % 4))
}

function nextword(){
	//Execute rotate(), which prepares for the next problem.
rotate();
	//If this is a new round, reset the prize counter.
if (Math.floor((prizestack.length)%lengthoflevel)==0){
//alert("NEW LEVEL!");
resetprizes()
}
}

function scramble(targetobject){ 
for (i=0; i<targetobject.length; i++) {
destindex=Math.floor((Math.random() * (targetobject.length)))
buffr=targetobject[i]
targetobject[i]=targetobject[destindex]
targetobject[destindex]=buffr
}
}

function drawmean(){
meancorrect=Math.floor(((rightresponse)/(wrongresponse+rightresponse))*100)
changeimg(chrpath + (((Math.floor(meancorrect/100))*17)+32) + ".gif","mean0") 
changeimg(chrpath + (((Math.floor(meancorrect/10))%10)+48) + ".gif","mean1") 
changeimg(chrpath + ((meancorrect%10)+48) + ".gif","mean2") 
changeimg(chrpath + "37.gif","mean3") 
}

function changecase(){
if(gamestate=="UserInput") { //USER SHOULDN'T GET IN HERE IF ITs GAMESTATE is not UserInput
if (lettercase==32){
lettercase=0}
else{
lettercase=32
}
dumptextline()
}
}

function maketextline(strText) {
for (i=0; i<12; i++) {
textline[i]="32"
}
var startpos= Math.floor((12-strText.length)/2)
for (i=0;i<strText.length;i++){
textline[i+startpos]=strText.charCodeAt(i)
}
}

function dumptextline(){
for (i=0;i<12;i++){
formattedtextline[i]=textline[i]
if (textline[i]>64){
if (textline[i]<123){
if (textline[i]>96){
formattedtextline[i]=textline[i]-lettercase
}
}
}
changeimg(chrpath+formattedtextline[i]+".gif","text"+i);
}
}

function cleartextline(){
for (i=0;i<12;i++){
changeimg(chrpath+"32.gif","text"+i);
}
}

function getprize(){
prizestack[prizestack.length]=Math.floor(Math.random() * 16)
}

function drawprizes(){
changeimg(przpath+prizestack[prizestack.length-1]+".gif","prize" + ((prizestack.length-1)%lengthoflevel))
}

function resetprizes(){
for (i=0;i<10;i++){
changeimg(przpath+"16.gif","prize" + i)
}
}

function clearbuttons() {
	changeimg(anmpath + "empty" +".gif", "pick0");
	changeimg(anmpath + "empty" +".gif", "pick1");
	changeimg(anmpath + "empty" +".gif", "pick2");
	changeimg(anmpath + "empty" +".gif", "pick3");
}

function setpicks(count){
randnum=Math.floor((Math.random() * 4))
randnum+=1
pickmatrix[0]=(randnum*4)
pickmatrix[1]=(randnum*5)
pickmatrix[2]=(randnum*6)
for (i=0;i<3;i++){
if((pickmatrix[i]+count)>=vocabwords.length){
pickmatrix[i]=count-pickmatrix[i];
//alert('pickmatrix slot ' + i + " = " + count-pickmatrix[i]);
}
else {pickmatrix[i]=pickmatrix[i]+count;
//alert('pickmatrix slot ' + i + " = " + pickmatrix[i]+count);
}
}
pickmatrix[3]=count

//changeimg(picpath+vocabindex[count]+".gif", "bigmessage");

scramble(pickmatrix)
changeimg(picpath + vocabindex[pickmatrix[0]] + ".gif","pick0")
changeimg(picpath + vocabindex[pickmatrix[1]] + ".gif","pick1")
changeimg(picpath + vocabindex[pickmatrix[2]] + ".gif","pick2")
changeimg(picpath + vocabindex[pickmatrix[3]] + ".gif","pick3")
}

function changeimg(srcimage,destimage) {
document[destimage].src=srcimage
}

function GoHome(){
if (confirm("Are you sure you want to quit this game?")) {
//FIX -- This should close game
var destination = "index.html";
window.location.replace(destination);
window.location.href=destination;
}
}
	
function NewGame()
{
alert("Vocabumonkey Android Edition 1.0 \n Copyright (C) 2014 Pedro Cartagena \n Copyright (C) 1998, 2000, 2001  John Schnittker. \n Vocabumonkey is free software. \n You can redistribute it and/or modify it \n under the terms of the GNU General Public License (GPL). \n For the latest version, \n please visit us at www.vocabumonkey.org ...");
rotate();
}


