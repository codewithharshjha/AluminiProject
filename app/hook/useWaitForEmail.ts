import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useWaitForEmail(callback: (email: string) => void) {
  const { user } = useUser();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      callback(email); // Call the callback with the email
    }
  }, [email]);

  return email;
}
