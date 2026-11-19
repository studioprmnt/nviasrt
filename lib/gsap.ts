'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/** Motion tokens from the Motion Brief, expressed as GSAP eases. */
export const EASE = {
  settle: 'power4.out', // ≈ cubic-bezier(0.22, 1, 0.36, 1)
  standard: 'power2.inOut',
  exit: 'power2.in',
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
