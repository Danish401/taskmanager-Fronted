import React from "react";
import { Box, Typography, Link, Grid, Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import MapIcon from "@mui/icons-material/Map";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#e8f5e9", // Light green background
        py: 4,
        mt: "auto",
        borderTop: "1px solid #c8e6c9", // Green border
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="green">
              Connect with us
            </Typography>
            <Box display="flex" gap={2}>
              <Link
                href="https://instagram.com"
                color="inherit"
                underline="none"
                aria-label="Instagram"
                sx={{
                  "&:hover": { color: "#388e3c" }, // Dark green hover
                }}
              >
                <InstagramIcon fontSize="large" />
              </Link>
              <Link
                href="https://facebook.com"
                color="inherit"
                underline="none"
                aria-label="Facebook"
                sx={{
                  "&:hover": { color: "#388e3c" },
                }}
              >
                <FacebookIcon fontSize="large" />
              </Link>
              <Link
                href="https://telegram.org"
                color="inherit"
                underline="none"
                aria-label="Telegram"
                sx={{
                  "&:hover": { color: "#388e3c" },
                }}
              >
                <TelegramIcon fontSize="large" />
              </Link>
            </Box>
          </Grid>

          {/* Contact Us and Map */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="green">
              Contact Us
            </Typography>
            <Typography variant="body1">
              Email:{" "}
              <Link
                href="mailto:alid13381@gmail.com"
                sx={{
                  color: "green",
                  "&:hover": { textDecoration: "underline", color: "#388e3c" },
                }}
              >
            alid13381@gmail.com
              </Link>
            </Typography>
            <Typography variant="body1">
              Phone:{" "}
              <Link
                href="tel:+91-70092-36647"
                sx={{
                  color: "green",
                  "&:hover": { textDecoration: "underline", color: "#388e3c" },
                }}
              >
                +91-70092-36647
              </Link>
            </Typography>
            <Box mt={2}>
              <Link
                href="#map"
                underline="none"
                color="inherit"
                display="flex"
                alignItems="center"
                sx={{
                  "&:hover": { color: "#388e3c" },
                }}
              >
                <MapIcon sx={{ mr: 1 }} />
                View Map
              </Link>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="green">
              About
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} Task Manager. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
