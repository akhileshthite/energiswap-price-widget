import { AppBar, Container, Toolbar, Box, Button } from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "inherit",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Button
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
              startIcon={<HomeIcon />}
              sx={{
                textDecoration:
                  location.pathname === "/" ? "underline green 3px" : "none",
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => history.push(`/Wallet`)}
              variant="h6"
              className={classes.title}
              startIcon={<AccountBalanceWalletIcon />}
              style={{
                textDecoration:
                  location.pathname === "/wallet"
                    ? "underline green 3px"
                    : "none",
              }}
            >
              Wallet
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
