'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useAuth } from '@/context/auth';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  useEffect(() => {
    posthog.init('phc_OEaFKwyNDB6Iyp5oiAS00rV9vx8iU5W4nyRwI9KKwRX', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'always',
      autocapture: true,
    });

    if (user) {
      posthog.identify(user.id || `${Date.now()}`, {
        name: user.name || 'unknown@example.com',
        email: user.email || 'Unknown User',
      });
    } else {
      posthog.identify(`${Date.now()}`, {
        email: 'guest@mail.com',
        name: 'Guest User',
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
