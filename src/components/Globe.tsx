'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { flagStates, type FlagState } from '@/lib/regulations';

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeMarker({
  country,
  radius,
  onSelect,
  isSelected,
}: {
  country: FlagState;
  radius: number;
  onSelect: (c: FlagState | null) => void;
  isSelected: boolean;
}) {
  const pos = useMemo(() => latLngToVector3(country.lat, country.lng, radius), [country, radius]);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={pos}>
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : country); }}
      >
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color={isSelected ? '#C5A572' : hovered ? '#D4BA8F' : '#ffffff'}
          emissive={isSelected ? '#C5A572' : hovered ? '#D4BA8F' : '#88aacc'}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.3}
        />
      </mesh>
      {(hovered || isSelected) && (
        <Html distanceFactor={4} center style={{ pointerEvents: 'none' }}>
          <div className="bg-navy/95 backdrop-blur-sm border border-gold/30 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">{country.flag}</span>
              <span className="text-white font-medium text-sm">{country.name}</span>
            </div>
            {isSelected && (
              <div className="text-white/60 text-xs mt-1 max-w-[200px] whitespace-normal">
                {country.authority}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function GlobeMesh({ onSelect, selected }: { onSelect: (c: FlagState | null) => void; selected: FlagState | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();

  useFrame(() => {
    if (meshRef.current && !gl.domElement.classList.contains('dragging')) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const globeRadius = 2;

  const wireframe = useMemo(() => {
    const geo = new THREE.SphereGeometry(globeRadius * 0.995, 36, 18);
    return geo;
  }, []);

  return (
    <group ref={meshRef}>
      {/* Main globe */}
      <Sphere args={[globeRadius, 64, 64]}>
        <meshStandardMaterial
          color="#0A1628"
          transparent
          opacity={0.9}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Wireframe grid */}
      <mesh geometry={wireframe}>
        <meshBasicMaterial color="#1B3A5C" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Country markers */}
      {flagStates.map((country) => (
        <GlobeMarker
          key={country.code}
          country={country}
          radius={globeRadius + 0.02}
          onSelect={onSelect}
          isSelected={selected?.code === country.code}
        />
      ))}

      {/* Atmosphere glow */}
      <Sphere args={[globeRadius * 1.05, 64, 64]}>
        <meshStandardMaterial
          color="#1B3A5C"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export default function GlobeComponent({
  onCountrySelect,
  selectedCountry,
}: {
  onCountrySelect: (c: FlagState | null) => void;
  selectedCountry: FlagState | null;
}) {
  const handleSelect = useCallback(
    (c: FlagState | null) => onCountrySelect(c),
    [onCountrySelect]
  );

  return (
    <div className="globe-container w-full aspect-square max-w-[600px] mx-auto">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#C5A572" />
        <GlobeMesh onSelect={handleSelect} selected={selectedCountry} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={8}
          autoRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
