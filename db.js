const { Sequelize } = require('sequelize');
const path = require('path');

const defineAdmin = require('./models/Admin.js');
const defineEvent = require('./models/Event.js');
const defineAttendanceRecord = require('./models/AttendanceRecord.js');

const storagePath = process.env.NODE_ENV === 'production' 
    ? '/data/database.sqlite' 
    : path.join(process.cwd(), 'backend', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false
});

const models = {
  Admin: defineAdmin(sequelize),
  Event: defineEvent(sequelize),
  AttendanceRecord: defineAttendanceRecord(sequelize),
};

const { Event, AttendanceRecord } = models;
Event.hasMany(AttendanceRecord);
AttendanceRecord.belongsTo(Event);

module.exports = { sequelize, models };
