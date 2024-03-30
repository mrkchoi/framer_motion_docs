import { shaderMaterial } from "@react-three/drei";

const GlitchMaterial = shaderMaterial(
  {
    uTexture: null,
    uDistortion: 0.73,
    uDistortion2: 0.05,
    uSpeed: 1.0,
    uTime: 0.0,
  },
  /* GLSL */
  `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
  `,
  /* GLSL */
  `
    uniform sampler2D uTexture;
    uniform float uDistortion;
    uniform float uDistortion2;
    uniform float uSpeed;
    uniform float uTime;

    varying vec2 vUv;


    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec2 mod289(vec2 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec3 permute(vec3 x) {
      return mod289(((x*34.0)+1.0)*x);
    }

    float snoise(vec2 v)
      {
      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
    // First corner
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
      vec2 i1;
      //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
      //i1.y = 1.0 - i1.x;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      // x0 = x0 - 0.0 + 0.0 * C.xx ;
      // x1 = x0 - i1 + 1.0 * C.xx ;
      // x2 = x0 - 1.0 + 2.0 * C.xx ;
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;

    // Permutations
      i = mod289(i); // Avoid truncation effects in permutation
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;

    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    // Compute final noise value at P
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      // Create large, incidental noise waves
      float noise = max(0.0, snoise(vec2(uTime, uv.y * 0.3)) - 0.3) * uDistortion;
      // Offset by smaller, constant noise waves
      noise += (snoise(vec2(uTime * 10.0 * uSpeed, uv.y * 2.4)) - 0.5) * uDistortion2;
      // Apply the noise as X displacement for every line
      float xpos = uv.x - noise * noise * 0.25;
      gl_FragColor = texture(uTexture, vec2(xpos, uv.y));
      // Mix in some random interference for lines
      gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), noise * 0.3).rgb;
      // Apply a line pattern every 4 pixels
      if (floor(mod(gl_FragCoord.y * 0.25, 2.0)) == 0.0) {
          gl_FragColor.rgb *= 1.0 - (0.15 * noise);
      }
    }
  `,
);

export default GlitchMaterial;
