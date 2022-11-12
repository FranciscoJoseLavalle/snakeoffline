const canvas = document.querySelector('canvas');
canvas.height = 300;
canvas.width = 300;

const ctx = canvas.getContext('2d');

const puntos = document.querySelector('.points');
let points = 0;

const getSnake = ({ x = 145, y = 145 }) => ({
    x,
    y,
    w: 10,
    h: 10,
    speed: .5,
    moving: null,
    body: [
        { x: 140, y: 140 },
        { x: 150, y: 140 },
        { x: 160, y: 140 },
        { x: 170, y: 140 },
    ],
    draw() {
        ctx.strokeStyle = 'orange'
        for (let bod of this.body) {
            ctx.beginPath()
            ctx.rect(bod.x, bod.y, this.w, this.h);
            ctx.stroke()
        }
    },
    moveUp() {
        // this.y -= this.speed
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i + 1] == undefined) {
                this.body[i].y -= this.w
            } else {
                if (this.body[i].y != this.body[i + 1].y) {
                    this.body[i].y = this.body[i + 1].y
                }
                this.body[i].x = this.body[i + 1].x
            }
            console.log(this.body[i].x)
        }
    },
    moveDown() {
        // this.y += this.speed
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i + 1] == undefined) {
                this.body[i].y += this.w
            } else {
                if (this.body[i].y != this.body[i + 1].y) {
                    this.body[i].y = this.body[i + 1].y
                }
                this.body[i].x = this.body[i + 1].x
            }
        }
    },
    moveLeft() {
        // this.x -= this.speed
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i + 1] == undefined) {
                this.body[i].x -= this.w
            } else {
                if (this.body[i].y != this.body[i + 1].y) {
                    this.body[i].y = this.body[i + 1].y
                }
                this.body[i].x = this.body[i + 1].x
            }
            console.log(this.body[i].x)
        }
    },
    moveRight() {
        // this.x += this.speed
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i + 1] == undefined) {
                this.body[i].x += this.w
            } else {
                if (this.body[i].y != this.body[i + 1].y) {
                    this.body[i].y = this.body[i + 1].y
                }
                this.body[i].x = this.body[i + 1].x
            }
            console.log(this.body[i].x)
        }
    },
    contains(b) {
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        return (x < b.x + b.w) &&
            (x + this.w > b.x) &&
            (y < b.y + b.h) &&
            (y + this.h > b.y)
    }
})
const getApple = ({ x = 70, y = 70 }) => ({
    x,
    y,
    w: 10,
    h: 10,
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    contains(b) {
        return (this.x < b.x + b.w) &&
            (this.x + this.w > b.x) &&
            (this.y < b.y + b.h) &&
            (this.y + this.h > b.y)
    }
})

const snake = getSnake({});
const apple = getApple({})

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#131'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    checkCollitions()
    switch (snake.moving) {
        case 'up':
            snake.moveUp()
            break;
        case 'down':
            snake.moveDown()
            break;
        case 'left':
            snake.moveLeft()
            break;
        case 'right':
            snake.moveRight()
            break;
        case 'no':
            break;
    }
    snake.draw()
    apple.draw()
    // requestAnimationFrame(update);
}

setInterval(() => {
    update()
}, 100)
// requestAnimationFrame(update);

const checkCollitions = () => {
    if (snake.contains(apple)) {
        apple.x = Math.random() * (canvas.width - 20)
        apple.y = Math.random() * (canvas.height - 20)

        snake.body.unshift({ x: snake.body[0].x, y: snake.body[0].y })

        points++;
        puntos.textContent = `Puntos: ${points}`
    }
    if (snake.body[snake.body.length - 1].x > canvas.width - 10 || snake.body[snake.body.length - 1].x < 0 || snake.body[snake.body.length - 1].y > canvas.height - 10 || snake.body[snake.body.length - 1].y < 0) {
        endGame()
    }
    // for (let i = 0; i < snake.body.length; i++) {
    //     if (snake.body[i - 1] !== undefined) {
    //         if (snake.body[snake.body.length - 1].x == snake.body[i - 1].x || snake.body[snake.body.length - 1].y == snake.body[i - 1].y) {
    //             endGame()
    //         }
    //     }
    // }
}

const endGame = () => {
    snake.moving = 'no';
    setTimeout(() => {
        snake.body = [
            { x: 140, y: 140 },
            { x: 150, y: 140 },
            { x: 160, y: 140 },
            { x: 170, y: 140 },
        ]

        points = 0;
        puntos.textContent = `Puntos: ${points}`
    }, 500)
}

addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 38:
            snake.moveUp()
            snake.moving = 'up';
            break;
        case 40:
            snake.moveDown()
            snake.moving = 'down';
            break;
        case 37:
            snake.moveLeft()
            snake.moving = 'left';
            break;
        case 39:
            snake.moveRight()
            snake.moving = 'right';
            break;
    }
})

document.querySelector('.moveUp').addEventListener('click', () => {
    snake.moveUp()
    snake.moving = 'up';
})
document.querySelector('.moveDown').addEventListener('click', () => {
    snake.moveDown()
    snake.moving = 'down';
})
document.querySelector('.moveLeft').addEventListener('click', () => {
    snake.moveLeft()
    snake.moving = 'left';
})
document.querySelector('.moveRight').addEventListener('click', () => {
    snake.moveRight()
    snake.moving = 'right';
})