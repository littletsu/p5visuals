let imgs = ['awa.jpg', '2.png', '3.png', '4.png', '5.jpg', '6.jpg', '7.png'];
const CANVAS_WIDTH = 800,
      CANVAS_HEIGHT = 800;
const random = (lim=255) => Math.floor(Math.random() * lim);
const randomArr = (arr) => arr[Math.floor(Math.random() * arr.length)];
const colortresh = (r, g, b, tresh=250) => r > tresh && g > tresh && b > tresh;
const rgbaeq = (r, g, b, a, eq=255) => r === eq && g === eq && b === eq && a === eq; 
const rgbtresh = (r, rtresh=250, g, gtresh=250, b, btresh=250) => r > rtresh && g > gtresh && b > btresh;
let videos;
let img;
let sound;
let curVid;
const updFr = () => frameRate(120);
let vidI = 0;
function preload() {
    imgs = imgs.map(path => loadImage(path));
    let videosJSON = loadJSON('videos.json', () => {
        videos = videosJSON.videos.map(video => {
            let frames = [];
            for(let i = 0; i < video[1]; i++) {
                frames.push(loadImage(`${videosJSON.path}/${video[0]}/${i+1}.png`));
            }
            return frames;
        })
        vidI = 0;
        curVid = videos[vidI];
    });
    soundFormats('mp3', 'ogg');
    sound = loadSound("audio")
    //console.log(videosJSON[0])
    
    img = randomArr(imgs);
    
}
let rimg;
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    updFr();
    if(sound) {
        sound.loop();
        sound.play();
    }
    imgs.forEach(img => {
        img.loadPixels();
        img.resize(width, height);
    })
    
}
let vframe = 0;
 
function draw() {
    rimg = randomArr(imgs);
    image(curVid[vframe], 0, 0, width, height);
    loadPixels();
    let d = pixelDensity();
    let shift =  Math.floor(Math.random() * 500);
    let color = random();
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            for (let i = 0; i < d; i++) {
                for (let j = 0; j < d; j++) {
                    // loop over
                    index = 4 * ((y * d + j) * width * d + (x * d + i));
                    let oindex = index;
                    let r = pixels[index];
                    let g = pixels[index+1];
                    let b = pixels[index+2];
                    let a = pixels[index+3];
                    
                    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    //index = index + (4*shift);
                    if(!colortresh(r, g, b, 1) || colortresh(r, g, b, 200) || rgbtresh(r, 129, g, 141, b, 169) || rgbtresh(r, 104, g, 51, b, 8)) {
                        
                        index = index - (9 * shift);
                        
                    }
                    
                    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    //b = b < 100 ? 0 : b*2 * Math.sin(index);
                    //g = g > 20 ? 0 : g * Math.sin(g);
                    
                    pixels[index] = r;
                    pixels[index+1] = g;
                    pixels[index+2] = b;
                    pixels[index+3] = a;
                    if(rgbtresh(r, 253, g, 250, b, 245)) {
                        
                        pixels[index] = rimg.pixels[oindex];
                        pixels[index+1] = rimg.pixels[oindex+1];
                        pixels[index+2] = rimg.pixels[oindex+2];
                        
                    }
                    //loadPixels();
                }
            }
        }
        
    }
    vframe++;
    if(vframe >= curVid.length) {
        vframe = 0;
        vidI++;
        if(vidI >= videos.length) {
            vidI = 0;
        }
        curVid = videos[vidI];
        updFr();
    };
    updatePixels();
}