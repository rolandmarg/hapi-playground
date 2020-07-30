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
    const res = await server.inject({ method: 'GET', url: '/meeting' });

    expect(res.statusCode).to.equal(200);

    expect(res.payload).to.equal('[]');
  });

  it('posts a meeting', async () => {
    const meeting = {
      title: 'testMeeting',
      starts_at: new Date().toISOString(),
      ends_at: new Date().toISOString(),
    };

    const res = await server.inject({
      method: 'POST',
      url: '/meeting',
      payload: meeting,
    });

    expect(res.statusCode).to.equal(200);

    const postedMeeting = JSON.parse(res.payload);

    expect(postedMeeting).to.include(meeting);
    expect(postedMeeting.id).to.be.number();
  });

  it('gets meeting after posting', async () => {
    const meeting = {
      title: 'testMeeting',
      starts_at: new Date().toISOString(),
      ends_at: new Date().toISOString(),
    };

    let res = await server.inject({
      method: 'POST',
      url: '/meeting',
      payload: meeting,
    });
    const postedMeeting = JSON.parse(res.payload);

    res = await server.inject({ method: 'GET', url: '/meeting' });

    expect(res.statusCode).to.equal(200);

    const meetings = JSON.parse(res.payload);

    expect(meetings).to.equal([postedMeeting]);
  });
});
