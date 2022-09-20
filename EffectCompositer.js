import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.137.0-X5O2PK3x44y1WRry67Kr/mode=imports/optimized/three.js';
const EffectCompositer = {

    uniforms: {

        'sceneDiffuse': { value: null },
        'tDiffuse': { value: null }
    },

    vertexShader: /* glsl */ `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
    fragmentShader: /*glsl*/ `
    uniform sampler2D sceneDiffuse;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    #define DITHERING
    #include <common>
    #include <dithering_pars_fragment>
    void main() {
        gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb * texture2D(sceneDiffuse, vUv).rgb, 1.0);
        #include <dithering_fragment>
    }
    `
};
export { EffectCompositer };