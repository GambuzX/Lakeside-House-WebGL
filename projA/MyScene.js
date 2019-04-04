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
        this.zoom = 0.25;

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.ambientLight = 0.3;

        // Initialize scene objects
        this.initObjects();

        // Initialize materials
        this.default = new CGFappearance(this);
        this.initTimeOfDayMaterials();
        this.initFloorMaterials();
        this.initRiverMaterials();

        this.selectedTimeDay = 0;
        this.timeDayMapper = {'Day Time' : 0, 'Night Time' : 1};
        // Objects connected to MyInterface
        this.applyTextures = true;
    }
    initLights() {
        /* Ambient light */
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        let lights_x = 500;
        let lights_y = 500;
        let lights_z = -500;
        /* Sun */
        this.lights[0].setPosition(lights_x, lights_y, lights_z, 1);
        this.lights[0].setDiffuse(1,0.9,0.4,1); /* Orange-ish */
        this.lights[0].setSpecular(1,0.9,0.4,1); /* Orange-ish */
        this.lights[0].setConstantAttenuation(0.2);
        this.lights[0].enable();
        this.lights[0].update();

        /* Moon */
        this.lights[1].setPosition(lights_x, lights_y, lights_z, 1);
        this.lights[1].setDiffuse(0.1,0.1,0.1,1); /* Dark */
        this.lights[1].setSpecular(0.1,0.1,0.1,1); /* Dark */
        this.lights[1].setConstantAttenuation(0.2);
        this.lights[1].disable();
        this.lights[1].update();

        /* Campfire */
        this.lights[2].setPosition(0, 0.2, 10, 1);
        this.lights[2].setDiffuse(1,0.25,0,1); /* Orange-ish */
        this.lights[2].setSpecular(1,0.25,0,1); /* Orange-ish */
        this.lights[2].setLinearAttenuation(0.05);
        this.lights[2].disable();
        this.lights[2].update();
        //this.lights[2].setVisible(true);
    }
    updateTimeDayLight() {

        if (this.selectedTimeDay == 0) {
            this.lights[0].disable();
            this.lights[1].disable();
            this.lights[2].disable();

            this.lights[0].enable();
        }
        else {
            this.lights[0].disable();
            this.lights[1].disable();
            this.lights[2].disable();

            this.lights[1].enable();
            this.lights[2].enable();
        }
    }
    initCameras() {
        this.camera = new CGFcamera(
            0.4, 0.1, 500, vec3.fromValues(15, 15, 15),
            vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(this.ambientLight, this.ambientLight,this.ambientLight, 1);
        this.setDiffuse(1, 1, 1, 1.0);
        this.setSpecular(1, 1, 1, 1.0);
        this.setShininess(10.0);
        this.activeTexture = 0;
    }
    initObjects() {
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this);
        this.voxelHill1 = new MyVoxelHill(this, 4);
        this.voxelHill2 = new MyVoxelHill(this, 8);
        this.treesGroup = new MyTreeGroupPatch(this, [], []);
        this.treesLine = new MyTreeRowPatch(this, [], []);
        this.skybox = new MyCubeMap(this);
        this.quad = new MyQuad(this);

        this.floor_scale_f = 50;
        this.floor = new MyQuad(this);
        this.floor.updateTexCoords([0, this.floor_scale_f, this.floor_scale_f, this.floor_scale_f, 0, 0, this.floor_scale_f, 0]);

        this.river_scale_l = 20;
        this.river_scale_w = 3;
        this.river = new MyQuad(this);
        this.river.updateTexCoords([0, this.river_scale_w, this.river_scale_l, this.river_scale_w, 0, 0, this.river_scale_l, 0 ]);

    }
    initTimeOfDayMaterials() {
        this.daytimeMat = new CGFappearance(this);
        this.daytimeMat.setAmbient(1, 1, 1, 1);
        this.daytimeMat.setDiffuse(0, 0, 0, 1);
        this.daytimeMat.setSpecular(0, 0, 0, 1);
        this.daytimeMat.setShininess(1);
        this.daytimeMat.loadTexture('textures/ely_lakes/daytime.png');
        this.daytimeMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.nightimeMat = new CGFappearance(this);
        this.nightimeMat.setAmbient(1, 1, 1, 1);
        this.nightimeMat.setDiffuse(0, 0, 0, 1);
        this.nightimeMat.setSpecular(0, 0, 0, 1);
        this.nightimeMat.setShininess(1);
        this.nightimeMat.loadTexture('textures/ame_nebula/nebula.png');
        this.nightimeMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.timeDayMaterials = [this.daytimeMat, this.nightimeMat];
    }
    initFloorMaterials() {
        this.dirtMat = new CGFappearance(this);
        this.dirtMat.setAmbient(this.ambientLight, this.ambientLight,this.ambientLight, 1);
        this.dirtMat.setDiffuse(1, 1, 1, 1);
        this.dirtMat.setSpecular(0, 0, 0, 1);
        this.dirtMat.setShininess(1);
        this.dirtMat.loadTexture('textures/floor/dirt-texture.jpg');
        this.dirtMat.setTextureWrap('REPEAT', 'REPEAT');

        this.grassMat = new CGFappearance(this);
        this.grassMat.setAmbient(this.ambientLight, this.ambientLight,this.ambientLight, 1);
        this.grassMat.setDiffuse(1, 1, 1, 1);
        this.grassMat.setSpecular(0, 0, 0, 1);
        this.grassMat.setShininess(1);
        this.grassMat.loadTexture('textures/floor/grass-texture.jpg');
        this.grassMat.setTextureWrap('REPEAT', 'REPEAT');

        this.floorMaterials = [this.dirtMat, this.grassMat];
        this.selectedFloorMaterial = 0;
        this.floorMatMapper = {'Dirt' : 0, 'Grass' : 1};
    }
    initRiverMaterials() {
        this.waterMat = new CGFappearance(this);
        this.waterMat.setAmbient(this.ambientLight, this.ambientLight,this.ambientLight, 1);
        this.waterMat.setDiffuse(0.2, 0.2, 0.6, 1);
        this.waterMat.setSpecular(1, 1, 1, 1);
        this.waterMat.setShininess(5);
        this.waterMat.loadTexture('textures/river/water.jpg');
        this.waterMat.setTextureWrap('REPEAT', 'REPEAT');
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
        //this.axis.display();

        // Apply default appearance
        this.setDefaultAppearance();

        /* Update lights */
        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();

        // ---- BEGIN Primitive drawing section
        
        this.scale(this.zoom, this.zoom, this.zoom);

        /* Skybox */
        this.pushMatrix();
        if (this.selectedTimeDay == 0) {
            this.translate(0,20,0);
        }
        this.scale(100, 100, 100);
        if (this.applyTextures) this.timeDayMaterials[this.selectedTimeDay].apply();
        this.skybox.display();
        this.popMatrix();

        /* Ground */
        this.pushMatrix();
        this.scale(this.floor_scale_f,1,this.floor_scale_f);
        this.rotate(-90,1,0,0);
        if (this.applyTextures) this.floorMaterials[this.selectedFloorMaterial].apply();
        this.floor.display();
        this.popMatrix();

        this.setDefaultAppearance();

        /* House */
        let house_scale = 2;
        this.pushMatrix();
        this.default.apply();
        this.scale(house_scale, house_scale, house_scale);
        this.house.display();
        this.popMatrix();

        /* Voxel Hills */
        let hill1_scale = 1;
        this.pushMatrix();
        this.translate(-10, 0, -10);
        this.scale(hill1_scale, hill1_scale, hill1_scale);
        this.voxelHill1.display();
        this.popMatrix();

        let hill2_scale = 1;
        this.pushMatrix();
        this.translate(10, 0, -15);
        this.scale(hill2_scale, hill2_scale, hill2_scale);
        this.voxelHill2.display();
        this.popMatrix();


        /* Tree Groups */
        this.pushMatrix();
        this.translate(-12,0,18);
        this.treesGroup.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(12,0,18);
        this.rotate(Math.PI/2, 0, 1, 0);
        this.treesGroup.display();
        this.popMatrix();

        /* Tree Lines */
        this.pushMatrix();
        this.translate(-5,0,10);
        this.treesLine.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(5,0,10);
        this.rotate(Math.PI, 0, 1, 0);
        this.treesLine.display();
        this.popMatrix();

        /* River */
        this.pushMatrix(),
        this.translate(0,0.1,-5);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.scale(this.river_scale_l, 1, this.river_scale_w);
        if (this.applyTextures) this.waterMat.apply();
        this.river.display();
        this.popMatrix();



        // ---- END Primitive drawing section
    }
}
