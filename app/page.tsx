// app/page.tsx
import { Box, Container, Typography } from "@mui/material";
import { SignUpPage } from "../components/auth/sign-up";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import darkTheme from '../utils/theme';
import CssBaseline from '@mui/material/CssBaseline';
import  {auth} from '@/auth';
import { LoginPage } from "@/components/auth/login-form";
interface User {
  email: string;
  role: string | null;
  username: string;
  password: string;
}

const Home = async () => {
  const session = await auth();
  
  if (session) {
    const user = session.user as User;

    if (user.role === 'ADMIN') {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: '/movies',
          permanent: false,
        },
      };
    }
  }

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100vh"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="60%"
            height="100%"
            sx={{ paddingLeft: '17%' }}
          >
            <Typography
              sx={{ fontFamily: 'sans', color: 'white' }}
              padding={2}
              variant="h5"
              gutterBottom
            >
              Welcome to T-Movies
            </Typography>
            <Typography
              sx={{ fontFamily: 'sans', color: 'white' }}
              padding={2}
              variant="h6"
              gutterBottom
            >
              Watch your favorite movies and shows
            </Typography>
          </Box>
          <Box width="100%">
            <LoginPage  />
          </Box>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

export default Home;
