/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        // Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        // Initialize scene objects
        this.axis = new CGFaxis(this);

        this.prism = new MyPrism(this, 10);
        this.cylinder = new MyCylinder(this, 10);
        this.house = new MyHouse(this);
        this.voxelHill = new MyVoxelHill(this, 5);
        this.tree = new MyTree(this, 5, 0.3, 3, 2, [], []);
        this.group = new MyTreeGroupPatch(this, [], []);
        this.line = new MyTreeRowPatch(this, [], []);
        this.skybox = new MyCubeMap(this);
        this.quad = new MyQuad(this);

        this.initTimeOfDayMaterials();
        this.initFloorMaterials();
        // Objects connected to MyInterface
    }
    initLights() {
        this.lights[0].setPosition(5, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(
            0.4, 0.1, 500, vec3.fromValues(15, 15, 15),
            vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    initTimeOfDayMaterials() {
        this.daytimeMat = new CGFappearance(this);
        this.daytimeMat.setAmbient(1, 1, 1, 1);
        this.daytimeMat.setDiffuse(0, 0, 0, 1);
        this.daytimeMat.setSpecular(0, 0, 0, 1);
        this.daytimeMat.setShininess(1);
        this.daytimeMat.loadTexture('textures/ely_lakes/daytime.png');
        this.daytimeMat.setTextureWrap('REPEAT', 'REPEAT');

        this.nightimeMat = new CGFappearance(this);
        this.nightimeMat.setAmbient(1, 1, 1, 1);
        this.nightimeMat.setDiffuse(0, 0, 0, 1);
        this.nightimeMat.setSpecular(0, 0, 0, 1);
        this.nightimeMat.setShininess(1);
        this.nightimeMat.loadTexture('textures/ame_nebula/nebula.png');
        this.nightimeMat.setTextureWrap('REPEAT', 'REPEAT');

        this.timeOfDayMaterials = [this.daytimeMat, this.nightimeMat];
        this.selectedTimeDayMaterial = 0;
        this.timeDayMatMapper = {'Day Time' : 0, 'Night Time' : 1};
    }
    initFloorMaterials() {
        this.dirtMat = new CGFappearance(this);
        this.dirtMat.setAmbient(1, 1, 1, 1);
        this.dirtMat.setDiffuse(0, 0, 0, 1);
        this.dirtMat.setSpecular(0, 0, 0, 1);
        this.dirtMat.setShininess(1);
        this.dirtMat.loadTexture('textures/floor/dirt-texture.jpg');
        this.dirtMat.setTextureWrap('REPEAT', 'REPEAT');

        this.grassMat = new CGFappearance(this);
        this.grassMat.setAmbient(1, 1, 1, 1);
        this.grassMat.setDiffuse(0, 0, 0, 1);
        this.grassMat.setSpecular(0, 0, 0, 1);
        this.grassMat.setShininess(1);
        this.grassMat.loadTexture('textures/floor/grass-texture.jpg');
        this.grassMat.setTextureWrap('REPEAT', 'REPEAT');

        this.floorMaterials = [this.dirtMat, this.grassMat];
        this.selectedFloorMaterial = 0;
        this.floorMatMapper = {'Dirt' : 0, 'Grass' : 1};
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative
        // to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        // Apply default appearance
        this.setDefaultAppearance();

        this.scale(5, 5, 5);
        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.scale(100, 100, 100);
        this.timeOfDayMaterials[this.selectedTimeDayMaterial].apply();
        this.skybox.display();
        this.popMatrix();


        /* Ground */
        let floor_scale_f = 20;
        this.pushMatrix();
        this.scale(floor_scale_f,0,floor_scale_f);
        this.rotate(-90,1,0,0);
        this.quad.updateTexCoords([0, floor_scale_f, floor_scale_f, floor_scale_f, 0, 0, floor_scale_f, 0]);
        this.floorMaterials[this.selectedFloorMaterial].apply();
        this.quad.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}
