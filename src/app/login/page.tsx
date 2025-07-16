'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@hhi-ni.com', password: 'admin123' },
    { role: 'Branch Manager', email: 'lindsay.murphy@hhi-ni.com', password: 'manager123' },
    { role: 'Branch Worker', email: 'alan.mckenna@hhi-ni.com', password: 'worker123' },
    { role: 'Subcontractor', email: 'info@premierbathrooms.com', password: 'contractor123' }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-white font-bold">HHI</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to HHI CRM
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Demo Credentials
              </h3>
              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    onClick={() => fillDemoCredentials(cred.email, cred.password)}
                    className="w-full text-left p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900">{cred.role}</div>
                    <div className="text-xs text-gray-500">{cred.email}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                This is a demo application. Use the credentials above to test different user roles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 