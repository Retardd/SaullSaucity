'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import './gradual-blur.css';

type GradualBlurProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  opacity?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  hoverIntensity?: number;
  target?: 'parent' | 'page';
  preset?: string;
  responsive?: boolean;
  zIndex?: number;
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
};

const DEFAULT_CONFIG: Required<Pick<GradualBlurProps, 'position' | 'strength' | 'height' | 'divCount' | 'exponential' | 'zIndex' | 'animated' | 'duration' | 'easing' | 'opacity' | 'curve' | 'responsive' | 'target' | 'className'>> & { style: React.CSSProperties; width?: string } = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {},
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 },
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const mergeConfigs = (...configs: Partial<GradualBlurProps>[]) => configs.reduce((acc, c) => ({ ...acc, ...c }), {} as Partial<GradualBlurProps>);
const getGradientDirection = (position: string) =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  })[position as 'top' | 'bottom' | 'left' | 'right'] || 'to bottom';

const debounce = (fn: (...args: unknown[]) => void, wait: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: unknown[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...(a as [])), wait);
  };
};

const useResponsiveDimension = (responsive: boolean | undefined, config: GradualBlurProps, key: 'height' | 'width') => {
  const [value, setValue] = useState(config[key] as string | undefined);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v = config[key] as string | undefined;
      const capKey = (key[0].toUpperCase() + key.slice(1)) as 'Height' | 'Width';
      const mobileKey = `mobile${capKey}` as keyof GradualBlurProps;
      const tabletKey = `tablet${capKey}` as keyof GradualBlurProps;
      const desktopKey = `desktop${capKey}` as keyof GradualBlurProps;
      if (w <= 480 && config[mobileKey]) v = config[mobileKey] as string;
      else if (w <= 768 && config[tabletKey]) v = config[tabletKey] as string;
      else if (w <= 1024 && config[desktopKey]) v = config[desktopKey] as string;
      setValue(v);
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener('resize', debounced as unknown as EventListener);
    return () => window.removeEventListener('resize', debounced as unknown as EventListener);
  }, [responsive, config, key]);
  return responsive ? value : (config[key] as string | undefined);
};

const useIntersectionObserver = (ref: React.RefObject<HTMLElement | null>, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);
  useEffect(() => {
    if (!shouldObserve || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);
  return isVisible;
};

function GradualBlur(props: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as GradualBlurProps & typeof DEFAULT_CONFIG;
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');

  const isVisible = useIntersectionObserver(containerRef as React.RefObject<HTMLElement>, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / (config.divCount ?? 5);
    const currentStrength = isHovered && config.hoverIntensity ? (config.strength ?? 2) * config.hoverIntensity : config.strength ?? 2;
    const curveFunc = CURVE_FUNCTIONS[config.curve ?? 'linear'] || CURVE_FUNCTIONS.linear;
    for (let i = 1; i <= (config.divCount ?? 5); i++) {
      let progress = i / (config.divCount ?? 5);
      progress = curveFunc(progress);
      let blurValue: number;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * (config.divCount ?? 5) + 1) * currentStrength;
      }
      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      const direction = getGradientDirection(config.position ?? 'bottom');
      const divStyle: React.CSSProperties = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition: config.animated && config.animated !== 'scroll' ? `backdrop-filter ${config.duration} ${config.easing}` : undefined,
      };
      divs.push(<div key={i} style={divStyle} />);
    }
    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position ?? 'bottom');
    const isHorizontal = ['left', 'right'].includes(config.position ?? 'bottom');
    const isPageTarget = config.target === 'page';
    const baseStyle: React.CSSProperties & Record<string, unknown> = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? (config.zIndex ?? 1000) + 100 : config.zIndex,
      ...(config.style as React.CSSProperties),
    };
    if (isVertical) {
      (baseStyle as React.CSSProperties).height = responsiveHeight;
      (baseStyle as React.CSSProperties).width = (responsiveWidth as string) || '100%';
      (baseStyle as Record<string, unknown>)[config.position ?? 'bottom'] = 0;
      (baseStyle as React.CSSProperties).left = '0';
      (baseStyle as React.CSSProperties).right = '0';
    } else if (isHorizontal) {
      (baseStyle as React.CSSProperties).width = (responsiveWidth as string) || (responsiveHeight as string);
      (baseStyle as React.CSSProperties).height = '100%';
      (baseStyle as Record<string, unknown>)[config.position ?? 'bottom'] = 0;
      (baseStyle as React.CSSProperties).top = '0';
      (baseStyle as React.CSSProperties).bottom = '0';
    }
    return baseStyle as React.CSSProperties;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;

  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const ms = parseFloat(duration as string) * 1000;
      const t = setTimeout(() => (onAnimationComplete as () => void)(), ms);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className ?? ''}`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = React.memo(GradualBlur);
(GradualBlurMemo as unknown as { displayName: string }).displayName = 'GradualBlur';
(GradualBlurMemo as unknown as Record<string, unknown>).PRESETS = PRESETS;
(GradualBlurMemo as unknown as Record<string, unknown>).CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;

const injectStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = `
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
  .gradual-blur-parent { overflow: hidden; }
  .gradual-blur-inner { pointer-events: none; }`;
  document.head.appendChild(styleElement);
};

if (typeof document !== 'undefined') {
  injectStyles();
}
