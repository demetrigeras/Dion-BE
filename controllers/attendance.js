import AttendanceSchema from "../models/attendance.js";


export const getattendances = async (req, res) => {
    try {
      const attendance = await AttendanceSchema.find();
      res.json(attendance);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const attendance = await AttendanceSchema.findById(id);
      res.json(attendance);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const createAttendance = async (req, res) => {
    try {
      const attendance = new AttendanceSchema(req.body);
      await attendance.save();
      console.log(req.body)
      res.status(201).json(attendance); // Send the complete charity object in the response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const attendance = await AttendanceSchema.findByIdAndUpdate(id, req.body);
    res.status(200).json(attendance);
  };


  export const deleteAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AttendanceSchema.findByIdAndDelete(id);
  
      if (deleted) {
        return res.status(200).send("Attendace req Deleted!");
      }
  
      throw new Error("Attendace req found");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };