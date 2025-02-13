
        uniform float time;
        uniform vec2 resolution;
        uniform sampler2D startTexture;
        uniform sampler2D depthTexture;
        uniform float progress;
        
        varying vec2 vUV;
        varying vec2 vScreenUV;
        
        #define FREQUENCY 7.0
        #define DETAIL_FREQUENCY 6.0
        #define TEMPORAL_FREQUENCY 0.2
        #define FALLOFF 0.55
        #define TWIST 0.55
        #define DETAIL 0.55
        #define CONTRAST 0.55
        #define m3GA mat3(-0.7373688220977783, 0.4562871754169464, 0.49808549880981445, 0, -0.7373688220977783, 0.6754903197288513, 0.6754903197288513, 0.49808549880981445, 0.3437127947807312)
        
        vec3 twistedSineNoise33(vec3 q) {
            float a = 1.0;
            vec3 sum = vec3(0);
            for (int i = 0; i < 7; i++) {
                q = m3GA * q;
                vec3 s = sin(q.zxy / a) * a;
                q += s * TWIST;
                sum += s;
                a *= FALLOFF;
            }
            return sum;
        }
        
        float fog4(vec2 uv) {
            vec3 p = vec3(uv * FREQUENCY, time * TEMPORAL_FREQUENCY);
            p.x += -time * 0.05;
            vec3 n = twistedSineNoise33(p);
            n += sin(n * DETAIL_FREQUENCY) * DETAIL;
            float a = (n.x + n.y + n.z) * CONTRAST + 0.5;
            a = max(a, 0.0);
            return a;
        }
        
        vec3 sqr(vec3 v) {
            return v * v;
        }
        
        float hash13(vec3 p) {
            p = fract(p * 0.1031);
            p += dot(p, p.yzx + 19.19);
            return fract((p.x + p.y) * p.z);
        }
        
        vec3 posteffects(vec3 col, vec2 uv) {
            vec2 uv2 = uv - .6;
            col *= (1. - dot(uv2, uv2) * 0.75);
            col += (hash13(vec3(gl_FragCoord.xy, time)) - 0.33) * 0.06;
            return clamp(col, vec3(0.), vec3(1.));
        }
        
        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            vec2 vUV = fragCoord / resolution.xy;
            vec2 vScreenUV = fragCoord / resolution.xy;
        
            vec3 start = sqr(texture2D(startTexture, vUV).rgb); 

            float colorprogress = smoothstep(.65, 1., progress);
            float fadeprogress = smoothstep(0., .1, progress);
            float blackprogress = .5 + .5 * smoothstep(0., .5, progress);
            float darkprogress = .25 + .75 * smoothstep(0.45, .65, progress);
            float fogprogress = smoothstep(1.0, 0.9, progress);
    
            vec3 col = mix(start, vec3(0.0), fadeprogress) * darkprogress;        
         

            float rdy = (vUV.y - .4) * .4; // Vertical empty space
            if (abs(rdy) < 0.00001) rdy = 0.00001;
        
            float distance = 10.0;
            float fog = fog4(vUV + vec2(-.0 * progress, 0.)) * 0.2 * smoothstep(.9, .2, progress);
        
            float a = mix(1. + fog, fog, smoothstep(0.3, 1., progress));
            float b = mix(.15 - fog, 1. - fog, smoothstep(.1, .5, progress));
            float fogAmount = clamp((a / b) * exp(-2.5 * b) * (1. - exp(-distance * rdy * b)) / rdy, 0., .99) * fogprogress;        
            vec3 fogColor = (0.1 + (1. + fog) * mix(sqr(vec3(40. / 255., 60. / 255., 82. / 255.)), sqr(vec3(120. / 255., 140. / 255., 170. / 255.)), colorprogress)) * blackprogress;
        
            col = sqrt(mix(col, fogColor, fogAmount));
            col = posteffects(col, vScreenUV);
   
            float alpha = mix(1., .90, fadeprogress);
            gl_FragColor = vec4(col, alpha);
        }

