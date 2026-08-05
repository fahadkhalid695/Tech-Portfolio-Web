/**
 * ExpertiseGraph — React Three Fiber expertise network
 *
 * Props:
 *   mode: "hero"       — full interactive scene (hero section)
 *         "ambient"    — faint low-opacity scroll-background texture
 *
 * Performance:
 *   - Lazy loaded via React.lazy + Suspense (does not block LCP)
 *   - dpr capped at 1.5
 *   - No postprocessing — pure geometry + line segments
 *   - Nodes render as instanced mesh (one draw call)
 *
 * Accessibility:
 *   - aria-hidden="true" — decorative only
 *   - Disabled entirely via .expertise-graph-canvas CSS when prefers-reduced-motion
 *   - Static gradient fallback rendered instead
 */

import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../utils/animations';

// ─── Data: expertise categories mapped to section IDs ───────────────────────

interface GraphNode {
  id: string;
  label: string;
  category: 'AI/ML' | 'Cloud' | 'Security' | 'Community' | 'Core';
  sectionId: string;
  color: string;
  size: number; // node sphere radius
}

const NODES: GraphNode[] = [
  { id: 'aiml',      label: 'AI/ML',      category: 'AI/ML',      sectionId: 'projects',      color: '#7C5CFF', size: 0.12 },
  { id: 'cloud',     label: 'Cloud',      category: 'Cloud',       sectionId: 'certifications', color: '#00D4FF', size: 0.14 },
  { id: 'security',  label: 'Security',   category: 'Security',    sectionId: 'hackathons',     color: '#38F2A0', size: 0.11 },
  { id: 'community', label: 'Community',  category: 'Community',   sectionId: 'experience',     color: '#00D4FF', size: 0.10 },
  { id: 'python',    label: 'Python',     category: 'Core',        sectionId: 'skills',         color: '#7C5CFF', size: 0.08 },
  { id: 'aws',       label: 'AWS',        category: 'Cloud',       sectionId: 'certifications', color: '#00D4FF', size: 0.09 },
  { id: 'ml',        label: 'ML Models',  category: 'AI/ML',       sectionId: 'projects',       color: '#7C5CFF', size: 0.08 },
  { id: 'ctf',       label: 'CTF',        category: 'Security',    sectionId: 'hackathons',     color: '#38F2A0', size: 0.07 },
  { id: 'captain',   label: 'Club Lead',  category: 'Community',   sectionId: 'experience',     color: '#00D4FF', size: 0.09 },
  { id: 'fullstack', label: 'Web',        category: 'Core',        sectionId: 'projects',       color: '#7C5CFF', size: 0.07 },
];

// Edges (index pairs into NODES array)
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [0, 6],
  [1, 3], [1, 5], [1, 8],
  [2, 7], [2, 3],
  [3, 8], [4, 6], [4, 9],
  [5, 8], [6, 9], [1, 9],
];

// ─── Utility ────────────────────────────────────────────────────────────────

const hexToVec3 = (hex: string): THREE.Color => new THREE.Color(hex);

// ─── Node positions (deterministic, no random on each render) ────────────────

const BASE_POSITIONS: [number, number, number][] = [
  [ 0.0,   0.6,  -0.5],
  [-0.7,  -0.2,   0.3],
  [ 0.7,  -0.1,  -0.2],
  [-0.3,  -0.7,   0.1],
  [ 0.5,   0.5,   0.4],
  [-0.8,   0.4,  -0.3],
  [ 0.3,  -0.5,   0.6],
  [ 0.8,   0.0,   0.5],
  [-0.5,   0.1,   0.7],
  [ 0.1,  -0.8,  -0.4],
];

// ─── Drift seeds per node ────────────────────────────────────────────────────

const DRIFT_SEEDS = BASE_POSITIONS.map((_, i) => ({
  freq: 0.18 + i * 0.07,
  phase: i * 0.63,
  amp: 0.08 + (i % 3) * 0.04,
}));

// ─── Nodes mesh (instanced spheres) ─────────────────────────────────────────

interface NodesProps {
  mode: 'hero' | 'ambient';
  cursorRef: React.MutableRefObject<THREE.Vector2>;
  positionsRef: React.MutableRefObject<THREE.Vector3[]>;
  onNodeClick?: (node: GraphNode) => void;
}

