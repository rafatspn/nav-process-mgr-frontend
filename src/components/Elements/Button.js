import eact from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
// import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack'

export default function CustomButton(props) {
    const { iconType, label, handleClick, style } = props
    let icon = <DeleteIcon />
    if (iconType == 'delete') {
        icon = <DeleteIcon />
    } else if (iconType == 'add') {
        icon = <AddIcon />
    }
    return (
        <Stack direction="row" spacing={2} style={style}>
            <Button
                variant="outlined"
                startIcon={icon}
                onClick={() => handleClick()}>
                {label}
            </Button>
        </Stack>
    )
}
