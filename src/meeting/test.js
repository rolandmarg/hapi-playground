const fc = require('fast-check');
const db = require('../db');
const { startTestServer } = require('../server');
const meetingPlugin = require('./index');
const { meetingTable } = require('./schema');

const validMeetingArb = fc
  .record({
    title: fc.string(3, 255),
    starts_at: fc.date({ min: new Date(), max: new Date('2030') }),
    ends_at: fc.date({ min: new Date(), max: new Date('2030') }),
  })
  .filter((m) => m.end.toISOString() > m.start.toISOString());

const invalidMeetingArb = fc.oneof(
  fc.record({
    title: fc.string(1, 2),
    starts_at: fc.date(),
    ends_at: fc.date(),
    badProp: fc.integer(),
  }),
  fc.anything()
);

describe('Meeting CRUD', () => {
  let server;
  beforeAll(async () => {
    server = await startTestServer({
      routePrefix: '/meeting',
      plugins: meetingPlugin,
    });
    await db.query(meetingTable.dropQuery);
    await db.query(meetingTable.createQuery);
  });

  afterAll(async () => {
    await server.stop();
    await db.stop();
  });

  beforeEach(async () => {
    await db.query(meetingTable.truncateQuery);
  });

  it('when posting a meeting without payload, should fail with 400', async () => {
    const res = await server.post();

    expect(res.statusCode).toBe(400);
  });

  it('when posting a meeting with invalid payload, should fail with 400', async () => {
    await fc.assert(
      fc.asyncProperty(invalidMeetingArb, async (invalidMeeting) => {
        const res = await server.post(invalidMeeting);

        expect(res.statusCode).toBe(400);
      })
    );
  });

  it('when posting a meeting with valid payload, should success', async () => {
    await fc.assert(
      fc.asyncProperty(validMeetingArb, async (validMeeting) => {
        const res = await server.post(validMeeting);
        expect(res.statusCode).toBe(200);
      })
    );
  });

  it('when posting duplicate meetings, should success', async () => {
    await fc.assert(
      fc.asyncProperty(validMeetingArb, async (validMeeting) => {
        const [res1, res2] = await Promise.all([
          server.post(validMeeting),
          server.post(validMeeting),
        ]);

        expect(res1.statusCode).toBe(200);
        expect(res2.statusCode).toBe(200);
      })
    );
  });

  it('when getting meetings, should return empty array', async () => {
    const res = await server.get();

    expect(res.statusCode).toBe(200);
    expect(res.payload).toBe('[]');
  });

  it('when posting meeting, should get the same one', async () => {
    await fc.assert(
      fc.asyncProperty(validMeetingArb, async (validMeeting) => {
        const res = await server.post(validMeeting);

        expect(res.statusCode).toBe(200);

        const meeting = JSON.parse(res.payload);

        expect(meeting).toHaveProperty('id');
        expect(meeting.title).toEqual(validMeeting.title);
        expect(meeting.start).toEqual(validMeeting.start.toISOString());
      })
    );
  });
});
