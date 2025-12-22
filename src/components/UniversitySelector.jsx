import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";


const UniversitySelector = ({ value, onChange }) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/programs");
        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        // extract unique university names
        const uniqueUniversities = [
          ...new Set(result.data.map((item) => item.university)),
        ];

        setUniversities(uniqueUniversities);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <Box sx={{ width: 320 }}>
      <TextField
        select
        fullWidth
        label="University"
        value={value}
        onChange={onChange}
        placeholder="Select University"
        variant="outlined"
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      >
        <MenuItem value="">
          <em>{loading ? "Loading..." : "All Universities"}</em>
        </MenuItem>

        {universities.map((uni) => (
          <MenuItem key={uni} value={uni}>
            {uni}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default UniversitySelector;
