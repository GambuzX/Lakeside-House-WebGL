class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture) {
        super(scene);
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.trunkTexture = trunkTexture;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.treeTopTexture = treeTopTexture;

        this.trunk = new MyCylinder(scene, 10);
        this.top = new MyCone(scene, 10, []);
    }

    enableNormalViz() {
        this.trunk.enableNormalViz();
        this.top.enableNormalViz();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        this.trunk.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.trunkHeight,0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
        this.top.display();
        this.scene.popMatrix();
    }
}
