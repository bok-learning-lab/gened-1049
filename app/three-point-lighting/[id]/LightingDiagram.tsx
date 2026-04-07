"use client";

import { useState } from "react";
import type { LightConfig } from "../stills";

interface LightingDiagramProps {
  keyLight: LightConfig;
  fillLight: LightConfig;
  backLight: LightConfig;
}

/**
 * Convert a top-down angle (0 = front, clockwise) to x,y position
 * on a circle of given radius, centered at (cx, cy).
 * We treat 0° as "bottom" (in front of the subject facing camera)
 * and go clockwise.
 */
const angleToPosition = (angleDeg: number, radius: number, cx: number, cy: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

/**
 * Generate a CSS radial gradient representing light hitting a sphere
 * from a given angle and elevation. The gradient center is offset toward
 * the light source, with elevation shifting the highlight vertically.
 */
const lightToGradient = (angleDeg: number, elevation: number, intensity: number, color: string) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const elevRad = (elevation * Math.PI) / 180;
  // Horizontal influence diminishes as the light moves directly above/below
  const horizScale = Math.cos(elevRad);
  const offsetX = 50 + Math.cos(rad) * 30 * horizScale;
  // Elevation shifts highlight up (negative Y in CSS) when light is above
  const offsetY = 50 + Math.sin(rad) * 30 * horizScale - Math.sin(elevRad) * 25;
  const alpha = intensity;

  return `radial-gradient(ellipse at ${offsetX}% ${offsetY}%, ${color}${alphaToHex(alpha)} 0%, transparent 70%)`;
};

/**
 * Back/rim light creates an edge glow on the sphere.
 * The rim appears on the same side as the light's horizontal offset
 * (light behind-left → rim on left edge), and elevation controls
 * the vertical position (low light → lower rim, high light → upper rim).
 */
const rimLightGradient = (angleDeg: number, elevation: number, intensity: number, color: string) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const elevRad = (elevation * Math.PI) / 180;
  // Horizontal offset: light behind-left → rim on left edge of sphere
  const offsetX = 50 + Math.cos(rad) * 45;
  // Vertical: low elevation → lower rim, high elevation → upper rim
  const offsetY = 50 - Math.sin(elevRad) * 40;
  const alpha = intensity * 0.8;

  return `radial-gradient(ellipse at ${offsetX}% ${offsetY}%, ${color}${alphaToHex(alpha)} 0%, transparent 40%)`;
};

const alphaToHex = (a: number) => {
  const val = Math.round(Math.min(1, Math.max(0, a)) * 255);
  return val.toString(16).padStart(2, "0");
};

type LightType = "key" | "fill" | "back";

const LIGHT_COLORS: Record<LightType, string> = {
  key: "rgb(251, 191, 36)",
  fill: "rgb(147, 197, 253)",
  back: "rgb(253, 230, 138)",
};

