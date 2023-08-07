import { colors } from "./colors"

export const HRStyles = () => {
    return {
        '.mantine-InputWrapper-root':{
          paddingBottom:"5px",
          position: "relative",
          marginBottom: "20px",
        },
        '.mantine-Input-wrapper, .mantine-TextInput-wrapper':{
          marginBottom:0,
        },
        '.mantine-InputWrapper-required, .mantine-TextInput-required':{
          color:`${colors.primary}`,
        },
        '.mantine-InputWrapper-label, .mantine-TextInput-label': {
            fontWeight:400,
        },
        '.mantine-InputWrapper-error':{
          position: "absolute",
          bottom:0,
          transform: "translate(0,100%)",
        },
        '.mantine-Button-leftIcon':{
          marginRight:"0.5rem",
        },
        '.mantine-Menu-item.active':{
          backgroundColor:`${colors.light2}`,
        },
        '.mantine-Input-input, .mantine-TextInput-input':{
            borderColor:`${colors.light2}`,
        }
    }
} 