
const light = document.querySelector('.light');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');
const gameLogo = document.querySelector('.gameLogo');
const menu = document.querySelector('.menu');


light.addEventListener('click',lightfunction);
medium.addEventListener('click',mediumfunction);
hard.addEventListener('click',hardfunction);

const allsettings = {
    lighttraffic: 3,
    lightspeed: 3,
    mediumtraffic: 3,
    mediumspeed: 5,
    hardtraffic: 3,
    hardspeed: 8
}

function deletemenu(){
    light.classList.remove('light1');
    medium.classList.remove('medium1');
    hard.classList.remove('hard1');
    gameLogo.classList.remove('gameLogo1');
    menu.remove();

}

function lightfunction(){
    deletemenu();
    allGame(allsettings.lighttraffic,allsettings.lightspeed);
}
function mediumfunction(){
    deletemenu();
    allGame(allsettings.mediumtraffic,allsettings.mediumspeed);
}
function hardfunction(){
    deletemenu();
    allGame(allsettings.hardtraffic,allsettings.hardspeed);
}

function allGame(trafficforgame,speedforgame){
    const score = document.querySelector('.score1');
    const start = document.querySelector('.start1');
    
    const gameArea = document.querySelector('.gameArea1');
    start.classList.add('start');
    score.classList.add('score');
    gameArea.classList.add('gameArea');
    const text = 'For start playing tap on this button!';
    start.innerHTML = text;
    const car = document.createElement('div');
    car.classList.add('car');

    let motorsound = new Audio('./sounds/motorsound.mp3');
    let crashboom = new Audio('./sounds/crashboom.mp3');



    start.addEventListener('click', startGame);

    document.addEventListener('keydown',startRun);
    document.addEventListener('keyup', stopRun);


    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false
    };

    const setting = {
        start: false,
        score: 0,
        speed: speedforgame,
        traffic: trafficforgame
    }

    function getQuantityElements(heightElement){
        return document.documentElement.clientHeight / heightElement + 1;
    }

    function startGame(){
        
        start.classList.add('hide');
        gameArea.innerHTML = '';
        car.style.left = '125px';
        car.style.top = 'auto';
        car.style.bottom = '10px';


        for(let i = 0; i < getQuantityElements(100) ;i++){
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (i*100) + 'px';
            line.y = i*100;
            gameArea.appendChild(line);
        }

        for(let i = 0; i < getQuantityElements(100 * setting.traffic); i++){
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.y = -100 * setting.traffic * (i+1);
            enemy.style.left =Math.floor( Math.random() *( gameArea.offsetWidth-50)) + 'px';
            enemy.style.top = enemy.y + 'px';
            enemy.style.background = randomEnemy();


            gameArea.appendChild(enemy);
        }
        setting.score = 0;
        setting.start = true;
        gameArea.appendChild(car);
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        
        requestAnimationFrame(playGame);
    };

    function playGame(){
        
        
        if(setting.start){
            
            setting.score += setting.speed;
            score.innerHTML = 'SCORE<br>' + setting.score;
            moveRoad();
            moveEnemy();
            if(keys.ArrowLeft && setting.x >0){
                setting.x-=setting.speed;
            }
            if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
                setting.x+=setting.speed;
            }
            if(keys.ArrowDown && setting.y <(gameArea.offsetHeight - car.offsetHeight)){
                setting.y += setting.speed;
            }
            if(keys.ArrowUp && setting.y > 0){
                setting.y -= setting.speed;
                motorsound.play();
            }
            car.style.left = setting.x + 'px';
            car.style.top = setting.y + 'px';
            requestAnimationFrame(playGame);
        };
    };

    function startRun(){
        event.preventDefault();
        keys[event.key] = true;
        

    };

    function stopRun(){
        event.preventDefault();
        keys[event.key] = false;
    };

    function moveRoad(){
        let lines = document.querySelectorAll('.line');
        lines.forEach(function(line){
            line.y += setting.speed;
            line.style.top = line.y + 'px';
            if(line.y>=document.documentElement.clientHeight){
                line.y=-100;
            }
        })
    }

    function moveEnemy(){
        let enemy = document.querySelectorAll('.enemy');
        enemy.forEach(function(item){
            let carRect = car.getBoundingClientRect();
            let enemyRect = item.getBoundingClientRect();


            if(carRect.top<=enemyRect.bottom &&
                carRect.right>=enemyRect.left && carRect.left<=enemyRect.right &&
                carRect.bottom>=enemyRect.top){
                    
                    crashboom.play();
                    setting.start = false;
                    start.classList.remove('hide');
                    start.style.top = score.offsetHeight;


            }
            item.y += setting.speed / 2;
            item.style.top = item.y + 'px';
            if(item.y>=document.documentElement.clientHeight){
                item.y = -100 * setting.traffic;
                item.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px';

            }

        });
        


    }


    function randomEnemy(){
        let skin = (Math.floor(Math.random()*10))%3;
        console.log(skin);
        let enemyskin;
        if(skin == 0){
            enemyskin = 'transparent url("./image/enemy.png") center / cover no-repeat';
        }
        if(skin == 1){
            enemyskin = 'transparent url("./image/enemy2.png") center / cover no-repeat';
        }
        if(skin == 2){
            enemyskin = 'transparent url("./image/enemy4.png") center / cover no-repeat';
        }
        return enemyskin;
    }
}


