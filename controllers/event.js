import EventSchema from "../models/event.js";


export const getEvents = async (req, res) => {
    try {
      const event = await EventSchema.find();
      res.json(event);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const event = await EventSchema.findById(id);
      res.json(event);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const createEvent = async (req, res) => {
    try {
      const event = new EventSchema(req.body);
      await event.save();
      console.log(req.body)
      res.status(201).json(event); // Send the complete charity object in the response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const event = await EventSchema.findByIdAndUpdate(id, req.body);
    res.status(200).json(event);
  };


  export const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await EventSchema.findByIdAndDelete(id);
  
      if (deleted) {
        return res.status(200).send("Event Deleted!");
      }
  
      throw new Error("Profile not found");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };