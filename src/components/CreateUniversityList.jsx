import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  university: Yup.string().required("University is required"),
  programs: Yup.string().required("Program is required"),
  currentStatus: Yup.string().required("Current status is required"),
  proposedAction: Yup.string().required("Proposed action is required"),
  responsiblePerson: Yup.string().required("Responsible person is required"),
  timeline: Yup.string().required("Timeline is required"),
  status: Yup.string().required("Status is required"),
  keyUpdates: Yup.string().required("Key updates are required"),
});

const CreateUniversityList = ({ open, handleClose, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      university: "",
      programs: "",
      currentStatus: "",
      issues: "",
      proposedAction: "",
      responsiblePerson: "",
      timeline: "",
      status: "On Track",
      keyUpdates: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:5000/api/programs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error("Failed to save");

        resetForm();
        onSuccess();
        handleClose();
      } catch (error) {
        alert("Failed to save program. Please try again.");
      }
    },
  });

  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [isCustomUniversity, setIsCustomUniversity] = useState(false);
  useEffect(() => {
    if (!open) return;

    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/programs");
        const result = await response.json();

        // extract unique universities
        const uniqueUniversities = [
          ...new Set(result.data.map(item => item.university))
        ];

        setUniversities(uniqueUniversities);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchPrograms();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setPrograms([]);
      formik.resetForm();
    }
  }, [open]);

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
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                select
                size="small"
                label="University *"
                name="university"
                fullWidth
                value={isCustomUniversity ? "CUSTOM" : formik.values.university}
                onChange={(e) => {
                  if (e.target.value === "CUSTOM") {
                    setIsCustomUniversity(true);
                    formik.setFieldValue("university", "");
                  } else {
                    setIsCustomUniversity(false);
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.university &&
                  Boolean(formik.errors.university)
                }
                helperText={
                  formik.touched.university && formik.errors.university
                }
              >
                <MenuItem value="">Select University</MenuItem>

                {universities.map((uni) => (
                  <MenuItem key={uni} value={uni}>
                    {uni}
                  </MenuItem>
                ))}

                <MenuItem value="CUSTOM" sx={{ fontStyle: "italic" }}>
                  ➕ Add New University
                </MenuItem>
              </TextField>
            </Grid>
            {isCustomUniversity && (
              <Grid size={6}>
                <TextField
                  size="small"
                  label="New University Name *"
                  name="university"
                  fullWidth
                  value={formik.values.university}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.university &&
                    Boolean(formik.errors.university)
                  }
                  helperText={
                    formik.touched.university && formik.errors.university
                  }
                />
              </Grid>
            )}

            <Grid size={6}>
              <TextField
                size="small"
                label="Program(s) *"
                name="programs"
                fullWidth
                value={formik.values.programs}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.programs &&
                  Boolean(formik.errors.programs)
                }
                helperText={
                  formik.touched.programs && formik.errors.programs
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                size="small"
                label="Current Status *"
                name="currentStatus"
                fullWidth
                value={formik.values.currentStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currentStatus &&
                  Boolean(formik.errors.currentStatus)
                }
                helperText={
                  formik.touched.currentStatus &&
                  formik.errors.currentStatus
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                size="small"
                label="Issues / Challenges"
                name="issues"
                fullWidth
                value={formik.values.issues}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                size="small"
                label="Proposed Action *"
                name="proposedAction"
                fullWidth
                value={formik.values.proposedAction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.proposedAction &&
                  Boolean(formik.errors.proposedAction)
                }
                helperText={
                  formik.touched.proposedAction &&
                  formik.errors.proposedAction
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                size="small"
                label="Responsible Person *"
                name="responsiblePerson"
                fullWidth
                value={formik.values.responsiblePerson}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.responsiblePerson &&
                  Boolean(formik.errors.responsiblePerson)
                }
                helperText={
                  formik.touched.responsiblePerson &&
                  formik.errors.responsiblePerson
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                size="small"
                label="Timeline / Deadline *"
                name="timeline"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formik.values.timeline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.timeline &&
                  Boolean(formik.errors.timeline)
                }
                helperText={
                  formik.touched.timeline && formik.errors.timeline
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                select
                size="small"
                label="Status *"
                name="status"
                fullWidth
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.status &&
                  Boolean(formik.errors.status)
                }
                helperText={
                  formik.touched.status && formik.errors.status
                }
              >
                <MenuItem value="On Track">On Track</MenuItem>
                <MenuItem value="Delayed">Delayed</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="At Risk">At Risk</MenuItem>
              </TextField>
            </Grid>

            <Grid size={6}>
              <TextField
                size="small"
                label="Key Updates / Progress *"
                name="keyUpdates"
                fullWidth
                value={formik.values.keyUpdates}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.keyUpdates &&
                  Boolean(formik.errors.keyUpdates)
                }
                helperText={
                  formik.touched.keyUpdates &&
                  formik.errors.keyUpdates
                }
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button type="submit" variant="contained">
              ADD ENTTRY
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUniversityList;
