uniform float time;
void main()	{
    float x = mod(time + gl_FragCoord.x, 50.) < 10.0 ? 1.0 : 0.0;
    float y = mod(gl_FragCoord.y, 50.) < 10. ? 1.0 : 0.0;
    gl_FragColor = vec4(vec3(min(x, y)), 1.0);
}