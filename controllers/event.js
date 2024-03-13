const { response } = require('express');
const Event = require('../models/event')

const getEvents = async(req, res = response ) => {


  const events = await Event.find()
    .populate('user', 'name')

  res.json({
    ok: true,
    events
  })

}

const createEvents = async(req, res = response ) => {

  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const newEventRegister = await event.save();

    res.json({
      ok: true,
      newEventRegister
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      message: `Something went wrong... ${error}`
    })
  }
}

const updateEvents = async(req, res = response ) => {
  const eventId = req.params.id;
  const userId = req.uid;

  try {

    const event = await Event.findById(eventId);

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        message: `Event do not exist by that id: ${event}`
      })
    }

    if ( event.user.toString() !== userId ) {
      return res.status(401).json({
        ok: false,
        message: `You do not have access to edit this event`
      })
    }

    const newEvent = {
      ...req.body,
      user: userId
    }

    const newEventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true });

    res.json({
      ok: true,
      newEventUpdated
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      message: `Something went wrong... ${error}`
    })
  }
}

const removeEvents = async(req, res = response ) => {

  const eventId = req.params.id;
  const userId = req.uid;

  try {

    const event = await Event.findById(eventId);

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        message: `Event do not exist by that id: ${event}`
      })
    }

    if ( event.user.toString() !== userId ) {
      return res.status(401).json({
        ok: false,
        message: `You do not have access to delete this event`
      })
    }

    await Event.findOneAndDelete( eventId );

    res.json({
      ok: true,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      message: `Something went wrong... ${error}`
    })
  }

}

module.exports = {
  getEvents,
  createEvents,
  updateEvents,
  removeEvents
}