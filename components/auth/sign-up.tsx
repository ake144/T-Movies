'use client';

import { Box, TextField, Typography, Button, FormControl, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { signUpSchema } from "../../utils/types"; // Import validation schema
import { createUser } from "../../utils/actions/createUser"; // Import createUser action
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const validationResult = signUpSchema.safeParse({ username, email, password });

    if (validationResult.error) {
      const { message, path } = validationResult.error.errors[0];
      setError((prevState) => ({ ...prevState, [path[0]]: message }));
      notifyError("Validation errors occurred.");
      return;
    }

    try {
      const user = await createUser(username, email, password);
      notifySuccess("User created successfully");
      router.push('/login');
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error('Error:', err.message);
      notifyError(err.message);
    }
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '75%', md: '50%' },
          maxWidth: '100%',
          backgroundColor: 'white',
          padding: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: 3,
          margin: { xs: 2, md: 0 },
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography sx={{ color: 'black', textAlign: 'center' }} variant="h4" gutterBottom>
          SIGN UP
        </Typography>
        <FormControl fullWidth margin="normal" error={Boolean(error.username)}>
          <TextField
            fullWidth
            label="Username"
            id="username"
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiInputLabel-root': { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          {error.username && <FormHelperText>{error.username}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={Boolean(error.email)}>
          <TextField
            fullWidth
            label="Email"
            id="email"
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiInputLabel-root': { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          {error.email && <FormHelperText>{error.email}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={Boolean(error.password)}>
          <TextField
            fullWidth
            label="Password"
            id="password"
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiInputLabel-root': { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
            }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          {error.password && <FormHelperText>{error.password}</FormHelperText>}
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: 'black', color: 'white' }}
          type="submit"
        >
          Sign Up
        </Button>
        <Typography sx={{ color: 'black', textAlign: 'center', marginTop: 2 }}>
          Do you have an account?{' '}
          <Link href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Login
          </Link>
        </Typography>

        <ToastContainer />
      </Box>
    </Box>
  );
}
