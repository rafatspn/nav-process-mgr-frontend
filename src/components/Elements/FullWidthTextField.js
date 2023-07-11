import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function FullWidthTextField(props) {
    const { label, handleChange } = props

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%'
            }}>
            <TextField
                fullWidth
                label={label}
                id="fullWidth"
                onChange={handleChange}
            />
        </Box>
    )
}
