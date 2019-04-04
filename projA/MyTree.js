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
        this.initTreeMaterials();
    }

    initTreeMaterials() {
        this.trunkMat = new CGFappearance(this.scene);
        this.trunkMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMat.setDiffuse(1, 1, 1, 1);
        this.trunkMat.setSpecular(0, 0, 0, 1);
        this.trunkMat.setShininess(1);
        this.trunkMat.loadTexture('textures/trees/tree_bark.png');
        this.trunkMat.setTextureWrap('REPEAT', 'REPEAT');

        this.leavesMat = new CGFappearance(this.scene);
        this.leavesMat.setAmbient(0.1, 0.1, 0.1, 1);
        this.leavesMat.setDiffuse(1, 1, 1, 1);
        this.leavesMat.setSpecular(0, 0, 0, 1);
        this.leavesMat.setShininess(1);
        this.leavesMat.loadTexture('textures/trees/leaves.jpg');
        this.leavesMat.setTextureWrap('REPEAT', 'REPEAT');
    }

    enableNormalViz() {
        this.trunk.enableNormalViz();
        this.top.enableNormalViz();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        this.trunkMat.apply();
        this.trunk.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.trunkHeight,0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
        this.leavesMat.apply();
        this.top.display();
        this.scene.popMatrix();
    }
}
