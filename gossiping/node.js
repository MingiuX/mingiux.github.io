function Node(x,y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.susceptible = true;
    this.c = color(0,255,0);
    
    this.drawLinks = function() {
        for(var i = 0; i < this.neighbors.length; i++) {
            line(this.x, this.y, this.neighbors[i].x, this.neighbors[i].y);
        }
    }
    
    this.drawNodes = function() {
        fill(this.c);
        ellipse(this.x, this.y, 10,10);
    }
    
    // A node is neighbor of this if the distance between them is less then the max distance
    this.findNeighbors = function(maxDist) {
        for(var i = 0; i < nodes.length; i++) {
            var d = dist(this.x, this.y, nodes[i].x, nodes[i].y); // distance between this and a selected node (it can be also this)
            if(d < maxDist && d != 0) { // be sure to don't select myself as neighbor
                this.neighbors.push(nodes[i]);
            }
        }
    }
    
    this.infect = function() {
        this.susceptible = false; // just infected, can't select it again
        this.c = color(255,0,0); // change color to red when infected
    }
    
    this.step = function() {
        var next;
        var searching = 50; // max attempts to find a susceptible neighbor
        if(prev != null) {
            prev.c = color(255,102,0);
        }
        this.infect();
        // if no neighbors, finish
        if(this.neighbors.length === 0) {
            this.c = color(0,0,255);
            return null;
        }
        // select next node randomly between susceptible neighbors
        while(searching > 0) {
            next = this.neighbors[floor(random(0, this.neighbors.length))];
            searching--;
            if(next.susceptible) {
                prev = this;
                return next;
            }
        }
        this.c = color(0,0,255);
        return null;
    }
}