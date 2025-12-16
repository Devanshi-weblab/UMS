import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateUniversityList = ({ open, handleClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    university: "",
    programs: "",
    currentStatus: "",
    issues: "",
    proposedAction: "",
    responsiblePerson: "",
    timeline: "",
    status: "On Track",
    keyUpdates: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save program");
      }

      const data = await response.json();
      console.log("Saved successfully:", data);

      onSuccess();
      handleClose();

    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save program. Please try again.");
    }
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "680px",
          borderRadius: "14px",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        Add New Program Entry
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="University *"
              name="university"
              fullWidth
              value={formData.university}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Program(s) *"
              name="programs"
              fullWidth
              value={formData.programs}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Current Status *"
              name="currentStatus"
              fullWidth
              value={formData.currentStatus}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Issues / Challenges"
              name="issues"
              fullWidth
              value={formData.issues}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Proposed Action *"
              name="proposedAction"
              fullWidth
              value={formData.proposedAction}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Responsible Person *"
              name="responsiblePerson"
              fullWidth
              value={formData.responsiblePerson}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Timeline / Deadline *"
              name="timeline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.timeline}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Status *"
              name="status"
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="On Track">On Track</MenuItem>
              <MenuItem value="Delayed">Delayed</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Key Updates / Progress *"
              name="keyUpdates"
              fullWidth
              value={formData.keyUpdates}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={handleClose} sx={{ color: "#1976d2" }}>
            CANCEL
          </Button>
          <Button variant="contained" onClick={handleSave}>
            SAVE
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUniversityList;
