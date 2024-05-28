// app/components/auth/logout-form.tsx

import { Avatar, Box, Typography } from "@mui/material"
import { signOut } from "next-auth/react"
 
interface User {
    email: string;
    role: string | null;
    username: string;
    password: string;
  }
  
export function LogOut({ user }: { user: User }) {

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
      >
        <Box sx={{ borderBottom: '3px solid', height: '80%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          <Avatar sx={{ width: 100, height: 100 }} />
          <Typography variant="h2">
            {user.username}
          </Typography>
          <Typography sx={{ fontFamily: 'sans', color: 'black' }} variant="h6" gutterBottom>
            {user.email}
          </Typography>
        </Box>

        <Typography 
          variant="h6" 
          color="error" 
          sx={{ textAlign: 'center', cursor: 'pointer', marginTop: 2 }} 
          onClick={() => signOut()}
        >
          LOGOUT
        </Typography>
      </Box>
    </Box>
  );
}
