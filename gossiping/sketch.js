var nodes = [];
var current;
var prev;
var firstSelected;
var stepBtn;

function setup() {
    var cvs = createCanvas(600, 600);
    cvs.parent("canvasContainer")
    var generateBtn = select("#generate");
    var resetBtn = select("#reset");
    stepBtn = select("#step");
    stepBtn.hide();
    

    generateBtn.mousePressed(generate);
    resetBtn.mousePressed(reset);
    stepBtn.mousePressed(nextStep);
}

function draw() {
    background(255);
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].drawLinks();
    }

    // separated loop to draw ellipses on top of link lines.
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].drawNodes();
    }
    
    if(current == null) {
        stepBtn.hide();
    } else {
        stepBtn.show();
    }
    
    var info = select("#info");
    if(!firstSelected) {
        info.show();
    } else {
        info.hide();
    }

}

function generate() {
    firstSelected = false;
    if (nodes.length > 0) {
        nodes.splice(0, nodes.length); // clear nodes array if not empty
    }
    var numNodes = select("#nodes");

    var protection = 0;

    while (nodes.length < numNodes.value()) {
        var newNode = new Node(random(5, width - 5), random(5, height - 5));
        var overlapping = false;

        for (var i = 0; i < nodes.length; i++) {
            var d = dist(newNode.x, newNode.y, nodes[i].x, nodes[i].y);
            if (d < 25) {
                overlapping = true;
            }
        }

        if (!overlapping) {
            nodes.push(newNode);
        }
        protection++;

        if (protection > 10000) {
            break;
        }

    }

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].findNeighbors(100);
    }
}

function reset() {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].susceptible = true;
        nodes[i].c = color(0, 255, 0);
    }
    firstSelected = false;
    current = prev = null;
}

function mousePressed() {
    for (var i = 0; i < nodes.length; i++) {
        var d = dist(mouseX, mouseY, nodes[i].x, nodes[i].y);
        if (d < 5 && !firstSelected) {
            current = nodes[i];
            firstSelected = true;
            nextStep();
        }
    }
}

function nextStep() {
    if (current != null) {
        current = current.step();
    }
}