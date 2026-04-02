'use client';

import { useState } from 'react';
import { flagStates, type FlagState } from '@/lib/regulations';

// Mercator projection: convert lat/lng to SVG x/y
function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 500 / 2 - (500 * mercN) / (2 * Math.PI);
  return { x, y };
}

// Country flag image URL from flagcdn.com (free, no attribution)
function flagUrl(code: string): string {
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

export default function WorldMap({
  onCountrySelect,
  selectedCountry,
}: {
  onCountrySelect: (c: FlagState | null) => void;
  selectedCountry: FlagState | null;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        style={{ background: 'linear-gradient(180deg, #0d2137 0%, #122d4a 100%)' }}
      >
        {/* Simplified world map outline - major continents */}
        <g opacity="0.15" fill="#4a90d9" stroke="#4a90d9" strokeWidth="0.5">
          {/* North America */}
          <path d="M120,80 L180,60 L230,70 L260,90 L270,120 L260,160 L240,180 L220,200 L200,210 L180,200 L150,220 L140,240 L130,220 L110,200 L100,170 L90,140 L100,110 Z" />
          {/* South America */}
          <path d="M200,260 L230,250 L260,270 L280,300 L290,340 L280,380 L260,410 L240,430 L220,420 L200,400 L190,360 L180,320 L185,290 Z" />
          {/* Europe */}
          <path d="M460,70 L500,60 L530,70 L540,90 L530,110 L520,130 L510,140 L490,150 L470,140 L460,120 L450,100 L455,80 Z" />
          {/* Africa */}
          <path d="M460,160 L500,150 L540,160 L560,200 L570,250 L560,300 L540,340 L520,370 L500,380 L480,370 L460,340 L450,300 L440,250 L445,200 Z" />
          {/* Asia */}
          <path d="M550,60 L620,50 L700,60 L760,80 L800,110 L810,140 L790,170 L760,190 L720,200 L680,190 L640,170 L600,150 L570,130 L560,100 L555,80 Z" />
          {/* Southeast Asia / Indonesia */}
          <path d="M720,220 L760,210 L800,220 L820,240 L810,260 L780,270 L750,260 L730,240 Z" />
          {/* Australia */}
          <path d="M780,310 L830,300 L870,310 L890,340 L880,370 L860,390 L830,400 L800,390 L780,370 L775,340 Z" />
        </g>

        {/* Grid lines */}
        <g stroke="#1a4a7a" strokeWidth="0.3" opacity="0.3">
          {/* Latitude lines */}
          {[-60, -30, 0, 30, 60].map((lat) => {
            const { y } = project(lat, 0);
            return <line key={`lat-${lat}`} x1="0" y1={y} x2="1000" y2={y} />;
          })}
          {/* Longitude lines */}
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lng) => {
            const { x } = project(0, lng);
            return <line key={`lng-${lng}`} x1={x} y1="0" x2={x} y2="500" />;
          })}
        </g>

        {/* Equator - slightly brighter */}
        <line x1="0" y1={project(0, 0).y} x2="1000" y2={project(0, 0).y} stroke="#2a6aaf" strokeWidth="0.5" opacity="0.4" />

        {/* Country markers */}
        {flagStates.map((country) => {
          const { x, y } = project(country.lat, country.lng);
          const isSelected = selectedCountry?.code === country.code;
          const isHovered = hovered === country.code;
          const active = isSelected || isHovered;

          return (
            <g
              key={country.code}
              onClick={() => onCountrySelect(isSelected ? null : country)}
              onMouseEnter={() => setHovered(country.code)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              {/* Pulse ring for selected */}
              {isSelected && (
                <circle cx={x} cy={y} r="18" fill="none" stroke="#C5A572" strokeWidth="1.5" opacity="0.4">
                  <animate attributeName="r" from="12" to="22" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Outer glow */}
              <circle
                cx={x}
                cy={y}
                r={active ? 14 : 10}
                fill={isSelected ? '#C5A572' : isHovered ? '#4a90d9' : '#1a4a7a'}
                opacity={active ? 0.3 : 0.15}
              />

              {/* Inner dot */}
              <circle
                cx={x}
                cy={y}
                r={active ? 7 : 5}
                fill={isSelected ? '#C5A572' : isHovered ? '#6aabeb' : '#4a90d9'}
                stroke={isSelected ? '#C5A572' : '#6aabeb'}
                strokeWidth={active ? 2 : 1}
              />

              {/* Flag icon on hover/select */}
              {active && (
                <image
                  href={flagUrl(country.code)}
                  x={x - 10}
                  y={y - 30}
                  width="20"
                  height="15"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                />
              )}

              {/* Country name tooltip */}
              {active && (
                <g>
                  <rect
                    x={x - 50}
                    y={y - 52}
                    width="100"
                    height="22"
                    rx="4"
                    fill="#0A1628"
                    fillOpacity="0.9"
                    stroke={isSelected ? '#C5A572' : '#4a90d9'}
                    strokeWidth="0.5"
                  />
                  <text
                    x={x}
                    y={y - 37}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {country.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
