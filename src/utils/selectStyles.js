import { colors } from "./colors"

/**
 * customs styles for the SelectField component
 */
export const selectStyles = (icon) => ({
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: icon ? '2rem' : provided.paddingLeft,
      borderWidth: '0'
    }),
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? `${colors.primary}` : `${colors.light2}`,
        '&:hover': {
            borderColor: state.isFocused ? `${colors.primary}` : `${colors.light2}`,
        },
        boxShadow: 'none',
        borderRadius: '4px',
        minHeight: '40px',
    }),
    menu: (provided) => ({
        ...provided,
        borderColor: `${colors.light2}`,
        borderWidth: '1px', 
        borderStyle: 'solid',
        borderRadius: '4px',
        boxShadow: 'none'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? `${colors.primary}` : state.isFocused ? `${colors.primary1}` : provided.backgroundColor,
        color: state.isSelected ? `#fff` : `${colors.secondary2}`,
        '&:hover': {
            backgroundColor: state.isSelected ? `${colors.primary}` : `${colors.primary1}`,
            color: state.isSelected ? `#fff` : `${colors.secondary2}`,
        }
    })
})