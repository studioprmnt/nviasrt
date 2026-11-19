import { PageIn } from '@/components/motion';

// Re-mounts on every top-level navigation, so each page settles in softly (GSAP, see components/motion.tsx).
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageIn>{children}</PageIn>;
}
