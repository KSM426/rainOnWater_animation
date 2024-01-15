const PI2 = Math.PI * 2;
const waveColor = 'rgba(199, 218, 255, ';
const innerRate = 0.75;


export class Wave {
    constructor(x, y, lambda, alphaAcc, speed) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.alphaAcc = alphaAcc;
        this.alpha = [0, 0.1, 0.5, 0.1, 0];
        this.lambda = lambda;
        this.speed = speed;
    }

    resize(stageWidth, stageHeight) {
        
    }

    animate(ctx) {
        this.r += this.speed;

        const gradient = ctx.createRadialGradient(this.x, this.y, (this.r * (1-innerRate) > this.lambda ? this.r - this.lambda: this.r * innerRate),
        this.x, this.y, this.r);

        for(let i=0; i<5; i++){
            this.alpha[i] *= this.alphaAcc;
        }

        gradient.addColorStop(0, 'rgba(0, 0, 0, ' + String(this.alpha[0]) + ')');
        gradient.addColorStop(0.3, 'rgba(0, 0, 0, ' + String(this.alpha[1]) + ')');
        gradient.addColorStop(0.5, waveColor + String(this.alpha[2]) + ')');
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, ' + String(this.alpha[3]) + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 0, ' + String(this.alpha[4]) + ')');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, PI2);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();
    }
}