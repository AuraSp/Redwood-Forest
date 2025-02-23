varying vec2 vUV;
varying vec2 vScreenUV;

void main() {
    vUV = uv;

    vScreenUV = position.xy * 0.5 + 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
