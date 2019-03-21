class MyVoxelHill extends CGFobject {
	constructor(scene, height) {
		super(scene);
		this.height = height;
		this.cube = new MyUnitCubeQuad(scene);
	}


	display() {
		let cube_size = 1;
		let curr_y = 0.5;
		for (let h = this.height - 1; h >= 0; h--) {
			let cubes_side = 2 * h + 1; // number of cubes on each side of the square

			let start_x = cube_size/2.0 - cube_size * cubes_side/2.0;
			let start_z = cube_size/2.0 - cube_size * cubes_side/2.0;

			for (let i = 0; i < cubes_side; i++) {
				let curr_z = start_z;
				for (let j = 0; j < cubes_side; j++) {
					this.scene.pushMatrix();
					this.scene.translate(start_x, curr_y, curr_z);
					this.cube.display();
					this.scene.popMatrix();

					curr_z += cube_size;
				}
				start_x += cube_size;
			}
			curr_y += cube_size;
		}
	}
}