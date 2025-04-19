// pages/Login.tsx
/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePdv } from '../hooks/usePdv';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = usePdv();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) {
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } else {
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-700 p-3 rounded-full border border-gray-600">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-8">ACESSO AO SISTEMA</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="h-5 w-5" />
              <label className="text-sm font-medium">E-mail</label>
            </div>
            <input
              type="email"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 
                        focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="h-5 w-5" />
              <label className="text-sm font-medium">Senha</label>
            </div>
            <input
              type="password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 
                        focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-gray-900 font-bold py-3 px-4 rounded-lg
                      transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2
                      focus:ring-primary focus:ring-opacity-50 flex items-center justify-center gap-2"
          >
            <Lock className="h-5 w-5" />
            ENTRAR NO SISTEMA
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Sistema PDV v{import.meta.env.VITE_APP_VERSION}
        </div>
      </div>
    </div>
  );
};
*/