'use client'

import { Box, TextField, Typography, Button, FormControl, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { signInSchema } from "../../utils/types"; // Import validation schema
import loginUser from "../../utils/actions/login"; // Import loginUser action
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useRouter } from 'next/navigation';



export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const validationResult = signInSchema.safeParse({ email, password });

    if (validationResult.error) {
        const { message } = validationResult.error;
        setError((prevState) => ({ ...prevState,message }));
        notifyError("Validation errors occurred.");
        return;
    }

    try {
     const user =  await loginUser(email, password);
      notifySuccess("Logged in successfully"); 
     if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/tv');
      }
      
      setEmail("");
      setPassword("");
    } catch (err:any) {
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
    >
      <Box
        sx={{
          width: '50%',
          maxWidth: '100%',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography sx={{ color: 'black', textAlign: 'center' }} variant="h4" gutterBottom>
          LOGIN
        </Typography>
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
              color:'black'
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
            type="password"
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiInputLabel-root': { color: 'black' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
              color:'black'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          {error.password && <FormHelperText>{error.password}</FormHelperText>}
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{color: 'white',marginTop: 2 , backgroundColor: 'black' }}
          type="submit"
        >
          Sign In
        </Button>
       <Typography sx={{ color: 'black', textAlign: 'center',justifyContent:'center', marginTop: 2, width:'180px' }}  gutterBottom>
          Don't have an account?
          < Link href="/sign-up">
              SignUp
          </Link>
        </Typography>

        <ToastContainer />
      </Box>
    </Box>
  );
}