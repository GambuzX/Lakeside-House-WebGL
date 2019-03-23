class MyTreeGroupPatch extends CGFobject {
    constructor(scene, treeTrunkText, treeTopTex) {
        super(scene);
        this.trees = [];
        this.offsets = [];

        for (let i = 0; i < 3; ++i) {
            this.trees.push([]);
            for (let j = 0; j < 3; ++j) {
                this.trees[i].push(new MyTree(scene, 2,0.5,2,1.5,treeTrunkText,treeTopTex));
            }
        }

        for (let i = 0; i < 3; ++i) {
            this.offsets.push([]);
            for (let j = 0; j < 3; ++j) {
                this.offsets[i].push([Math.random()-0.5, Math.random()-0.5]);
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
}
