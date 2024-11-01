import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { NavBar } from "../../components/AppBar";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const restaurants = [
  {
    id: 1,
    name: "Sabor Brasileiro",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQivJ_qtSQQqap_waf8m5Diuf4u8l2JS2IAQ&s",
  },
  {
    id: 2,
    name: "Pasta & Co.",
    photo:
      "https://marketplace.canva.com/EAFpeiTrl4c/1/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-9Gfim1S8fHg.jpg",
  },
  // ... Outros restaurantes
];

export function HomePage() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    logo: null,
    cep: "",
    address: "",
    address_complement: "",
    address_number: "",
    city: "",
    state: "",
    country: "Brasil", // Padrão Brasil
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormValues((prevValues) => ({
      ...prevValues,
      logo: file,
    }));
  };

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, "");
    setFormValues((prevValues) => ({
      ...prevValues,
      cep,
    }));

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;

        setFormValues((prevValues) => ({
          ...prevValues,
          address: `${logradouro}, ${bairro}`,
          city: localidade,
          state: uf,
        }));
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", formValues.name);
    if (formValues.logo) {
      formData.append("logo", formValues.logo);
    }
    formData.append("address", formValues.address);
    formData.append("address_complement", formValues.address_complement || "");
    formData.append("address_number", formValues.address_number);
    formData.append("city", formValues.city);
    formData.append("state", formValues.state);
    formData.append("country", formValues.country);

    // Aqui você pode enviar `formData` para o backend.
    console.log("Restaurante criado:", formData);
    handleClose();
  };

  return (
    <Stack spacing={2}>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, alignSelf: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Restaurantes
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={3}>
          {restaurants.map((restaurant) => (
            <Box
              key={restaurant.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.33% - 16px)",
                },
              }}
            >
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  sx={{ height: 180 }}
                  image={restaurant.photo}
                  title={restaurant.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore a variedade e os sabores únicos!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                  >
                    Ver
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{
              py: 1.5,
              px: 4,
              mb: 4,
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            Adicionar
          </Button>
        </Stack>

        {/* Modal de criação do restaurante */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Adicionar Restaurante</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Nome"
                name="name"
                fullWidth
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ mt: 2 }}
              >
                Upload Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              <TextField
                label="CEP"
                name="cep"
                fullWidth
                value={formValues.cep}
                onChange={handleCepChange}
                required
              />
              <TextField
                label="Endereço"
                name="address"
                fullWidth
                value={formValues.address}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Complemento do Endereço"
                name="address_complement"
                fullWidth
                value={formValues.address_complement}
                onChange={handleInputChange}
              />
              <TextField
                label="Número"
                name="address_number"
                fullWidth
                value={formValues.address_number}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Cidade"
                name="city"
                fullWidth
                value={formValues.city}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Estado"
                name="state"
                fullWidth
                value={formValues.state}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="País"
                name="country"
                fullWidth
                value={formValues.country}
                onChange={handleInputChange}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Criar Restaurante
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Stack>
  );
}
