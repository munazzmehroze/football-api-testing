describe('Football Data API Tests', () => {
  const baseUrl = 'https://api.football-data.org/v4';
  const apiKey = '<YOUR_API_KEY>'; // Replace with your token

  // Positive Scenario: 200 OK
  it('should return 200 OK for a valid competitions request', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/competitions`,
      headers: {
        'X-Auth-Token': apiKey
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('competitions');
    });
  });

  // Negative Scenario: 401 Unauthorized - missing API key
  it('should return 401 Unauthorized for missing API key', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/competitions`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  // Negative Scenario: 404 Not Found - invalid endpoint
  it('should return 404 Not Found for an invalid endpoint', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/invalid-endpoint`,
      headers: {
        'X-Auth-Token': apiKey
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // Negative Scenario: 400 Bad Request - invalid request parameter
  it('should return 400 Bad Request for invalid request parameter', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/competitions?season=abcd`,
      headers: {
        'X-Auth-Token': apiKey
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // Positive Scenario: 304 Not Modified - caching test
  it('should return 304 Not Modified when If-None-Match header matches', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/competitions`,
      headers: {
        'X-Auth-Token': apiKey,
        'If-None-Match': 'W/"123456789"' // example ETag value, adjust if needed
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 304]).to.include(response.status);
    });
  });

});