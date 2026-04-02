'use client';

import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { flagStates, type FlagState } from '@/lib/regulations';

interface GeoFeature {
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoData {
  features: GeoFeature[];
}

// Convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Convert GeoJSON coordinates to 3D line points
function geoToPoints(coords: number[][], radius: number): THREE.Vector3[] {
  return coords.map(([lng, lat]) => latLngToVector3(lat, lng, radius));
}

// Globe landmass component using GeoJSON
function Landmasses({ radius, geoData }: { radius: number; geoData: GeoData | null }) {
  const lines = useMemo(() => {
    if (!geoData) return [];
    const result: THREE.Vector3[][] = [];

    geoData.features.forEach((feature: GeoFeature) => {
      if (feature.geometry.type === 'Polygon') {
        (feature.geometry.coordinates as number[][][]).forEach((ring) => {
          result.push(geoToPoints(ring, radius * 1.001));
        });
      } else if (feature.geometry.type === 'MultiPolygon') {
        (feature.geometry.coordinates as number[][][][]).forEach((polygon) => {
          polygon.forEach((ring) => {
            result.push(geoToPoints(ring, radius * 1.001));
          });
        });
      }
    });
    return result;
  }, [geoData, radius]);

  const geometries = useMemo(() => {
    return lines.map((points) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return geo;
    });
  }, [lines]);

  const material = useMemo(() => new THREE.LineBasicMaterial({ color: '#4a9a6a', transparent: true, opacity: 0.6 }), []);

  return (
    <group>
      {geometries.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, material)} />
      ))}
    </group>
  );
}

// Country marker
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
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[isSelected ? 0.12 : hovered ? 0.1 : 0.07, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? '#C5A572' : hovered ? '#D4BA8F' : '#4a90d9'}
          transparent
          opacity={isSelected ? 0.5 : hovered ? 0.35 : 0.15}
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
              <img
                src={`/flags/${country.code.toLowerCase()}.png`}
                alt=""
                className="w-6 h-4 rounded-sm object-cover"
              />
              <span className="text-white font-semibold text-sm">{country.name}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Main globe mesh
function GlobeMesh({
  onSelect,
  selected,
  geoData,
}: {
  onSelect: (c: FlagState | null) => void;
  selected: FlagState | null;
  geoData: GeoData | null;
}) {
  const globeRadius = 2;

  return (
    <group>
      {/* Ocean sphere */}
      <Sphere args={[globeRadius, 64, 64]}>
        <meshStandardMaterial color="#1a4a7a" roughness={0.7} metalness={0.1} />
      </Sphere>

      {/* Landmasses from GeoJSON */}
      <Landmasses radius={globeRadius} geoData={geoData} />

      {/* Subtle latitude/longitude grid */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.002, 36, 18]} />
        <meshBasicMaterial color="#2a6aaf" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Country markers */}
      {flagStates.map((country) => (
        <GlobeMarker
          key={country.code}
          country={country}
          radius={globeRadius + 0.03}
          onSelect={onSelect}
          isSelected={selected?.code === country.code}
        />
      ))}

      {/* Atmosphere */}
      <Sphere args={[globeRadius * 1.06, 64, 64]}>
        <meshStandardMaterial color="#4a90d9" transparent opacity={0.04} side={THREE.BackSide} />
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
  const [geoData, setGeoData] = useState<GeoData | null>(null);

  useEffect(() => {
    fetch('/world.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch(() => {});
  }, []);

  const handleSelect = useCallback(
    (c: FlagState | null) => onCountrySelect(c),
    [onCountrySelect]
  );

  return (
    <div className="globe-container w-full aspect-square max-w-[600px] mx-auto">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={0.9} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4a90d9" />
        <pointLight position={[0, 5, 0]} intensity={0.2} color="#C5A572" />
        <GlobeMesh onSelect={handleSelect} selected={selectedCountry} geoData={geoData} />
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
