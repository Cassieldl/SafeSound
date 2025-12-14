import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock } from "lucide-react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const isAdmin = user.trim().toLowerCase() === "admin" && password === "admin";

    if (isAdmin) {
      navigate("/home"); // Dashboard
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-background to-purple-900/40 blur-3xl" />

      <div className="w-full max-w-md relative z-10 bg-[#0f0f13] border border-white/5 shadow-2xl rounded-2xl p-8 bg-card/10 
                      backdrop-blur-xl transition-all">

        <h1 className="text-3xl font-bold mb-8 text-center text-white tracking-tight">
          Bem-vindo
        </h1>

        <div className="space-y-5">

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="pl-12 py-6 rounded-xl bg-[#1a1a22] text-white border-white/10 focus-visible:ring-purple-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 py-6 rounded-xl bg-[#1a1a22] text-white border-white/10 focus-visible:ring-purple-500"
            />
          </div>

          <Button
            className="w-full py-6 text-lg rounded-xl bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          *Use <strong>admin</strong> para acessar o Dashboard.
        </p>
      </div>
    </div>
  );
}
