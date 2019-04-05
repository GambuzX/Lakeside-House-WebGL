class MyTreeGroupPatch extends CGFobject {
    constructor(scene, treeTrunkTex, treeTopTex) {
        super(scene);
        this.initTrees(treeTrunkTex, treeTopTex);
    }

    initTrees(treeTrunkTex, treeTopTex) {
        this.trees = [];
        this.offsets = [];

        /* Create trees */
        for (let i = 0; i < 3; ++i) {
            this.trees.push([]);
            for (let j = 0; j < 3; ++j) {
                this.trees[i].push(new MyTree(this.scene, 2,0.5,2,1.25,treeTrunkTex,treeTopTex));
            }
        }

        /* Calculate offsets */
        for (let i = 0; i < 3; ++i) {
            this.offsets.push([]);
            for (let j = 0; j < 3; ++j) {
                this.offsets[i].push([Math.random()*0.5-0.25, Math.random()*0.5-0.25]);
            }
        }        
    }

    display() {
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                this.scene.pushMatrix();
                this.scene.translate(-3 + 3*i+this.offsets[i][j][0],0,-3 + 3*j+this.offsets[i][j][1]);
                this.trees[i][j].display();
                this.scene.popMatrix();
            }
        }
    }

    enableNormalViz() {
        for (let i = 0; i < this.trees.length; ++i) this.tress[i].enableNormalViz();
    }
}
