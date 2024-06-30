import { motion, useAnimation } from 'framer-motion';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const controls = useAnimation();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to home page or another protected route
        router.push('/');
      } else {
        // Handle login error
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const animationEffectsFirstLoad = {
    scale: [0.9, 1],
    opacity: [0, 1],
  };

  const transtionEffects = {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <nav className="sticky top-0 z-20 h-14 w-full bg-resume-800 flex py-2.5 px-4 xl:px-60 items-center shadow-level-8dp">
        <Link href="/">
          <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
        </Link>
      </nav>
      <div
        style={{
          background: 'linear-gradient(180deg, #E7EEFA 50%, #FFFFFF 100%)',
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        <div className="mx-6 md:mx-40 xl:mx-60 my-24">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={animationEffectsFirstLoad}
            transition={transtionEffects}
          >
            <h1 className="text-5xl mb-12 text-resume-800">Login</h1>
            <form onSubmit={handleLogin} className="w-full max-w-sm">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className="mb-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <Button type="submit" variant="contained" className="bg-resume-800 mb-4">
                Login
              </Button>
            </form>
            <p className="text-resume-800">
              Don't have an account?{' '}
              <Link href="/register">
                <a className="text-resume-600 underline">Register</a>
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
