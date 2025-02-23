import { Dispatch, SetStateAction } from 'react';


type ScreenSize = 'small' | 'medium' | 'large';

type TopRowProps = {
    screenSize: string;
    onContentChoose: (content: Data) => void;
}

type MiddleRowProps = {
    screenSize: string;
    chosenContent: Data;
}

type BottomRowProps = {
    screenSize: string;
    chosenContent: Data;
}

type OverlayNavProps = {
    onClose: (content: Data | null) => void;
    screenSize: string;
}

type OverlayPanelProps = {
    onClose: () => void;
}




interface Data {
    id: number;
    title: string;
    description: string;
    coordinates: string;
    bgImg: string;
    descriptionImg: string;
}

interface FogProps {
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
}

interface FogUniforms {
    // allows any additional uniforms to be dynamically added
    //the object conform to the THREE.IUniform<T> structure
    //enforces type safety
    [key: string]: THREE.IUniform<any>;
    progress: THREE.IUniform<number>;
    time: THREE.IUniform<number>;
    resolution: THREE.IUniform<THREE.Vector2>;
    startTexture: THREE.IUniform<THREE.Texture>;
    _Vignette: THREE.IUniform<number>;
    _Grain: THREE.IUniform<number>;
}


export { ScreenSize, Data, TopRowProps, MiddleRowProps, BottomRowProps, FogProps, FogUniforms, OverlayNavProps, OverlayPanelProps };