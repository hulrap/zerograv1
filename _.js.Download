let MOUSE_EFFECT_STRANGE = 10 + sinNormalization(data.transferCount, 0, 10, false);
let DENSITY_MULTIPLIER = 5 + sinNormalization(data.transferCount, 0, 10, false);

window.addEventListener('load', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas1';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawSkateboardMask(ctx, x, y, width, height) {
        let controlPointOffset = height / 2;
        ctx.beginPath();
        ctx.moveTo(x, y + height / 2);
        ctx.lineTo(x + width, y + height / 2);
        ctx.bezierCurveTo(x + width + controlPointOffset, y + height / 2, x + width + controlPointOffset, y - height / 2, x + width, y - height / 2);
        ctx.lineTo(x, y - height / 2);
        ctx.bezierCurveTo(x - controlPointOffset, y - height / 2, x - controlPointOffset, y + height / 2, x, y + height / 2);
        ctx.closePath();
        ctx.clip();
        ctx.stroke();
    }

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * effect.canvasWidth;
            this.y = y;
            this.originX = x;
            this.originY = y;
            this.size = effect.gap / 2;
            this.color = color;
            this.density = Math.random() * DENSITY_MULTIPLIER + 1;
        }

        update() {
            let dx = this.effect.mouse.x - this.x;
            let dy = this.effect.mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            var maxDistance = this.effect.mouse.radius / 100;
            var force = (maxDistance - distance) / maxDistance;
            force = force < 0 ? 0 : force;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            if (distance < (this.effect.mouse.radius / 50) * Math.random() + this.size) {
                this.x -= directionX * 4 * Math.random();
                this.y -= directionY * 4 * Math.random();
            } else {
                if (this.x !== this.originX) {
                    let dx = this.x - this.originX;
                    this.x -= dx / (10 * Math.random());
                }
                if (this.y !== this.originY) {
                    let dy = this.y - this.originY;
                    this.y -= dy / (10 * Math.random());
                }
            }
        }

        draw() {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.maxTextWidth = canvasWidth * .9;
            this.fontSize = Math.min(canvasWidth, canvasHeight) / 5.4;
            this.lineHeight = this.fontSize;
            this.textX = canvasWidth / 2;
            this.textY = canvasHeight / 2 - this.lineHeight / 2;
            this.particles = [];
            this.gap = 1;
            this.mouse = { radius: canvasWidth * MOUSE_EFFECT_STRANGE, x: 0, y: 0 }
            window.addEventListener("mousemove", e => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
        }
        wrapText(text) {
            this.context.font = this.fontSize + 'px trebuchet ms';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.strokeStyle = 'rgba(0,0,0,0.00)';
            this.context.lineWidth = 0;
            this.context.fillStyle = 'white';
            let linesArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = '';
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + ' ';
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' ';
                    lineCounter++;
                } else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight / 2 - textHeight / 2;
            linesArray.forEach((el, index) => {
                this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
                this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            });
            this.convertToParticles();
        }
        convertToParticles() {
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }

        render() {
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }
    }

    let effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(textInput);

    function animate() {
        let skateboardWidth = canvas.width / 1;

        let skateboardHeight = canvas.height / 1;

        let skateboardX = canvas.width / 3 - skateboardWidth / 3;

        let skateboardY = canvas.height / 2;
        ctx.fillStyle = "rgba(255,255,255,0.00)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        drawSkateboardMask(ctx, skateboardX, skateboardY, skateboardWidth, skateboardHeight);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        effect.render();
        ctx.strokeStyle = 'rgba(255,255,255,0.00)';
        drawSkateboardMask(ctx, skateboardX, skateboardY, skateboardWidth, skateboardHeight);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        effect = new Effect(ctx, canvas.width, canvas.height);
        effect.wrapText(textInput);
    });
});
