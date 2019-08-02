'use strict';
let interval;
let timer=0;
let started=false;
function startInterval(){
	if(!started){
			interval = setInterval(()=>{
			timer++;
			document.getElementById('time').innerHTML = timer+'s';
		},1000);	
	}
	started=true;//this function is called everytime the mouse click event triggers so to run setInterval() once variable started is used
}
function init() //setting the stage
{ 
	let arr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
 	arr.sort(()=> Math.random()-0.5);
 	let a = document.getElementsByTagName('td');
 	let x=-1,y=-1,flag=0;
 	
 	for(let i=0; i< arr.length; i++)
 	{
 		//filling the grid with shuffled array
     	a[i].getElementsByTagName('span')[0].innerHTML = arr[i];	
 
     	//Mouse Over Event
     	a[i].addEventListener('mouseover',() =>{
     		if(a[i].style.background != 'red' && a[i].style.background != 'purple')
				a[i].style.background = 'orange';
     	});

     	//Mouse Out Event
     	a[i].addEventListener('mouseout',() =>{
     		if(a[i].style.background != 'red' && a[i].style.background != 'purple')
				a[i].style.background = 'blue';
     	});

     	//Mouse Click Event 
     	a[i].addEventListener('click',() =>{

     		startInterval(); //starting the timer

     		if(a[i].style.background == 'purple') //no change if user clicks matched element again
     			a[i].style.background = 'purple';
     		else if(x==-1){
     			x=i;
     			a[x].style.background = 'red';
				a[x].getElementsByTagName('span')[0].style.color = 'white';
				a[x].getElementsByTagName('span')[0].style.display = 'block';
     		}
     		else if(y==-1){
     			y=i;
     			a[y].style.background = 'red';
				a[y].getElementsByTagName('span')[0].style.color = 'white';
				a[y].getElementsByTagName('span')[0].style.display = 'block';
				setTimeout(()=>{
					if(arr[x]==arr[y] && x!=y)//checking if two different blocks are clicked having same elements or not
	     			{
	     					a[x].style.background = 'purple'; //first element
							a[y].style.background = 'purple'; //matching second element
							flag++;
				     		if(flag==8){ //checking if game is over or not
				     			clearInterval(interval);
				     			alert(`Your completed the game in ${timer} seconds`);
				     			document.location.reload(false);
				     		}
	     			}
	     			else
	     			{
	     				document.getElementById('grid').style.border = '5px solid red';
	     				a[x].style.background = 'blue'; //setting the blocks back to blue if elements don't match
	     				a[y].style.background = 'blue';	//setting the blocks back to blue if elements don't match
	     				a[x].getElementsByTagName('span')[0].style.display = 'none';
	     				a[y].getElementsByTagName('span')[0].style.display = 'none';
	     				setTimeout(()=>{
		     				document.getElementById('grid').style.border = '5px solid black';
	     				},100)
	     					
	     			}
	     			x=y=-1;//resetting x and y value to match other two elements
				},200);		
     		} 
     	});
    }
}