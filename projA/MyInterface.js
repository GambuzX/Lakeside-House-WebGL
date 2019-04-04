/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        this.gui.add(this.scene, 'selectedTimeDay', this.scene.timeDayMapper).name('Time').onChange(this.scene.updateTimeDayLight.bind(this.scene));;
        this.gui.add(this.scene, 'selectedFloorMaterial', this.scene.floorMatMapper).name('Floor');

        this.gui.add(this.scene, 'applyTextures').name('Enable Textures').onChange(this.scene.enableTextures.bind(this.scene));
        return true;
    }
}
