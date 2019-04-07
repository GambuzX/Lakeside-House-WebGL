class MyVoxelHill extends CGFobject {
	constructor(scene, height) {
		super(scene);
		this.height = height;
		this.cube = new MyUnitCubeQuad(scene);
		this.initMaterials();
	}

	initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(this.scene.ambientLight,this.scene.ambientLight,this.scene.ambientLight, 1);
        this.material.setDiffuse(0.8,0.8,0.8,1);
        this.material.setSpecular(1,1,1,1);
        this.material.setShininess(30);
        this.material.loadTexture('textures/marble/marble.jpg');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
        this.material.apply();

		let cube_size = 1;
		let curr_y = 0.5;
		for (let h = this.height - 1; h >= 0; h--) {
			let cubes_side = 2 * h + 1; // number of cubes on each side of the square

			let start_x = cube_size/2.0 - cube_size * cubes_side/2.0;
			let start_z = cube_size/2.0 - cube_size * cubes_side/2.0;
			let end_x = -start_x;
			let end_z = -start_z;

			for (let curr_x = start_x; curr_x <= end_x; curr_x += cube_size) {
				for (let curr_z = start_z; curr_z <= end_z; curr_z += cube_size) {

					/* Do not draw inner cubes */
					if (curr_x != start_x && curr_x != end_x && curr_z != start_z && curr_z != end_z) continue;

					this.scene.pushMatrix();
					this.scene.translate(curr_x, curr_y, curr_z);
					this.cube.display();
					this.scene.popMatrix();
				}
			}
			curr_y += cube_size;
		}
        this.scene.setDefaultAppearance();
	}

	enableNormalViz() {
		this.cube.enableNormalViz();
	}
}
