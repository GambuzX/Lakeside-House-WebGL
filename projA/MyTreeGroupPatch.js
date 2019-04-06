class MyTreeGroupPatch extends CGFobject {
    constructor(scene, treeTrunkTex, treeTopTex) {
        super(scene);
        this.initTrees(treeTrunkTex, treeTopTex);
    }

    initTrees(treeTrunkTex, treeTopTex) {
        this.trees = [];
        this.offsets = [];

        /* Create trees */
        let trunkHeight = 2;
        let trunkRadius = 0.5;
        let topheight = 2;
        let topRadius = 1.25;
        for (let i = 0; i < 3; ++i) {
            this.trees.push([]);
            for (let j = 0; j < 3; ++j) {
                let trunkHeightOff = Math.random() * 0.5 - 0.25;
                let trunkRadiusOff = Math.random() * 0.25 - 0.125;
                let topHeightOff = Math.random() * 0.5 - 0.25;
                let topRadiusOff = Math.random() * 0.25 - 0.125;
                this.trees[i].push(new MyTree(
                    this.scene, trunkHeight + trunkHeightOff,
                    trunkRadius + trunkRadiusOff, topheight + topHeightOff,
                    topRadius + topRadiusOff, treeTrunkTex, treeTopTex));
            }
        }

        /* Calculate offsets */
        for (let i = 0; i < 3; ++i) {
            this.offsets.push([]);
            for (let j = 0; j < 3; ++j) {
                this.offsets[i].push(
                    [Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25]);
            }
        }
    }

    display() {
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                this.scene.pushMatrix();
                this.scene.translate(
                    -3 + 3 * i + this.offsets[i][j][0], 0,
                    -3 + 3 * j + this.offsets[i][j][1]);
                this.trees[i][j].display();
                this.scene.popMatrix();
            }
        }
    }

    enableNormalViz() {
        for (let i = 0; i < this.trees.length; ++i)
            this.tress[i].enableNormalViz();
    }
}
