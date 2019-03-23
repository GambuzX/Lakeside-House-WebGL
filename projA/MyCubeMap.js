class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    updateBuffers() {
        return;
    }

    initBuffers() {
        this.vertices = [
            // Top face
            -0.5, 0.5, 0.5,   // 0
            0.5, 0.5, 0.5,    // 1
            0.5, 0.5, -0.5,   // 2
            -0.5, 0.5, -0.5,  // 3
            // Bottom face
            -0.5, -0.5, 0.5,   // 4
            0.5, -0.5, 0.5,    // 5
            0.5, -0.5, -0.5,   // 6
            -0.5, -0.5, -0.5,  // 7
            // Front face
            -0.5, -0.5, 0.5,  // 8
            0.5, -0.5, 0.5,   // 9
            0.5, 0.5, 0.5,    // 10
            -0.5, 0.5, 0.5,   // 11
            // Back face
            -0.5, -0.5, -0.5,  // 12
            0.5, -0.5, -0.5,   // 13
            0.5, 0.5, -0.5,    // 14
            -0.5, 0.5, -0.5,   // 15
            // Left face
            -0.5, -0.5, -0.5,  // 16
            -0.5, -0.5, 0.5,   // 17
            -0.5, 0.5, 0.5,    // 18
            -0.5, 0.5, -0.5,   // 19
            // Right face
            0.5, -0.5, -0.5,  // 20
            0.5, -0.5, 0.5,   // 21
            0.5, 0.5, 0.5,    // 22
            0.5, 0.5, -0.5,   // 23
        ];

        this.texCoords = [
            //Top face
            0.25,0.0,
            0.5,0.0,
            0.5,0.25,
            0.25,0.25,
            //Bottom face
            0.25,0.75,
            0.5,0.75,
            0.5,0.5,
            0.25,0.5,
            //Front face
            1.0,0.5,
            0.75,0.5,
            0.75,0.25,
            1.0,0.25,
            //Back face
            0.25,0.5,
            0.5,0.5,
            0.5,0.25,
            0.25,0.25,
            //Left face
            0.25,0.5,
            0.0,0.5,
            0.0,0.25,
            0.25,0.25,
            //Right face
            0.5,0.5,
            0.75,0.5,
            0.75,0.25,
            0.5,0.25
            
        ];

        this.indices = [
            0,  3,  2,  2,  1,  0,  // done

            6,  7,  4,  4,  5,  6,

            8,  11, 10, 10, 9,  8,

            12, 13, 14, 14, 15, 12,

            16, 19, 18, 18, 17, 16,

            20, 21, 22, 22, 23, 20
        ];

        this.normals = [
            0, -1, 0, 0, -1, 0, 0,  -1, 0,  0,  -1, 0,  0,  1, 0,  0,  1, 0,
            0, 1,  0, 0, 1,  0, 0,  0,  -1, 0,  0,  -1, 0,  0, -1, 0,  0, -1,
            0, 0,  1, 0, 0,  1, 0,  0,  1,  0,  0,  1,  1,  0, 0,  1,  0, 0,
            1, 0,  0, 1, 0,  0, -1, 0,  0,  -1, 0,  0,  -1, 0, 0,  -1, 0, 0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
