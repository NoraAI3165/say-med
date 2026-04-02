// Root page - middleware handles locale detection and redirect
// This file exists as fallback only
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
