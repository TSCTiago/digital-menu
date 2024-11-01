import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Tabs,
  Tab,
  ButtonGroup,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

// Dados de exemplo
const menuData = {
  categories: [
    {
      type: "Comidas",
      subcategories: [
        {
          id: "1",
          name: "Lanches",
          items: [
            {
              id: "item1",
              name: "Hamburguer",
              description: "Hamburguer artesanal com queijo e bacon.",
              price: 15.0,
              photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFcsKJ0ESIU8FhTGvWmL-XKGp2wgoYgGaebw&s",
            },
            {
              id: "item2",
              name: "Pastel",
              description: "Pastel de carne com queijo.",
              price: 8.0,
              photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFcsKJ0ESIU8FhTGvWmL-XKGp2wgoYgGaebw&s",
            },
          ],
        },
        {
          id: "2",
          name: "Pizzas",
          items: [
            {
              id: "item3",
              name: "Pizza Margherita",
              description: "Pizza com molho de tomate, queijo e manjericão.",
              price: 30.0,
              photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFcsKJ0ESIU8FhTGvWmL-XKGp2wgoYgGaebw&s",
            },
          ],
        },
      ],
    },
    {
      type: "Bebidas",
      subcategories: [
        {
          id: "3",
          name: "Refrigerantes",
          items: [
            {
              id: "item5",
              name: "Coca-Cola",
              description: "Lata de 350ml.",
              price: 5.0,
              photo: "https://st3.depositphotos.com/1063437/32154/i/450/depositphotos_321541624-stock-photo-can-and-glass-of-coca.jpg",
            },
          ],
        },
      ],
    },
  ],
};

// Efeito de splash e borda sutil
const SplashEffect = styled(CardActionArea)({
  "&:hover": {
    transform: "scale(1.03)",
    transition: "transform 0.2s ease-in-out",
  },
});

// Componente principal
export const MenuPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState("Comidas");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleTypeChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedType(newValue);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const activeCategory = menuData.categories.find(
    (category) => category.type === selectedType
  );
  const filteredItems = selectedSubcategory
    ? activeCategory?.subcategories.find(
        (sub) => sub.id === selectedSubcategory
      )?.items || []
    : activeCategory?.subcategories.flatMap((sub) => sub.items) || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
        Cardápio do Restaurante
      </Typography>

      {/* Tabs para Comidas e Bebidas */}
      <Tabs
        value={selectedType}
        onChange={handleTypeChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Comidas" value="Comidas" />
        <Tab label="Bebidas" value="Bebidas" />
      </Tabs>

      {/* Filtro de Subcategorias */}
      {activeCategory && (
        <ButtonGroup variant="outlined" sx={{ mb: 3 }}>
          {activeCategory.subcategories.map((subcategory) => (
            <Button
              key={subcategory.id}
              onClick={() => handleSubcategoryChange(subcategory.id)}
              variant={selectedSubcategory === subcategory.id ? "contained" : "outlined"}
              sx={{ textTransform: "none" }}
            >
              {subcategory.name}
            </Button>
          ))}
        </ButtonGroup>
      )}

      {/* Grid de itens */}
      <Grid container spacing={2}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card sx={{ maxHeight: 300, display: "flex", flexDirection: "column", borderRadius: 2, boxShadow: 3 }}>
              <SplashEffect>
                <CardMedia
                  component="img"
                  image={item.photo}
                  alt={item.name}
                  sx={{ height: 140, filter: "brightness(0.85)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", mb: 1 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: "bold" }}>
                    R$ {item.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </SplashEffect>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// export default RestaurantMenuPage;
