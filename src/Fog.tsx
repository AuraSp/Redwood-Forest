import { useEffect, useRef } from 'react';
import { FogProps, FogUniforms } from './type/types';

import * as THREE from 'three';
import vertexShader from './data/vertexShader.glsl';
import fragmentShader from './data/fragmentShader.glsl';

import { MdKeyboardArrowDown } from "react-icons/md";
import './assets/styles/fog.scss';


function debounce(func: (...args: any[]) => void, delay: number) {
  // timeoutId stores a reference to the setTimeout function
  //ReturnType<typeof setTimeout> ensures that timeoutId has the correct type, which can vary between Node.js and browsers
  let timeoutId: ReturnType<typeof setTimeout>;
  // This returns a new function that wraps func
  // The ...args: any[] allows passing any arguments to func
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}


function Fog({ progress, setProgress }: FogProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const uniforms = useRef<FogUniforms>({
    progress: { value: 0.4 },
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    startTexture: { value: new THREE.TextureLoader().load('./images/default.png') },
    _Vignette: { value: 0.5 },
    _Grain: { value: 0.08 },
  }).current;

  const incrementProgress = () => {
    if (progress >= 100) return;
    const newProgress = Math.min(progress + 1, 100);
    // const newProgress = 20;

    uniforms.progress.value = newProgress / 100 * 0.5;
    setProgress(newProgress);
  };

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      incrementProgress();
    }, 40);

    return () => clearInterval(loadingInterval);
  }, [progress]);



  function startFadeOut() {
    const fadeOutInterval = setInterval(() => {
      uniforms.progress.value += 0.02;

      const opacityValue = Number((1 - uniforms.progress.value).toFixed(6));

      if (mountRef.current) {
        mountRef.current.style.opacity = opacityValue.toString();
      }

      if (overlayRef.current) {
        overlayRef.current.style.opacity = opacityValue.toString();
      }

      if (uniforms.progress.value >= 1.0) {
        clearInterval(fadeOutInterval);

        if (mountRef.current) mountRef.current.setAttribute("data-hidden", "true");
        if (overlayRef.current) overlayRef.current.setAttribute("data-hidden", "true");

        setTimeout(() => {
          if (mountRef.current) mountRef.current.setAttribute("data-gone", "true");
          if (overlayRef.current) overlayRef.current.setAttribute("data-gone", "true");
        }, 1500);
      }
    }, 100);
  }




  // THREE.JS implementation
  useEffect(() => {
    const startTime = performance.now();
    console.log("Canvas initialization started");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);
    scene.add(mesh);
    const clock = new THREE.Clock();
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = debounce(() => {
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 200);


    window.addEventListener('resize', handleResize);

    const endTime = performance.now();
    console.log(`Canvas initialization completed in ${endTime - startTime}ms`);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };

  }, [uniforms]);




  return (
    <div id='threejs' ref={mountRef}>
      <div className={`fogoverlay ${progress == 100 ? 'visible' : ''}`} ref={overlayRef}>
        <p>There are secrets in these forests - trees that reach over 380 feet, older than anything we know, kept hidden to protect these giants from us and preserve their fragile ecosystems. The mysteries of these ancient giants, hidden within the mist and surrounded by rugged terrain, spark wonder about how such monumental trees continue to thrive in these remote, protected spaces.</p>
        <button className='fogbutton' onClick={startFadeOut}><MdKeyboardArrowDown /></button>
      </div>
    </div>
  )
}

export default Fog