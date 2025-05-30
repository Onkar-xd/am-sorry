alert('Click on the page  if music notto play :)')

let src = "sorry.gif"
var width, height, container, canvas, ctx, points, target, animateHeader = true;

function init() {
    initHeader();
    initAnimation();
    addListeners();
}

function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = {
        x: width / 2,
        y: height / 2
    };

    container = document.getElementById('connecting-dots');
    container.style.height = height + 'px';

    canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    points = [];
    for (var x = 0; x < width; x = x + width / 20) {
        for (var y = 0; y < height; y = y + height / 20) {
            var px = x + Math.random() * width / 200;
            var py = y + Math.random() * height / 100;
            var p = {
                x: px,
                originX: px,
                y: py,
                originY: py
            };
            points.push(p);
        }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for (var j = 0; j < points.length; j++) {
            var p2 = points[j]
            if (!(p1 == p2)) {
                var placed = false;
                for (var k = 0; k < 5; k++) {
                    if (!placed) {
                        if (closest[k] == undefined) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }

                for (var k = 0; k < 5; k++) {
                    if (!placed) {
                        if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }
            }
        }
        p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
        var c = new Circle(points[i], 8 + Math.random() * 2, 'rgba(255,255,255,0.8)');
        points[i].circle = c;
    }
}

// Event handling
function addListeners() {
    if (!('ontouchstart' in window)) {
        window.addEventListener("mousemove", mouseMove);
    }
    window.addEventListener("resize", resize, true);
    window.addEventListener("scroll", scrollCheck);
}

function mouseMove(e) {
    var posx = posy = 0;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
}

function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    container.style.height = height + 'px';
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

// animation
function initAnimation() {
    animate();
    for (var i in points) {
        shiftPoint(points[i]);
    }
}

function animate() {
    if (animateHeader) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i in points) {
            // detect points in range
            if (Math.abs(getDistance(target, points[i])) < 4000) {
                points[i].active = 0.3;
                points[i].circle.active = 0.6;
            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                points[i].active = 0.1;
                points[i].circle.active = 0.3;
            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                points[i].active = 0.02;
                points[i].circle.active = 0.1;
            } else {
                points[i].active = 0;
                points[i].circle.active = 0;
            }

            points[i].circle.draw();
        }
    }
    requestAnimationFrame(animate);
}

function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function () {
            shiftPoint(p);
        }
    });
}

// Canvas manipulation

function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();

    this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255,255,255,' + _this.active + ')';
        ctx.fill();
    };
}

// Util
function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

init();

(function (window) {
    (function () {
        var theConsole = $('span.console');
        var texted = $("#ip").text();
        theConsole.html(texted);
    });

    var search_form = document.getElementsByClassName('search__form')

    function createHome() {
        var homeDiv = document.createElement('div');

        if (src === 'message') {
            homeDiv.innerHTML = `
                <div class="home_container">
                    <h2>Hai Hai :D</h2>
                    <p>
                        I am just a nerd in the end so  <br/>
                        I so fucking <span class="green">sorry</span> about my behaviour about what i did (╥ᆺ╥)
                        <span class="green">I MISSED YOU SO MUCH</span>.... <br/>
                        I want u in my life more than anyone else <span class="green">
                       
                        Am really really REALLY REALLY SORRY<br/>
                        I won't ever repeat it again forgivr me please ╥ ω ╥ <br/>,
                        i don't want to ever lose u again, u mean the world to me
                    </p>
                    <div class="close_home" href="">x</div>
                </div>
            `;
        } else {
            homeDiv.innerHTML = `
                <div class="home_container">
                    <img id="img" src="assets/${src}" alt="assets/default.jpg">
                    <div class="close_home" href="">x</div>
                </div>
            `;
        }

        homeDiv.setAttribute('class', 'home');
        document.body.appendChild(homeDiv);

        $('.close_home').click(() => $('.home').remove())
    }


    var navigationLink = $('.terminal__line a');

    navigationLink.click(nav => {
        src = nav.delegateTarget.id
        if ($(this).hasClass('out')) {
            window.open('http://instagram.com/Onkar_xd');
        } else {
            createHome();
        }
    });

    const opts = {
        cari: document.getElementById('cari.gif'),
        How_Could_I_Ever_Want_U_Gone: document.getElementById('baka.jpg'),
    I_Missed_You: document.getElementById('leave.gif'),
        So_sorry: document.getElementById('sorry.gif'),
        The_world : document.getElementById('https://iili.io/3ZMP1x2.jpg'),
    }

    $(search_form).submit(e => {
        let val = $('input').val()

        if (val !== "clear") e.preventDefault()
        opts[val]?.click()
    });

})(window);