export const LightingDiagram = ({
  keyLight,
  fillLight,
  backLight,
}: LightingDiagramProps) => {
  const [activeLights, setActiveLights] = useState<Record<LightType, boolean>>({
    key: false,
    fill: false,
    back: false,
  });

  const toggleLight = (type: LightType) => {
    setActiveLights((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const allLights: { type: LightType; config: LightConfig }[] = [
    { type: "key", config: keyLight },
    { type: "fill", config: fillLight },
    { type: "back", config: backLight },
  ];

  // Build sphere gradients
  const sphereGradients: string[] = [];
  if (activeLights.key) {
    sphereGradients.push(lightToGradient(keyLight.angle, keyLight.elevation, keyLight.intensity, keyLight.color));
  }
  if (activeLights.fill) {
    sphereGradients.push(lightToGradient(fillLight.angle, fillLight.elevation, fillLight.intensity, fillLight.color));
  }
  if (activeLights.back) {
    sphereGradients.push(rimLightGradient(backLight.angle, backLight.elevation, backLight.intensity, backLight.color));
  }
  // Base sphere gradient (dark with subtle ambient)
  sphereGradients.push("radial-gradient(ellipse at 40% 35%, #1a1a1a 0%, #080808 70%, #000000 100%)");

  const cx = 200;
  const cy = 200;
  const orbitRadius = 155;
  const sphereRadius = 60;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full max-w-5xl mx-auto">
      {/* Diagram */}
      <div className="relative flex-shrink-0">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="w-[min(400px,80vw)] h-[min(400px,80vw)]"
        >
          {/* Grid lines for floor reference */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.3" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#grid)" />

          {/* Orbit circle */}
          <circle cx={cx} cy={cy} r={orbitRadius} fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" />

          {/* Light beams (when active) */}
          {allLights.map(({ type, config }) => {
            if (!activeLights[type]) return null;
            const pos = angleToPosition(config.angle, orbitRadius, cx, cy);
            return (
              <g key={`beam-${type}`}>
                <line
                  x1={pos.x}
                  y1={pos.y}
                  x2={cx}
                  y2={cy}
                  stroke={LIGHT_COLORS[type]}
                  strokeWidth={type === "key" ? 3 : 2}
                  opacity={config.intensity * 0.4}
                />
                {/* Glow around beam */}
                <line
                  x1={pos.x}
                  y1={pos.y}
                  x2={cx}
                  y2={cy}
                  stroke={LIGHT_COLORS[type]}
                  strokeWidth={type === "key" ? 12 : 8}
                  opacity={config.intensity * 0.08}
                />
              </g>
            );
          })}

          {/* Subject circle (top-down view) */}
          <circle cx={cx} cy={cy} r={sphereRadius} fill="#111" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <text x={cx} y={cy + 4} textAnchor="middle" fill="white" opacity="0.25" fontSize="11" fontFamily="monospace">
            SUBJECT
          </text>

          {/* Camera indicator */}
          <g transform={`translate(${cx}, 385)`}>
            <rect x="-16" y="-8" width="32" height="16" rx="3" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
            <text x="0" y="4" textAnchor="middle" fill="white" opacity="0.3" fontSize="8" fontFamily="monospace">
              CAM
            </text>
          </g>

          {/* Light sources (clickable) */}
          {allLights.map(({ type, config }) => {
            const pos = angleToPosition(config.angle, orbitRadius, cx, cy);
            const isOn = activeLights[type];
            const color = LIGHT_COLORS[type];

            return (
              <g
                key={type}
                className="cursor-pointer"
                onClick={() => toggleLight(type)}
              >
                {/* Glow when active */}
                {isOn && (
                  <circle cx={pos.x} cy={pos.y} r="24" fill={color} opacity="0.15" />
                )}
                {/* Light icon circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="14"
                  fill={isOn ? color : "#222"}
                  stroke={isOn ? color : "#555"}
                  strokeWidth="1.5"
                  opacity={isOn ? 1 : 0.6}
                />
                {/* Power indicator */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill={isOn ? "#000" : "#444"}
                  opacity={isOn ? 0.5 : 0.4}
                />
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + 28}
                  textAnchor="middle"
                  fill={isOn ? color : "#666"}
                  fontSize="10"
                  fontFamily="monospace"
                  className="uppercase"
                >
                  {config.label.replace(" Light", "")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 3D Sphere + Light descriptions */}
      <div className="flex flex-col items-center lg:items-start gap-8">
        {/* Rendered sphere */}
        <div className="relative">
          <div
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/5 transition-all duration-500"
            style={{
              background: sphereGradients.join(", "),
              boxShadow: [
                activeLights.key
                  ? `0 0 60px 10px ${keyLight.color}${alphaToHex(keyLight.intensity * 0.15)}`
                  : "",
                activeLights.fill
                  ? `0 0 40px 5px ${fillLight.color}${alphaToHex(fillLight.intensity * 0.1)}`
                  : "",
                activeLights.back
                  ? `inset 0 0 30px 5px ${backLight.color}${alphaToHex(backLight.intensity * 0.2)}`
                  : "",
              ]
                .filter(Boolean)
                .join(", ") || "none",
            }}
          />
          {!activeLights.key && !activeLights.fill && !activeLights.back && (
            <p className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-mono text-center px-4">
              Click the lights<br />to illuminate
            </p>
          )}
        </div>

        {/* Active light description */}
        <div className="space-y-4 max-w-sm">
          {allLights.map(({ type, config }) => (
            <button
              key={type}
              onClick={() => toggleLight(type)}
              className={`block w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                activeLights[type]
                  ? "border-white/20 bg-white/[0.03]"
                  : "border-white/5 bg-transparent opacity-40 hover:opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: activeLights[type] ? LIGHT_COLORS[type] : "#333",
                  }}
                />
                <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                  {config.label}
                </span>
                <span className="ml-auto font-mono text-[10px] text-white/30">
                  {activeLights[type] ? "ON" : "OFF"}
                </span>
              </div>
              {activeLights[type] && (
                <p className="text-sm text-gray-400 leading-relaxed">
                  {config.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
