document.addEventListener("DOMContentLoaded", function() {
    let app = document.getElementById("app");

    let streams = [];

    function setup() {
        let canvas = createCanvas(windowWidth, windowHeight);
        canvas.parent('app');
        background(0);

        let x = 0;
        for (let i = 0; i <= width / 20; i++) {
            let stream = new Stream();
            stream.generateSymbols(x, random(-1000, 0));
            streams.push(stream);
            x += 20;
        }
        textSize(20);
    }

    function draw() {
        background(0, 150);
        streams.forEach(stream => {
            stream.render();
        });
    }

    class Symbol {
        constructor(x, y, speed, first) {
            this.x = x;
            this.y = y;
            this.value = '';
            this.speed = speed;
            this.switchInterval = round(random(2, 20));
            this.first = first;
            this.setToRandomSymbol();
        }

        setToRandomSymbol() {
            if (frameCount % this.switchInterval === 0) {
                this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
            }
        }

        rain() {
            this.y = (this.y >= height) ? 0 : this.y + this.speed;
        }
    }

    class Stream {
        constructor() {
            this.symbols = [];
            this.totalSymbols = round(random(8, 35));
            this.speed = random(5, 15);
        }

        generateSymbols(x, y) {
            let first = round(random(0, 4)) === 1;
            for (let i = 0; i <= this.totalSymbols; i++) {
                let symbol = new Symbol(x, y, this.speed, first);
                this.symbols.push(symbol);
                y -= 20;
                first = false;
            }
        }

        render() {
            this.symbols.forEach(symbol => {
                if (symbol.first) {
                    fill(85, 230, 165);  // aquamarine
                } else {
                    fill(85, 230, 165);  // aquamarine
                }
                text(symbol.value, symbol.x, symbol.y);
                symbol.rain();
                symbol.setToRandomSymbol();
            });
        }
    }

    // Add a delay before showing the setup function
    setTimeout(function() {
        setup();
        app.style.display = "block"; // Show the app after setup completes
    }, 2000); // Delay of 2000 milliseconds (2 seconds)

    window.setup = function() {
        // No need to do anything here since setup has already been called
    };

    window.draw = draw;
});
