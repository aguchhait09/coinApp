import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {

  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Rate', 'Exchange', 'Market'];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FINANCE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href={item === 'Home' ? '/' : `/${item.toLocaleLowerCase()}`} style={{textDecoration: 'none', color: 'black'}}><ListItemText primary={item} /></Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', mb: 10 }}>
      <CssBaseline />
      <AppBar component="nav" color='inherit' sx={{ boxShadow: "none", }}>
        <Toolbar >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none',} }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold', color: '#e46905' } }}
          >
            FINANCE
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block', } }}>
            {navItems.map((item, key) => (
              <Link href={item === 'Home' ? '/' : `/${item.toLocaleLowerCase()}`} key={key}>
                <Button key={item} sx={{
                  color: 'black', ml: 3, fontWeight: 'bold', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#e46905',
                  },
                }}>
                  {item}
                </Button></Link>
            ))}
          </Box>
          <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}