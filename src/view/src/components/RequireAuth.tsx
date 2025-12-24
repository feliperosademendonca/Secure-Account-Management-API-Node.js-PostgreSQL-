//./src/components/RequireAuth.tsx


import React from "react";
import { Navigate, useLocation } from "react-router-dom";

async function checkSession(): Promise<{ authenticated: boolean; user?: { id: string } }> {
  try {
    const res = await fetch("/auth/me", {
      method: "GET",
      credentials: "include", // envia cookies HttpOnly
    });
    if (!res.ok) return { authenticated: false };
    const data = await res.json().catch(() => ({}));
    return { authenticated: true, user: data?.user };
  } catch {
    return { authenticated: false };
  }
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const { authenticated } = await checkSession();
      if (!mounted) return;
      setOk(authenticated);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="container"><small>Verificando sessão…</small></div>;
  }

  if (!ok) {
    // Redireciona para login, preservando a rota original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
