import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, ShaderMaterial } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vec2 position = vUv * 2.0 - 1.0;
    float d = length(position);
    vec3 color = vec3(0.1, 0.2, 0.3);
    
    float t = time * 0.5;
    float wave = sin(d * 10.0 - t) * 0.5 + 0.5;
    color += vec3(0.1, 0.2, 0.4) * wave;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function BackgroundEffect() {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 }
        }}
      />
    </mesh>
  );
}