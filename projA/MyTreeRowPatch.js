class MyTreeRowPatch extends CGFobject {
    constructor(scene, treeTrunkText, treeTopTex) {
        super(scene);

        this.angle = 0;
        this.trees = [];
        this.offsets = [];
        for (let i = 0; i < 6; ++i) {
            this.trees.push(new MyTree(scene, 2,0.5,2,1.5,treeTrunkText,treeTopTex));
        }

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
}
