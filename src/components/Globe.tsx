'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
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
      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[isSelected ? 0.12 : hovered ? 0.1 : 0.08, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#C5A572' : hovered ? '#D4BA8F' : '#4a90d9'}
          transparent
          opacity={isSelected ? 0.4 : hovered ? 0.3 : 0.15}
        />
      </mesh>
      {/* Inner dot */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : country); }}
      >
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color={isSelected ? '#C5A572' : hovered ? '#D4BA8F' : '#ffffff'}
          emissive={isSelected ? '#C5A572' : hovered ? '#D4BA8F' : '#6aabeb'}
          emissiveIntensity={isSelected ? 1.0 : hovered ? 0.7 : 0.4}
        />
      </mesh>
      {(hovered || isSelected) && (
        <Html distanceFactor={4} center style={{ pointerEvents: 'none' }}>
          <div className="bg-navy/95 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-2.5 whitespace-nowrap shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">{country.flag}</span>
              <span className="text-white font-semibold text-sm">{country.name}</span>
            </div>
            {isSelected && (
              <div className="text-gold/80 text-xs mt-1 font-medium">
                {country.standardKey}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function GlobeMesh({ onSelect, selected }: { onSelect: (c: FlagState | null) => void; selected: FlagState | null }) {
  const globeRadius = 2;

  return (
    <group>
      {/* Main globe - lighter ocean blue */}
      <Sphere args={[globeRadius, 64, 64]}>
        <meshStandardMaterial
          color="#1a4a7a"
          roughness={0.6}
          metalness={0.1}
        />
      </Sphere>

      {/* Latitude/longitude grid lines */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.001, 48, 24]} />
        <meshBasicMaterial color="#3a7abf" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[globeRadius * 1.002, 0.005, 8, 64]} />
        <meshBasicMaterial color="#5a9ad5" transparent opacity={0.3} />
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
      <Sphere args={[globeRadius * 1.08, 64, 64]}>
        <meshStandardMaterial
          color="#4a90d9"
          transparent
          opacity={0.06}
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
      <Canvas camera={{ position: [0, 1, 5.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#4a90d9" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#C5A572" />
        <GlobeMesh onSelect={handleSelect} selected={selectedCountry} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3.5}
          maxDistance={8}
          autoRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