const Nodes: React.FC<NodesProps> = ({ mode, cursorRef, positionsRef, onNodeClick }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const camera = useThree((s) => s.camera);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const isAmbient = mode === 'ambient';
  const opacity = isAmbient ? 0.22 : 0.85;

  // Init positions
  useEffect(() => {
    positionsRef.current = BASE_POSITIONS.map(
      ([x, y, z]) => new THREE.Vector3(x, y, z)
    );
  }, [positionsRef]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    NODES.forEach((node, i) => {
      const seed = DRIFT_SEEDS[i];
      const base = BASE_POSITIONS[i];

      const px = base[0] + Math.sin(t * seed.freq + seed.phase) * seed.amp;
      const py = base[1] + Math.cos(t * seed.freq * 0.8 + seed.phase * 1.3) * seed.amp;
      const pz = base[2] + Math.sin(t * seed.freq * 0.6 + seed.phase * 0.7) * seed.amp * 0.5;

      positionsRef.current[i].set(px, py, pz);

      dummy.position.set(px, py, pz);
      dummy.scale.setScalar(node.size);
      dummy.updateMatrix();

      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
        // Tint color
        meshRef.current.setColorAt(i, hexToVec3(node.color));
      }
    });

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  const handleClick = useCallback(
    (e: THREE.Event) => {
      if (!onNodeClick || isAmbient) return;
      // @ts-ignore — R3F event
      raycaster.setFromCamera(cursorRef.current, camera);
      const hits = raycaster.intersectObject(meshRef.current);
      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        onNodeClick(NODES[hits[0].instanceId]);
      }
    },
    [onNodeClick, isAmbient, raycaster, cursorRef, camera]
  );

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, NODES.length]}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        transparent
        opacity={opacity}
        vertexColors
        toneMapped={false}
      />
    </instancedMesh>
  );
};

// ─── Edges (line segments, cursor-proximity reactive) ───────────────────────

const MAX_CURSOR_DIST = 0.65; // world units — edges within this glow

interface EdgesProps {
  mode: 'hero' | 'ambient';
  positionsRef: React.MutableRefObject<THREE.Vector3[]>;
  cursorWorldRef: React.MutableRefObject<THREE.Vector3>;
}

const Edges: React.FC<EdgesProps> = ({ mode, positionsRef, cursorWorldRef }) => {
  const lineRef = useRef<THREE.LineSegments>(null!);
  const isAmbient = mode === 'ambient';

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Allocate for all edges × 2 vertices × 3 floats
    const positions = new Float32Array(EDGES.length * 2 * 3);
    const colors = new Float32Array(EDGES.length * 2 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!lineRef.current || positionsRef.current.length === 0) return;

    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;

    EDGES.forEach(([a, b], i) => {
      const pa = positionsRef.current[a];
      const pb = positionsRef.current[b];
      if (!pa || !pb) return;

      const base = i * 6;
      positions[base]     = pa.x;
      positions[base + 1] = pa.y;
      positions[base + 2] = pa.z;
      positions[base + 3] = pb.x;
      positions[base + 4] = pb.y;
      positions[base + 5] = pb.z;

      // Cursor-proximity glow
      const midpoint = new THREE.Vector3().addVectors(pa, pb).multiplyScalar(0.5);
      const dist = cursorWorldRef.current.distanceTo(midpoint);
      const glow = isAmbient ? 0 : Math.max(0, 1 - dist / MAX_CURSOR_DIST);
      const baseOpacity = isAmbient ? 0.06 : 0.18;
      const alpha = baseOpacity + glow * 0.55;

      const nodeColorA = hexToVec3(NODES[a].color);
      const nodeColorB = hexToVec3(NODES[b].color);

      colors[base]     = nodeColorA.r * alpha;
      colors[base + 1] = nodeColorA.g * alpha;
      colors[base + 2] = nodeColorA.b * alpha;
      colors[base + 3] = nodeColorB.r * alpha;
      colors[base + 4] = nodeColorB.g * alpha;
      colors[base + 5] = nodeColorB.b * alpha;
    });

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial vertexColors toneMapped={false} transparent opacity={1} />
    </lineSegments>
  );
};

// ─── Scene (combines nodes + edges + cursor tracking) ────────────────────────

interface SceneProps {
  mode: 'hero' | 'ambient';
  onNodeClick?: (node: GraphNode) => void;
}

