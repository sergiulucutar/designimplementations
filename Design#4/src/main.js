//Elements
const backgroundEl = document.querySelector('.background');

//3D Background
const bounds = {
    width: window.innerWidth,
    height: window.innerHeight
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, bounds.width / bounds.height, .1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(bounds.width, bounds.height);
backgroundEl.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight('white', .5);
scene.add(ambientLight);

const aboveLight = new THREE.PointLight('white', 1);
aboveLight.position.set(300, 500, 100);
scene.add(aboveLight);

const belowLight = new THREE.PointLight('white', .8);
belowLight.position.set(-15, -500, -400);
scene.add(belowLight);

const balls = [{
    position: {
        x: -14,
        y: -8,
        z: 0
    },
    color: '#CF494A'
}, {
    position: {
        x: -35,
        y: -12,
        z: -200
    },
    r: 6,
    color: '#C68024'
}, {
    position: {
        x: -25,
        y: 12,
        z: 0
    },
    r: 4,
    color: '#D45E28'
}, {
    position: {
        x: -12,
        y: -1,
        z: 70
    },
    color: '#CA916C'
}, {
    position: {
        x: 8,
        y: -15,
        z: 5
    },
    color: '#BA6665'
}];

let isAnimationPlaying = false;
let menuHovered = false;
let currentTimeline;
function draw() {
    renderer.render(scene, camera);
}

function update() {
    if(isAnimationPlaying) {
        draw();
    }

    requestAnimationFrame(update);
}

function moveCamera(newX) {
    const timeline = new TimelineMax({
        onComplete: () => {
            isAnimationPlaying = false;
        }
    });

    isAnimationPlaying = true;
    timeline.to(camera.position, 1, {
        x: newX,
        ease: Power2.easeOut
    });
    return timeline;
}

window.onload = function() {
    document.querySelector('menu').addEventListener('mouseenter', () => {
        if(!menuHovered) {
            if(currentTimeline) {
                currentTimeline.kill();
            }
            currentTimeline = moveCamera(2);
            menuHovered = true;
        }
    });

    document.querySelector('menu').addEventListener('mouseleave', () => {
        if(menuHovered) {
            if(currentTimeline) {
                currentTimeline.kill();
            }
            currentTimeline = moveCamera(0);
            menuHovered = false;
        }
    });


    balls.forEach(ball => {
        const geometry = new THREE.SphereGeometry(ball.r || 3, 100, 100);
        const material = new THREE.MeshPhongMaterial({color: ball.color, shininess: 50});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(ball.position.x, ball.position.y, ball.position.z);
        scene.add(mesh);
    });

    update();
    draw();
}