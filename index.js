const firstString = document.querySelector('.greenstring.first');
const secondString = document.querySelector('.greenstring.second');
const thirdString = document.querySelector('.greenstring.third');
const mouseSpeed = 12;
const scoreBoard = document.querySelector('.score-board h1');
const ost = new Audio('./resources/vita.mp3');
const toggleMusic = document.querySelector('.toggle-music');

let gameScore = 0;

scoreBoard.textContent = `Ваш счет: ${gameScore}`;

const createNewMouse = () => {
    const rand = Math.round(Math.random());

    if (rand == 1) {
        const mouse = document.createElement('div');
        mouse.classList.add('mouse');
        const rand2 = Math.ceil(Math.random()*3);
        if (rand2 == 1) {
            firstString.insertAdjacentElement('beforeend', mouse);
        } else if (rand2 == 2) {
            secondString.insertAdjacentElement('beforeend', mouse);
        } else {
            thirdString.insertAdjacentElement('beforeend', mouse);
        }

        mouse.dataset.right = 0;

        const checkCollisions = mouse => {
            catto = document.querySelector('.catto');
            if (catto != undefined &&
                catto.getBoundingClientRect().right > mouse.getBoundingClientRect().left &&
                catto.parentNode == mouse.parentNode) {
                    gameScore += 10;
                    scoreBoard.textContent = `Ваш счет: ${gameScore}`;
                    catto.classList.add('bite');
                    setTimeout(() => {
                        catto.classList.remove('bite');
                    }, 500);
                    return true;
            } else return false;
        }

        const moveFunc = () => {
            mouse.dataset.right = Number(mouse.dataset.right) + mouseSpeed;
            if (
                mouse.dataset.right < mouse.parentNode.scrollWidth - mouse.scrollWidth
                && !checkCollisions(mouse)
                ) {
                mouse.style.right = `${Number(mouse.dataset.right)}px`;
            } else {
                clearInterval(moving);
                mouse.parentNode.removeChild(mouse);
            }
        }

        let moving = setInterval(moveFunc, 16);
    };
}

const createCatto = () => {
    catto = document.createElement('div');
    catto.classList.add('catto');
    firstString.insertAdjacentElement('afterbegin', catto);

    document.addEventListener('keydown', e => {
        if (e.key == 'ArrowDown') {
            if (catto.parentNode == firstString) {
                catto.parentNode.removeChild(catto);
                secondString.insertAdjacentElement('afterbegin', catto);
                catto.classList.add('jump');
                setTimeout(() => {
                    catto.classList.remove('jump');
                }, 500);
            } else if (catto.parentNode == secondString) {
                catto.parentNode.removeChild(catto);
                thirdString.insertAdjacentElement('afterbegin', catto);
                catto.classList.add('jump');
                setTimeout(() => {
                    catto.classList.remove('jump');
                }, 500);
            };
        } else if (e.keyCode == 38) {
            if (catto.parentNode == secondString) {
                catto.parentNode.removeChild(catto);
                firstString.insertAdjacentElement('afterbegin', catto);
                catto.classList.add('jump');
                setTimeout(() => {
                    catto.classList.remove('jump');
                }, 500);
            } else if (catto.parentNode == thirdString) {
                catto.parentNode.removeChild(catto);
                secondString.insertAdjacentElement('afterbegin', catto);
                catto.classList.add('jump');
                setTimeout(() => {
                    catto.classList.remove('jump');
                }, 500);
            };
        }
    })
}

setInterval(createNewMouse, 500);
createCatto();
toggleMusic.addEventListener('click', () => {
    if (ost.paused) {
        ost.play();
    } else {
        ost.pause();
    }
});