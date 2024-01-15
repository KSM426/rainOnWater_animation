import { Wave } from './wave.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.mousePosX = this.stageWidth / 2;
        this.mousePosY = this.stageHeight / 2;
        
        this.items = [];
        // this.n = new Wave(this.stageWidth / 2, this.stageHeight / 2);
        
        document.addEventListener('pointerdown', this.onDown.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
    
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        // console.log(this.items.length);

        if(Math.random()*100 > 80){
            this.items.push(new Wave(Math.random()*this.stageWidth, Math.random()*this.stageHeight, 
            40 + Math.random() * 20, 0.9 + Math.random()/13, 3 + Math.random() * 4));
        }

        for(let i=0; i<this.items.length; i++) {
            this.items[i].animate(this.ctx);
        }
        
        for(let i=0; i<this.items.length; i++) {
            if(this.items[i] && this.items[i].r > this.stageWidth + this.stageHeight) {
                this.items.splice(i, 1);
            }
        }
    }

    onDown(e) {
        this.mousePosX = e.clientX;
        this.mousePosY = e.clientY;

        this.items.push(new Wave(this.mousePosX, this.mousePosY, 50, 0.98, 5));
    }
}

window.onload = () => {
    new App();
};