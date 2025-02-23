import { Dispatch, SetStateAction } from 'react';
import * as THREE from 'three';

// Union Type for ScreenSize
export type ScreenSize = 'small' | 'medium' | 'large';

// Data interface
export interface Data {
  id: number;
  title: string;
  description: string;
  coordinates: string;
  bgImg: string;
  descriptionImg: string;
}

// Component prop interfaces
export interface TopRowProps {
  screenSize: ScreenSize;  // Using the union type
  onContentChoose: (content: Data) => void;
}

export interface MiddleRowProps {
  screenSize: ScreenSize;  // Using the union type
  chosenContent: Data;
}

export interface BottomRowProps {
  screenSize: ScreenSize;  // Using the union type
  chosenContent: Data;
}

export interface OverlayNavProps {
  onClose: (content: Data | null) => void;
  screenSize: ScreenSize;  // Using the union type
}

export interface OverlayPanelProps {
  onClose: () => void;
}

export interface FogProps {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}

export interface FogUniforms {
  [key: string]: THREE.IUniform<any>; // Generic for additional uniforms
  progress: THREE.IUniform<number>;
  time: THREE.IUniform<number>;
  resolution: THREE.IUniform<THREE.Vector2>;
  startTexture: THREE.IUniform<THREE.Texture>;
  _Vignette: THREE.IUniform<number>;
  _Grain: THREE.IUniform<number>;
}
