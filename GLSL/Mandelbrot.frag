// Author: Hadi
// Title: Mandelbrot

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 f (vec2 z, vec2 c) {
    return vec2(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);//z * z + c complex
}

void main() {
    float zoom = 2.4;
    vec2 center = vec2(-0.5, 0.0), scale = vec2(zoom, zoom * u_resolution.y / u_resolution.x);
    vec2 pos = gl_FragCoord.xy / u_resolution;
    vec2 z = vec2(0.0), c = center + (pos - vec2(.5)) * scale;
    z = f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(z, c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c), c);
    gl_FragColor = vec4(1.0 - step(0.0, length(z)));
}