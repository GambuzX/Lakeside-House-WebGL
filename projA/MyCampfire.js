class MyCampfire extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.pyramid = new MyPyramid(scene, 4);

        this.initCampfireMaterials();
    }

    initCampfireMaterials() {
        this.logMat = new CGFappearance(this.scene);
        this.logMat.setAmbient( this.scene.ambientLight, this.scene.ambientLight, this.scene.ambientLight, 1);
        this.logMat.setDiffuse(1, 1, 1, 1);
        this.logMat.setSpecular(0.1, 0.1, 0.1, 1);
        this.logMat.setShininess(1);
        this.logMat.loadTexture('textures/trees/tree_bark.png');
        this.logMat.setTextureWrap('REPEAT', 'REPEAT');

        this.fireMat = new CGFappearance(this.scene);
        this.fireMat.setAmbient(0.9, 0.9, 0.9, 1);
        this.fireMat.setDiffuse(1, 1, 1, 1);
        this.fireMat.setSpecular(1, 1, 1, 1);
        this.fireMat.setShininess(1);
        this.fireMat.loadTexture('textures/fire.jpg');
        this.fireMat.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        /* Log 1 */
        let log_width = 1;
        let log_scale = 0.2;

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.scale(log_scale, log_scale, log_width);
        this.logMat.apply();
        this.cube.display();
        this.scene.popMatrix();

        /* Log 2 */
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 4, 0, 1, 0);
        this.scene.scale(log_scale, log_scale, log_width);
        this.cube.display();
        this.scene.popMatrix();

        /* Fire */
        let fire_height = 0.8;
        let fire_scale = 0.3;

        this.scene.pushMatrix();
        this.scene.translate(0, log_scale / 2, 0);
        this.scene.scale(fire_scale, fire_height, fire_scale);
        this.fireMat.apply();
        this.pyramid.display();
        this.scene.popMatrix();

        this.scene.setDefaultAppearance();
    }

    enableNormalViz() {
        this.cube.enableNormalViz();
        this.pyramid.enableNormalViz();
    }
}
