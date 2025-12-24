import { useEffect, useState } from "react";
import type { User, MeResponse } from "../types/User";

export const Me = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/profile/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // importante se usar cookie/JWT
        });

        if (!response.ok) {
          throw new Error("Falha ao carregar usuário");
        }

        const result: MeResponse = await response.json();
        console.log(result)
        setData(result.user);

      } catch (err) {
        setError("Não foi possível carregar os dados do usuário");
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

return (
  <div>
    <input type="text" value={data.name} readOnly />
    <input type="email" value={data.email ?? ""} readOnly />
    <input type="text" value={data.phone} readOnly />
  </div>
);

};
