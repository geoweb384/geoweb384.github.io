var config = {
    style: 'mapbox://styles/alariec001/cmg5gbfbr002u01s4ffi9a9ss',
    accessToken: 'pk.eyJ1IjoiYWxhcmllYzAwMSIsImEiOiJjbWYycmwzMGExZW43MmtvZjI0cjQ3aHYwIn0.aS7KnudBFXEBUF_C-B2bbw',
    showMarkers: false,
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: true,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    theme: 'dark',
    use3dTerrain: false,
    auto: false,
    title: '',
    subtitle: '',
    byline: '',
    chapters: [
        {
            id: 'first-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Overview of the Garibaldi Volcanic Belt',
            description:                 
                `Silverthrone Caldera, Bridge River Cones, Mount Meager, Mount Cayley, and Mount & Lake Garibaldi are the main areas
                that comprise the Garibaldi Volcanic Belt in Southern BC.`,
            location: {
                center: [-124.507728, 50.680190],
                zoom: 6.5,
                pitch: 0,
                bearing: 0,
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'second-chapter',
            alignment: 'right',
            hidden: false,
            title: 'Silverthrone Caldera Area',
            image: 'IMAGES/77031055-mjukyrtw.jpg',
            description: 
                `Mount Silverthrone
                is an eroded lava dome on the northeast 
                edge of a large caldera complex called the
                Silverthrone Caldera. It lies within the Coast 
                Plutonic Complex, which is the single largest 
                contiguous granite outcropping in the world. The plutonic
                and metamorphic rocks extend approximately 1,800 kilometers
                on the coast of British Columbia, southwestern Yukon and
                southeastern Alaska.<sup><a href="#silverthrone_cite">[1]</a></sup>
                `,
            location: {
                center: [-126.11306, 51.51750],
                zoom: 10.5,
                pitch: 40,
                bearing: 27
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'third-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Bridge River Cones Area',
            image: 'IMAGES/5039002673_9576a19e80_b.jpg',
            description:                 
                `The Bridge River Cones, sometimes referred to as
                the Lillooet Cones and Salal Creek Cones, is the name
                given to a volcanic field located on the north flank 
                of the upper Bridge River, about 40 km (25 mi) west of
                the town of Gold Bridge. The cones are in the lee of 
                the Lillooet Icecap and sit astride a group of passes 
                between the Bridge River, which flows W-E to their south, 
                and the Lord River, which flows north to the Taseko Lakes 
                in the Chilcotin District. Check out the nearby Slim Creek Multi-Use Trail.
                <sup><a href="#bridgeriver_cite">[2]</a></sup>

                <br><br>

                <a href="https://www.trailforks.com/trails/slim-creek-fsr/" target="_blank">
                <em>Explore the 30.5km Slim Creek FSR Trail</em></a>


                `,
            location: {
                center: [-123.4000, 50.8583 ],
                zoom: 11,
                pitch: 40,
                bearing: -43.2,
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'fourth-chapter',
            alignment: 'right',
            hidden: false,
            title: 'Mount Meager Area',
            image: 'IMAGES/MountMeagerPlinthCapricorn.jpg',
            description:                 
                `Mount Meager (also known as The Cathedral, or Q̓welq̓welústen in the St'at'imcets 
                (Lillooet) language) is a mountain in the Pacific Ranges of the Coast Mountains 
                in British Columbia, Canada. It represents the second highest peak of the Mount Meager massif, 
                a group of coalescent stratovolcanoes in the Garibaldi Volcanic Belt. Check out the nearby Lillooet River Trail.
                <sup><a href="#meager_cite">[3]</a></sup>

                <br><br>

                <a href="https://www.trailforks.com/trails/lillooet-river-trail/" target="_blank">
                <em>Explore the 1.7km Lillooet River Trail</em></a>
                `,
            location: {
                center: [-123.504167, 50.631667],
                zoom: 11,
                pitch: 40,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'fifth-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Mount Cayley Area',
            description: `
        <p>Mount Cayley is an eroded but potentially 
        active stratovolcano in the Pacific Ranges of
         southwestern British Columbia, Canada. Located
          45 km (28 mi) north of Squamish and 24 km (15 mi)
           west of Whistler, the volcano resides on the edge
            of the Powder Mountain Icefield. It consists of 
            massif that towers over the Cheakamus and Squamish
             river valleys. All major summits have elevations
              greater than 2,000 m (6,600 ft), Mount Cayley being 
              the highest at 2,385 m (7,825 ft). The surrounding area
               has been inhabited by Indigenous peoples for more than 
               7,000 years while geothermal exploration has taken place
                there for the last four decades. Check out the nearby Brandywine Meadows Multi-Use Trail.<sup><a href="#cayley_cite">[4]</a></sup></p>
            
            <br>

            <a href="https://www.trailforks.com/trails/brandywine-meadows/" target="_blank">
            <em>Explore the 4.9km Brandywine Meadows Trail</em></a>
            
            <br>
            <br>

            <iframe 
            width="560"
             height="153" 
             src="https://www.youtube.com/embed/Yl5QOSeNtuA?si=dWoSrOfkHWIpRKXT&amp;start=38" 
             title="YouTube video player" 
             frameborder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
             </iframe>
    `,
            location: {
                center: [-123.2908, 50.1203],
                zoom: 11,
                pitch: 40,
                bearing: 50
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'sixth-chapter',
            alignment: 'right',
            hidden: false,
            title: 'Mount & Lake Garibaldi Area',
            image: 'IMAGES/Mount_Price.jpg',
            description:                 
                `Mount Garibaldi (Squamish: Nch'ḵay̓, pronounced [n̩.ʧʼqɛˀj̰]) 
                is a dormant stratovolcano in the Garibaldi Ranges of the Pacific
                 Ranges in southwestern British Columbia, Canada. It has a maximum 
                 elevation of 2,678 metres (8,786 feet) and rises above the surrounding 
                 landscape on the east side of the Cheakamus River in New Westminster Land District.
                 Check out the nearby Lake Garibaldi and Mount Garibaldi Trails.

                <sup><a href="#garibaldi_cite">[5]</a></sup>
            
                <br><br>

                <a href="https://www.trailforks.com/trails/mount-garibaldi-trail/" target="_blank">
                <em>Explore the 3.2km Mount Garibaldi Trail</em></a>
                `,
            location: {
                center: [-123.0047, 49.8503],
                zoom: 11,
                pitch: 40,
                bearing: 50
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'seventh-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Start of tour, The Helipad',
            image: 'IMAGES/Untitled.png',
            description:                 
                `Here will be the start of your Helicopter tour
                of the beautiful Garibaldi Mountain range. An easy 10 minute drive from Whistler,
                BC. Aim to arrive at least 45 minutes before your tour departure time. 
                  
                <br><br>
                Address: 9960 Heliport Rd, Whistler, BC V0N 1B0`,
            location: {
                center: [-122.90472, 50.16841],
                zoom: 17,
                pitch: 50,
                bearing: -30
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
                callback: 'add3DModel',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};

const modelOrigin = [-122.90472, 50.16841];
const modelAltitude = 5;
const modelRotate = [Math.PI / 2, 0, 0];

const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 5
};

const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        const light = new THREE.DirectionalLight(0xaaffff);
        light.position.set(0, -70, 100).normalize();
        this.scene.add(light);

        const light2 = new THREE.DirectionalLight(0xaaffff);
        light2.position.set(0, 70, 100).normalize();
        this.scene.add(light2);
        
        const light3 = new THREE.DirectionalLight(0xaaffff);
        light3.position.set(0, 70, -100).normalize();
        this.scene.add(light3);

        const light4 = new THREE.DirectionalLight(0xaaffff);
        light4.position.set(0, -70, -100).normalize();
        this.scene.add(light4);

        const loader = new THREE.GLTFLoader();
        loader.load(
            'low_poly_helicopter/scene.gltf',
            (gltf) => {
                this.scene.add(gltf.scene);
            }
        );

        this.map = map;
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });

        this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};

function add3DModel() {
    if (!map.getLayer('3d-model')) {
        map.addLayer(customLayer);
    }
}

function renderChapterMedia(chapter) {
    if (chapter.videoEmbed) {
        // check if it's YouTube/Vimeo embed vs local file
        if (chapter.videoEmbed.includes("youtube") || chapter.videoEmbed.includes("vimeo")) {
            return `<iframe width="100%" height="315" src="${chapter.videoEmbed}" 
                        frameborder="0" allowfullscreen></iframe>`;
        } else {
            return `<video width="100%" height="315" controls>
                        <source src="${chapter.videoEmbed}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
        }
    } else if (chapter.image) {
        return `<img src="${chapter.image}" alt="${chapter.title}" />`;
    }
    return "";
}
