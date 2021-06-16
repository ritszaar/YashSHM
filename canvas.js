let canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;

let c = canvas.getContext('2d');

let yash = new Image();
yash.src = 'yash.jpg';
let threshold = 123;
let t = 0;

yash.addEventListener('load',
    function () {
        c.drawImage(yash, 0, 0);

        let yashPixels = c.getImageData(0, 0, canvas.width, canvas.height);
        let newPixels = new ImageData(canvas.width, canvas.height);

        function draw() {
            for (let i = 0; i < 4 * (canvas.width * canvas.height); i += 4) {
                let r = yashPixels.data[i];
                let g = yashPixels.data[i + 1];
                let b = yashPixels.data[i + 2];
                let br = (r + g + b)/3;
                if (br < threshold) br = 0;
                else br = 255;

                newPixels.data[i] = br;
                newPixels.data[i + 1] = br;
                newPixels.data[i + 2] = br;
                newPixels.data[i + 3] = 255;
            }

            c.putImageData(newPixels, 0, 0);
            threshold = 50 * Math.sin(t) + 100;
            t += 0.03;
            requestAnimationFrame(draw);
        }
        draw();


    }
);
