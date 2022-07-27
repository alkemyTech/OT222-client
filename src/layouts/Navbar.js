import { Box, Button, Grid, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import NavButton from '../components/NavButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ mobile, setMobile }) => {
  const [status, setStatus] = useState(false);

  const authAdmin = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/me', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.roleId === 1) {
          setStatus(true);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    authAdmin();
  }, []);

  const isAdmin = status ? '/backoffice/news' : '/news';
  const navItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Nosotros', path: '/staff' },
    { text: 'Novedades', path: isAdmin },
    { text: 'Testimonios', path: '/testimonials' },
    { text: 'Contacto', path: '/contact' },
    { text: 'Contribuye', path: '/contribute' },
  ];

  const auth = () => {
    if (localStorage.getItem('token')) {
      navItems.push({ text: 'Backoffice', path: '/backoffice' });
    } else {
      console.log('no esta logueado');
    }
  };
  auth();

  const logoutFunc = (dispatch, navigate) => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
    document.location.reload();
  };

  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid
      autoFlow={mobile === false ? 'column' : 'row'}
      fontSize={
        mobile === false ? ['sm', 'lg', 'lg', 'xl', 'xl', '2xl'] : '2xl'
      }
      gap="1vw"
      textAlign={'center'}
      alignItems="center"
      display={
        mobile === false
          ? ['none', 'none', 'grid', 'grid']
          : ['grid', 'grid', 'grid', 'grid']
      }
      h={mobile === true ? '60vh' : 'auto'}
      ml="auto"
      w="100%"
    >
      {navItems.map((element, key) => {
        return (
          <Box
            fontWeight={location === element.path ? '500' : 'none'}
            key={key}
            onClick={mobile === true ? () => setMobile(false) : undefined}
          >
            <NavLink to={element.path}>
              <Text
                fontWeight={location === element.path ? '700' : '400'}
                key={key}
              >
                {element.text}
              </Text>
            </NavLink>
          </Box>
        );
      })}
      <Grid
        autoFlow={'column'}
        ml="auto"
        gap="2vw"
        display={['none', 'none', 'grid', 'grid']}
      >
        {useSelector(state => state.user.isLogged) ? (
          <Button variant="link" onClick={() => logoutFunc(dispatch, navigate)}>
            Cerrar Sesión
          </Button>
        ) : (
          <>
            <NavButton name="Log In" path="/login" mobile={false} setMobile={setMobile}/>
            <NavButton
              name="Registrarse"
              path="/register"
              color="red"
              mobile={false}
              setMobile={setMobile}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Navbar;
