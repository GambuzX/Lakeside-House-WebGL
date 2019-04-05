class MyTreeRowPatch extends CGFobject {
    constructor(scene, treeTrunkTex, treeTopTex) {
        super(scene);
        this.initTrees(treeTrunkTex, treeTopTex);
    }

    initTrees(treeTrunkTex, treeTopTex) {
        this.trees = [];
        this.offsets = [];

        /* Create trees */
        for (let i = 0; i < 6; ++i) {
            this.trees.push(new MyTree(this.scene, 2,0.5,2,1.5,treeTrunkTex,treeTopTex));
        }

        /* Calculate offsets */
        for (let i = 0; i < 6; ++i) {
            this.offsets.push((Math.random()-0.5)*2);
        }

    }

    display() {
        for (let i = 0; i < this.trees.length; ++i) {
            this.scene.pushMatrix();
            this.scene.translate(this.offsets[i],0,-7.5+3*i);
            this.trees[i].display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        for (let i = 0; i < this.trees.length; ++i) this.tress[i].enableNormalViz();
    }
}
