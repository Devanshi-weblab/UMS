import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'


const UniversityToggle = () => {
    return (
        <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
        >
            <ToggleButton value="left" aria-label="left aligned">
                Overview
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
                Entries
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default UniversityToggle
