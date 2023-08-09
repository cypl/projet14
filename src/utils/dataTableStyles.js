import { colors } from "./colors"

// customs styles for the DataTable component (see CurrentEmployees page)
export const dataTableStyles = {
    headRow: {
		style: {
            color:`${colors.primary}`,
            fontWeight: 700,
			borderBottomWidth: '2px',
			borderBottomColor: `${colors.light2}`,
			borderBottomStyle: 'solid',
		},
	},
    rows: {
		style: {
            borderBottomWidth: '1px',
			borderBottomColor: `${colors.light2}`,
			borderBottomStyle: 'solid',
            color:`${colors.secondary2}`,
		},
	},
    pagination: {
		style: {
			color: `${colors.secondary2}`,
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: `${colors.light2}`,
		},
		pageButtonsStyle: {
			color: `${colors.primary}`,
			fill: `${colors.primary}`,
			backgroundColor: 'transparent',
			'&:disabled': {
				color: `${colors.light2}`,
				fill: `${colors.light2}`,
			},
			'&:hover:not(:disabled)': {
				backgroundColor: `${colors.primary1}`,
			},
			'&:focus': {
				backgroundColor:"transparent",
			},
		},
	},
}