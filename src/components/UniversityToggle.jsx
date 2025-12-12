import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'


const UniversityToggle = ({ tab, onTabChange }) => {
    const handleChange = (event, newValue) => {
        if (newValue !== null) onTabChange(newValue);
    };
    return (
        <ToggleButtonGroup
            exclusive
            value={tab}
            onChange={handleChange}
            aria-label="view toggle"
        >
            <ToggleButton value="overview">OVERVIEW</ToggleButton>
            <ToggleButton value="entries">ENTRIES</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default UniversityToggle
