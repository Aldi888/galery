import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="white"
          href="https://gallery.webops.com.br"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          INICIO
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="white"
          href="#"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Fotos
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="white"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Contato
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
