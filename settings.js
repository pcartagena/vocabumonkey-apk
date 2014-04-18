//Vocabumonkey 1.0, Copyright (C) 1998, 2000, 2001 John Schnittker. 
//Vocabumonkey comes with ABSOLUTELY NO WARRANTY; This is free software, and you are welcome to 
//redistribute and/or modify it under the terms of the GNU General Public License;

//rules of the game
//These constants control the rules for the game. You can modify them and therefore modify the game.
//maxguesses sets the maximum number of guesses allowed per problem(and still be eligible for a prize).
maxguesses=0
//lengthoflevel sets the number of prizes that must be earned to move to the next level.
lengthoflevel=10

//master word list 
//vocabwords array contains all the words to be used in vocabumonkey.
//You may add or remove words from this array as long as you make the same changes to the corresponding image files in the pic/ folder.
vocabwords=new Array("goat","axe","egg","hat","pencil","cat","bee","sun","fan","dog","lemon","moon","nose","road","tie","kangaroo","bat","fish","hand","arm","eye","zebra","ladder","octopus","pants","sock","carrot","tomato","desk","window","banana","tree","cup","apple","house","ear","fork","jewel","lobster","mop","nine","pig","rock","table","cow","one","two","spider","lizard","turtle","snake","crab","clam","six","zero","four","five","eight","lion","owl","duck","seven","mouth","ring")
//frames of animation.
//animArray contains the sequential frames of animation.
animArray = new Array()
// This animation is the sad face when vocabumonkey guesses wrong:
animArray[0]=12
animArray[1]=8
animArray[2]=8
animArray[3]=10
animArray[4]=8
// This animation is a cool dancing routine:
animArray[10]=12
animArray[11]=3
animArray[12]=5
animArray[13]=3
animArray[14]=15
animArray[15]=11
animArray[16]=19
animArray[17]=12
animArray[18]=15
animArray[19]=0
animArray[20]=6
animArray[21]=1
animArray[22]=6
animArray[23]=0
animArray[24]=6
animArray[25]=1
animArray[26]=6
animArray[27]=0
animArray[28]=6
animArray[29]=15
//This is a brief dance animation:
animArray[30]=6
animArray[31]=1
animArray[32]=13
animArray[33]=1
animArray[34]=6
animArray[35]=0
animArray[36]=14
animArray[37]=0
animArray[38]=6
animArray[39]=1
animArray[40]=13
animArray[41]=1
animArray[42]=6
animArray[43]=0
animArray[44]=14
animArray[45]=0
animArray[46]=6
animArray[47]=1
animArray[48]=13
animArray[49]=3


// This animation is for SET COMPLETE:
animArray[50]=21
animArray[51]=16
animArray[52]=22
animArray[53]=16
animArray[54]=21
animArray[55]=16
animArray[56]=22
animArray[57]=16
animArray[58]=21
animArray[59]=16
animArray[60]=22
animArray[61]=16
animArray[62]=21
animArray[63]=16
animArray[64]=22
animArray[65]=16
animArray[66]=21
animArray[67]=16
animArray[68]=22
animArray[69]=16
animArray[70]=21
animArray[71]=16
animArray[72]=22
animArray[73]=16
animArray[74]=21
animArray[75]=16
animArray[76]=22
animArray[77]=16
animArray[78]=21
animArray[79]=16
animArray[80]=22
animArray[81]=16
animArray[82]=21
animArray[83]=16
animArray[84]=22
animArray[85]=16
animArray[86]=21
animArray[87]=16
animArray[88]=22
animArray[89]=15
