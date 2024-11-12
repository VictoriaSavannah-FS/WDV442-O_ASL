const request = require('supertest'); // for testing 
const app = require('../server.js');

//jest documentaion: https://jestjs.io/docs/tutorial-react


describe('Contacts API Tests', () => {
  // GET all contacts-->> pagination, sorting, and filtering
  it('GET /contacts - should return paginated list of contacts', async () => {
    const response = await request(app)
      .get('/contacts')
      .set('X-Filter-By', 'fname')
      .set('X-Filter-Operator', 'eq')
      .set('X-Filter-Value', 'John')
      .query({ page: 1, size: 10, sort: 'lname', direction: 'asc' }); // based on params

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.headers['x-page-total']).toBeDefined();
    expect(response.headers['x-page-next']).toBeDefined();
    expect(response.headers['x-page-prev']).toBeDefined();
  });

  // POST new contact --->
  it('POST /contacts - should create a new contact', async () => {
    const newContact = {
      fname: 'Ajax',
      lname: 'Predator',
      email: 'ajax.predator@example.com',
      phone: '+1-555-890-3567',
    };

    const response = await request(app)
      .post('/contacts')
      .send(newContact);

    expect(response.status).toBe(303);
    expect(response.headers.location).toMatch(/\/contacts\/\d+/); // this checks if potintig to new endpoit==> /contacts/{id}
  });

  // GET by ID - Test
  it('GET /contacts/:id - should return a contact by ID', async () => {
    const contactId = 1; // need to replaces w/ ID from dataset
    const response = await request(app).get(`/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('fname');
    expect(response.body).toHaveProperty('lname');
  });

  // PUT/UPdate a contact
  it('PUT /contacts/:id - should update a contact', async () => {
    const contactId = 1;
    const updatedContact = { fname: 'UpdatedName' };

    const response = await request(app)
      .put(`/contacts/${contactId}`)
      .send(updatedContact);

    expect(response.status).toBe(204);
  });

  // DELTET by ID ----
  it('DELETE /contacts/:id - should delete a contact', async () => {
    const contactId = 1;
    const response = await request(app).delete(`/contacts/${contactId}`);
    expect(response.status).toBe(303);
    expect(response.headers.location).toBe('/contacts');
  });
});
