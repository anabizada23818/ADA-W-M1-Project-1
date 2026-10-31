// test data
const SEATS_JSON_FAKE = `
[
    { "id": "A1", "name": "Table A1", "type": "small",       "capacity": 2, "status": "available",   "position": [80, 80] },
    { "id": "A2", "name": "Table A2", "type": "small",       "capacity": 2, "status": "available",   "position": [200, 80] },
    { "id": "A3", "name": "Table A3", "type": "small",       "capacity": 2, "status": "reserved",    "position": [320, 80] },
    { "id": "B1", "name": "Table B1", "type": "big",         "capacity": 6, "status": "available",   "position": [120, 260] },
    { "id": "B2", "name": "Table B2", "type": "big",         "capacity": 6, "status": "unavailable", "position": [300, 260] },
    { "id": "C1", "name": "Table C1", "type": "rectangular", "capacity": 4, "status": "available",   "position": [520, 100],  "rotated" : true },
    { "id": "C2", "name": "Table C2", "type": "rectangular", "capacity": 4, "status": "reserved",    "position": [520, 240],  "rotated" : true },
    { "id": "C3", "name": "Table C3", "type": "rectangular", "capacity": 4, "status": "available",   "position": [520, 380],  "rotated" : true },
    { "id": "D1", "name": "Booth D1", "type": "couch_table", "capacity": 4, "status": "available",   "position": [780, 80] },
    { "id": "D2", "name": "Booth D2", "type": "couch_table", "capacity": 4, "status": "available",   "position": [780, 240] }
    ]
    `;
    
    
// Seat layout data as a JSON string (parsed in data.js)
const SEATS_JSON = `
[
    { "id": "ST1", "name": "small table 1", "type": "small",       "capacity": 2, "status": "available",   "position": [560, 170] },
    { "id": "ST2", "name": "small table 2", "type": "small",       "capacity": 2, "status": "available",   "position": [470, 280] },
    { "id": "ST3", "name": "small table 3", "type": "small",       "capacity": 2, "status": "available",    "position": [570, 320] },
    { "id": "ST4", "name": "small table 4", "type": "small",       "capacity": 2, "status": "reserved",    "position": [670, 420] },
    { "id": "ST5", "name": "small table 5", "type": "small",       "capacity": 2, "status": "available",    "position": [620, 240] },
    { "id": "ST6", "name": "small table 6", "type": "small",       "capacity": 2, "status": "available",    "position": [590, 420] },
    { "id": "ST7", "name": "small table 7", "type": "small",       "capacity": 2, "status": "available",    "position": [470, 410] },


    { "id": "RT1", "name": "rectangular table 1", "type": "rectangular", "capacity": 4, "status": "available",   "position": [320, 100],  "rotated" : true },
    { "id": "RT2", "name": "rectangular table 2", "type": "rectangular", "capacity": 4, "status": "available",    "position": [320, 240],  "rotated" : true },
    { "id": "RT3", "name": "rectangular table 3", "type": "rectangular", "capacity": 4, "status": "available",   "position": [320, 380],  "rotated" : true },


    { "id": "RT4", "name": "rectangular table 4", "type": "rectangular", "capacity": 4, "status": "unavailable",   "position": [400, 80] },
    { "id": "RT5", "name": "rectangular table 5", "type": "rectangular", "capacity": 4, "status": "unavailable",    "position": [560, 80] },
    { "id": "RT6", "name": "rectangular table 6", "type": "rectangular", "capacity": 4, "status": "unavailable",   "position": [720, 80] },


    { "id": "CT1", "name": "couch table 1", "type": "couch_table", "capacity": 4, "status": "available",   "position": [80, 80] },
    { "id": "CT2", "name": "couch table 2", "type": "couch_table", "capacity": 4, "status": "available",   "position": [80, 200] }
]
`;

