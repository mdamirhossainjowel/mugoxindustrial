import '../globals.css';
import type { Metadata } from 'next';
import { SITE } from '@/lib/seo';
export const metadata: Metadata = { metadataBase: new URL(SITE), title: 'MugoX Industrial', description: 'PET packaging moulds, spare parts and industrial components.', alternates: { canonical: SITE + '/en' } };
export default function R({ children }: { children: React.ReactNode }) { return (<html lang="en"><body>{children}</body></html>); }