const Scene: React.FC<SceneProps> = ({ mode, onNodeClick }) => {
  const cursorNDC = useRef<THREE.Vector2>(new THREE.Vector2(999, 999));
  const cursorWorld = useRef<THREE.Vector3>(new THREE.Vector3(999, 999, 0));
  const positionsRef = useRef<THREE.Vector3[]>([]);
  const { camera, size } = useThree();

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      // Convert screen coords to NDC
      cursorNDC.current.x = (e.clientX / size.width) * 2 - 1;
      cursorNDC.current.y = -((e.clientY / size.height) * 2 - 1);

      // Project to z=0 world plane for edge glow
      const vec = new THREE.Vector3(cursorNDC.current.x, cursorNDC.current.y, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const dist = -camera.position.z / vec.z;
      cursorWorld.current.copy(camera.position).addScaledVector(vec, dist);
    },
    [camera, size]
  );

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  return (
    <>
      <Nodes
        mode={mode}
        cursorRef={cursorNDC}
        positionsRef={positionsRef}
        onNodeClick={onNodeClick}
      />
      <Edges
        mode={mode}
        positionsRef={positionsRef}
        cursorWorldRef={cursorWorld}
      />
    </>
  );
};

// ─── WebGL detection ─────────────────────────────────────────────────────────

const detectWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

// Heuristic low-end device detection (hardware concurrency)
const isLowEndDevice = (): boolean => {
  const nav = navigator as Navigator & { hardwareConcurrency?: number; deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  return cores <= 2 || memory <= 1;
};

// ─── Static fallback for no-WebGL / light mode / reduced-motion ──────────────

const StaticFallback: React.FC<{ mode: 'hero' | 'ambient' }> = ({ mode }) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 pointer-events-none ${
      mode === 'ambient' ? 'opacity-30' : 'opacity-60'
    }`}
  >
    {/* Radial gradient cluster to hint at nodes */}
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="rg-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rg-violet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rg-signal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38F2A0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#38F2A0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="250" rx="280" ry="220" fill="url(#rg-cyan)" />
      <ellipse cx="220" cy="380" rx="180" ry="160" fill="url(#rg-violet)" />
      <ellipse cx="600" cy="320" rx="160" ry="140" fill="url(#rg-signal)" />
      {/* Faint node circles */}
      {BASE_POSITIONS.map(([x, y], i) => (
        <circle
          key={i}
          cx={400 + x * 220}
          cy={300 - y * 180}
          r={NODES[i].size * 80}
          fill={NODES[i].color}
          opacity={0.4}
        />
      ))}
      {/* Faint edges */}
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={400 + BASE_POSITIONS[a][0] * 220}
          y1={300 - BASE_POSITIONS[a][1] * 180}
          x2={400 + BASE_POSITIONS[b][0] * 220}
          y2={300 - BASE_POSITIONS[b][1] * 180}
          stroke="#00D4FF"
          strokeOpacity={0.12}
          strokeWidth={1}
        />
      ))}
    </svg>
  </div>
);

// ─── Public component ────────────────────────────────────────────────────────

export interface ExpertiseGraphProps {
  mode?: 'hero' | 'ambient';
  className?: string;
}

const ExpertiseGraph: React.FC<ExpertiseGraphProps> = ({
  mode = 'hero',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState<boolean | null>(null);

  useEffect(() => {
    const ready = detectWebGL() && !isLowEndDevice();
    setWebglReady(ready);
  }, []);

  const handleNodeClick = useCallback((node: GraphNode) => {
    const el = document.getElementById(node.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const isLightMode = typeof document !== 'undefined' &&
    document.documentElement.classList.contains('light');

  // Show fallback: reduced-motion, no WebGL, light mode, or loading
  const showFallback = prefersReducedMotion || webglReady === false || isLightMode;
  const showCanvas = !showFallback && webglReady === true;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Static SVG fallback — always rendered, hidden by JS when canvas is active */}
      {showFallback && <StaticFallback mode={mode} />}

      {/* R3F Canvas — only when WebGL confirmed + not reduced-motion + dark mode */}
      {showCanvas && (
        <Canvas
          className="expertise-graph-canvas webgl-ready"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 2.2], fov: 55 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: mode === 'ambient' ? 0.28 : 1,
          }}
        >
          <Scene
            mode={mode}
            onNodeClick={mode === 'hero' ? handleNodeClick : undefined}
          />
        </Canvas>
      )}
    </div>
  );
};

export default ExpertiseGraph;
export { NODES };
