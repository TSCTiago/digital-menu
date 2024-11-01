import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    console.log("Login bem-sucedido:", { email, password });
    setError(null);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              FoodConnect
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  {error}
                </Typography>
              )}
              <Box>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Lembrar-me"
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                onClick={() => (window.location.pathname = "/")}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
  );
};
