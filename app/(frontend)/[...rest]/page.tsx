import { notFound } from 'next/navigation';
// Any unknown URL renders the site's own 404 page.
export default function CatchAll() { notFound(); }
