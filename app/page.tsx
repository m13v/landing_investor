import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the investors page when this component renders
  redirect('/investors');
  
  // The below code won't execute due to the redirect
  return null;
}