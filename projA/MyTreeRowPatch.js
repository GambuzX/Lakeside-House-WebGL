class MyTreeRowPatch extends CGFobject {
    constructor(scene, treeTrunkTex, treeTopTex) {
        super(scene);
        this.initTrees(treeTrunkTex, treeTopTex);
    }

    initTrees(treeTrunkTex, treeTopTex) {
        this.trees = [];
        this.offsets = [];

        let trunkHeight = 2;
        let trunkRadius = 0.5;
        let topheight = 2;
        let topRadius = 1.25;
        /* Create trees */
        for (let i = 0; i < 6; ++i) {
            let trunkHeightOff = Math.random() * 0.5 - 0.25;
            let trunkRadiusOff = Math.random() * 0.25 - 0.125;
            let topHeightOff = Math.random() * 0.5 - 0.25;
            let topRadiusOff = Math.random() * 0.25 - 0.125;
            this.trees.push(new MyTree(
                this.scene, trunkHeight + trunkHeightOff,
                trunkRadius + trunkRadiusOff, topheight + topHeightOff,
                topRadius + topRadiusOff, treeTrunkTex, treeTopTex));
        }

        /* Calculate offsets */
        for (let i = 0; i < 6; ++i) {
            this.offsets.push((Math.random() - 0.5) * 2);
        }
    }

    display() {
        for (let i = 0; i < this.trees.length; ++i) {
            this.scene.pushMatrix();
            this.scene.translate(this.offsets[i], 0, -7.5 + 3 * i);
            this.trees[i].display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        for (let i = 0; i < this.trees.length; ++i)
            this.tress[i].enableNormalViz();
    }
}
