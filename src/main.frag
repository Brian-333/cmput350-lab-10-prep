#version 120 // glsl version 1.2 for OpenGL 2.1

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

void main(void) {
    // Fragment shader should output into gl_FragColor an RGBA:
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;


    vec2 mouseUv = iMouse.xy / iResolution.xy;
    mouseUv.y = 1 - mouseUv.y;
    mouseUv.x *= iResolution.x / iResolution.y;
    vec2 center = mouseUv;

    float dist = length(uv - center);

    float radius = 10.0 / iResolution.x;
    float edge = 3.0 / iResolution.x;
    float circle = smoothstep(radius - edge, radius + edge, dist);

    vec3 bg = vec3((sin(uv.x + 2.0 * iTime) + 1.0) / 2.0, uv.y, 0);
    vec3 col = mix(vec3(1.0), bg, circle);
    
    gl_FragColor = vec4(col, 1.0);
    //gl_FragColor = vec4(uv.xy, 0, 1);
}
