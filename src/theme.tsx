import { createMuiTheme } from "@material-ui/core"

export const theme = createMuiTheme ({
   palette: {
      primary: {
         main: "#689f38",
      },
   },
   typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: ['"Lato"', "sans-serif"].join(",")
   },
})