    // Game Constant
let inputDir = { x:0, y:0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3'); 
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
const board = document.querySelector('.board');
let speed = 8;
let lastPaintTime =0;
let snakeArray = [
    {x:13, y:15}
]
let food ={ x:6, y:7 };

    // Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // body khud se takraya
    for(let i=1; i< snakeArray.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true
        } 
    }
    if(snake[0].x >=18 || snake[0].x <=0 && snake[0].y >=18 || snake[0].y<=0 ){ 
        return true;
    }
    return false;   
}

function gameEngine() {
        
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over. Press any key to play again! ");
        snakeArray= [ {x:13, y:15} ];
        musicSound.play();
        score = 0;
    }

    // Eaten Food then increment
    if( snakeArray[0].y ===food.y && snakeArray[0].x ===food.x ){
        foodSound.play();
        snakeArray.unshift( {x: snakeArray[0].x + inputDir.x, y:snakeArray[0].y + inputDir.y} );
        let a = 0;
        let b = 17;
        food = { x: Math.round(a+(b-a)* Math.random() ) , y:Math.round(a+(b-a)* Math.random() )}
    }

    // Moving the snake
    for(let i =snakeArray.length-2; i>=0; i-- ){
        snakeArray[i+1] = {...snakeArray[i] }; 
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Display Snake
    board.innerHTML = "";
    snakeArray.forEach( (e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x; 
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display Food
    foodElement = document.createElement('div'); 
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


    // Main Logic Start Here 
window.requestAnimationFrame(main); 
window.addEventListener( 'keydown', e => { 
    inputDir = { x:0 , y: 1};
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;    
    }
})