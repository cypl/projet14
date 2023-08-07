import { colors } from "./colors"

export const HRStyles = () => {
    return {
      '.mantine-InputWrapper-root':{
        position: "relative",
        marginBottom: "10px",
      },
      '.mantine-Input-wrapper, .mantine-TextInput-wrapper':{
        marginBottom:0,
      },
      '.mantine-InputWrapper-required, .mantine-TextInput-required':{
        color:`${colors.primary}`,
      },
      '.mantine-InputWrapper-error':{
          paddingTop:"5px",
      },
      '.mantine-Button-leftIcon':{
        marginRight:"0.5rem",
      },
      '.mantine-Menu-item.active':{
        backgroundColor:`${colors.primary1}`,
      },
      '.mantine-Input-input, .mantine-TextInput-input':{
        borderColor:`${colors.secondary1}`,
      }
    }
} 