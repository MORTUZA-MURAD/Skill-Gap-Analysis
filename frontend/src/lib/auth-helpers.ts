export interface UserSession {
  id: string;
  email: string;
  full_name?: string;
  role: 'student' | 'admin';
}

export async function getCurrentUser(): Promise<UserSession | null> {
  if (typeof window === 'undefined') return null;

  try {
    const res = await fetch('/api/auth/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const { user } = await res.json();
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: (user.role as 'student' | 'admin') || 'student',
    };
  } catch {
    return null;
  }
}

export function setDemoSession(user: UserSession) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo_user_session', JSON.stringify(user));
    document.cookie = `demo_user_session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;
  }
}

export function clearDemoSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('demo_user_session');
    document.cookie = 'demo_user_session=; path=/; max-age=0';
  }
}
