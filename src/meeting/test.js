const lab = require('@hapi/lab').script();
const { expect } = require('@hapi/code');
const { beforeEach, afterEach, describe, it } = lab;

const db = require('../db');
const { init } = require('../server');
const meetingPlugin = require('./index');
const schema = require('./schema');

exports.lab = lab;

describe('Meeting CRUD', () => {
  let server;
  db.init({
    max: 1,
    connectionString: 'postgresql://rem@localhost:5432/midnightest',
  });
  db.query(schema.meetingTable);

  beforeEach(async () => {
    server = await init(meetingPlugin);
    await db.query('BEGIN');
  });

  afterEach(async () => {
    server.stop();
    await db.query('ROLLBACK');
  });

  it('get all meetings', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/meeting',
    });
    expect(res.statusCode).to.equal(200);

    expect(res.payload).to.equal('[]');
  });

  it('posts a meeting', async () => {
    const meeting = {
      title: 'testMeeting',
      starts_at: new Date().toISOString(),
      ends_at: new Date().toISOString(),
    };

    let res = schema.createMeeting.validate(meeting);
    expect(res.error).to.not.exist();

    res = await server.inject({
      method: 'POST',
      url: '/meeting',
      payload: meeting,
    });
    expect(res.statusCode).to.equal(200);

    const postedMeeting = JSON.parse(res.payload);

    res = schema.meeting.validate(postedMeeting);
    expect(res.error).to.not.exist();

    expect(postedMeeting).to.include(meeting);

    res = await server.inject({
      method: 'GET',
      url: '/meeting',
    });
    expect(res.statusCode).to.equal(200);

    const meetings = JSON.parse(res.payload);

    res = schema.meetings.validate(meetings);
    expect(res.error).to.not.exist();

    expect(meetings).to.equal([postedMeeting]);
  });
});
