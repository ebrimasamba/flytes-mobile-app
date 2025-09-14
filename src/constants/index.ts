import { CAR, FLIGHT, HOTEL } from "./images";

export const KEYBOARD_BEHAVIOR = "padding";



export const SERVICES = [
    {
        id: 1,
        name: "Flights",
        image: FLIGHT,
    },
    {
        id: 2,
        name: "Hotels",
        image: HOTEL,
    },
    {
        id: 3,
        name: "Car Hire",
        image: CAR,
    },
];


export const SUGGESTED_PLACES = [{
    id: 1,
    name: "Dakar",
    type: "City",
    country: "Senegal",
}, {
    id: 2,
    name: "Bias Diane International Airport",
    type: "Airport",
    country: "Senegal",
}, {
    id: 3,
    name: "Tenerife",
    type: "City",
    country: "Spain",
}, {
    id: 4,
    name: "London",
    type: "City",
    country: "England",
}, {
    id: 5,
    name: "New York",
    type: "City",
    country: "United States",
}]

export const POPULAR_DESTINATIONS = [
    {
        id: 1,
        name: "Paris",
        description: "Paris is the capital of France",
        image: "https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        name: "London",
        description: "London is the capital of England",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "New York",
        description: "New York is the capital of the United States",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];


// const POPULAR_DESTINATIONS = [
//     {
//         "id": "13542-2402201235--30598-0-12712-2402201550|12712-2402221810--30598-0-13542-2402230600",
//         "price": {
//             "raw": 419.18,
//             "formatted": "$420"
//         },
//         "legs": [
//             {
//                 "id": "13542-2402201235--30598-0-12712-2402201550",
//                 "origin": {
//                     "id": "LGW",
//                     "name": "London Gatwick",
//                     "displayCode": "LGW",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 495,
//                 "stopCount": 0,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-20T12:35:00",
//                 "arrival": "2024-02-20T15:50:00",
//                 "timeDeltaInDays": 0,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -30598,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
//                             "name": "Norse Atlantic Airways (UK)"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "13542-12712-2402201235-2402201550--30598",
//                         "origin": {
//                             "flightPlaceId": "LGW",
//                             "displayCode": "LGW",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Gatwick",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T12:35:00",
//                         "arrival": "2024-02-20T15:50:00",
//                         "durationInMinutes": 495,
//                         "flightNumber": "701",
//                         "marketingCarrier": {
//                             "id": -30598,
//                             "name": "Norse Atlantic Airways (UK)",
//                             "alternateId": "I)",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -30598,
//                             "name": "Norse Atlantic Airways (UK)",
//                             "alternateId": "I)",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             },
//             {
//                 "id": "12712-2402221810--30598-0-13542-2402230600",
//                 "origin": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "LGW",
//                     "name": "London Gatwick",
//                     "displayCode": "LGW",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 410,
//                 "stopCount": 0,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-22T18:10:00",
//                 "arrival": "2024-02-23T06:00:00",
//                 "timeDeltaInDays": 1,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -30598,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/I%29.png",
//                             "name": "Norse Atlantic Airways (UK)"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "12712-13542-2402221810-2402230600--30598",
//                         "origin": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "LGW",
//                             "displayCode": "LGW",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Gatwick",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-22T18:10:00",
//                         "arrival": "2024-02-23T06:00:00",
//                         "durationInMinutes": 410,
//                         "flightNumber": "702",
//                         "marketingCarrier": {
//                             "id": -30598,
//                             "name": "Norse Atlantic Airways (UK)",
//                             "alternateId": "I)",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -30598,
//                             "name": "Norse Atlantic Airways (UK)",
//                             "alternateId": "I)",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isSelfTransfer": false,
//         "isProtectedSelfTransfer": false,
//         "farePolicy": {
//             "isChangeAllowed": false,
//             "isPartiallyChangeable": false,
//             "isCancellationAllowed": false,
//             "isPartiallyRefundable": false
//         },
//         "eco": {
//             "ecoContenderDelta": 13.232994
//         },
//         "tags": [
//             "cheapest",
//             "shortest"
//         ],
//         "isMashUp": false,
//         "hasFlexibleOptions": false,
//         "score": 0.998502
//     },
//     {
//         "id": "13554-2402200750--32753-1-12712-2402201355|12712-2402222110--32753-1-13554-2402231130",
//         "price": {
//             "raw": 527.97,
//             "formatted": "$528"
//         },
//         "legs": [
//             {
//                 "id": "13554-2402200750--32753-1-12712-2402201355",
//                 "origin": {
//                     "id": "LHR",
//                     "name": "London Heathrow",
//                     "displayCode": "LHR",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 665,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-20T07:50:00",
//                 "arrival": "2024-02-20T13:55:00",
//                 "timeDeltaInDays": 0,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "13554-11154-2402200750-2402200910--32753",
//                         "origin": {
//                             "flightPlaceId": "LHR",
//                             "displayCode": "LHR",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Heathrow",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T07:50:00",
//                         "arrival": "2024-02-20T09:10:00",
//                         "durationInMinutes": 80,
//                         "flightNumber": "151",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-12712-2402201110-2402201355--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T11:10:00",
//                         "arrival": "2024-02-20T13:55:00",
//                         "durationInMinutes": 465,
//                         "flightNumber": "105",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             },
//             {
//                 "id": "12712-2402222110--32753-1-13554-2402231130",
//                 "origin": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "LHR",
//                     "name": "London Heathrow",
//                     "displayCode": "LHR",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 560,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-22T21:10:00",
//                 "arrival": "2024-02-23T11:30:00",
//                 "timeDeltaInDays": 1,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "12712-11154-2402222110-2402230850--32753",
//                         "origin": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-22T21:10:00",
//                         "arrival": "2024-02-23T08:50:00",
//                         "durationInMinutes": 400,
//                         "flightNumber": "106",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-13554-2402231010-2402231130--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "LHR",
//                             "displayCode": "LHR",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Heathrow",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-23T10:10:00",
//                         "arrival": "2024-02-23T11:30:00",
//                         "durationInMinutes": 80,
//                         "flightNumber": "158",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isSelfTransfer": false,
//         "isProtectedSelfTransfer": false,
//         "farePolicy": {
//             "isChangeAllowed": false,
//             "isPartiallyChangeable": false,
//             "isCancellationAllowed": false,
//             "isPartiallyRefundable": false
//         },
//         "tags": [
//             "second_cheapest",
//             "second_shortest"
//         ],
//         "isMashUp": false,
//         "hasFlexibleOptions": false,
//         "score": 0.58567
//     },
//     {
//         "id": "13554-2402200750--32753-1-12712-2402201355|12712-2402221700--32753-1-13554-2402230805",
//         "price": {
//             "raw": 527.97,
//             "formatted": "$528"
//         },
//         "legs": [
//             {
//                 "id": "13554-2402200750--32753-1-12712-2402201355",
//                 "origin": {
//                     "id": "LHR",
//                     "name": "London Heathrow",
//                     "displayCode": "LHR",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 665,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-20T07:50:00",
//                 "arrival": "2024-02-20T13:55:00",
//                 "timeDeltaInDays": 0,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "13554-11154-2402200750-2402200910--32753",
//                         "origin": {
//                             "flightPlaceId": "LHR",
//                             "displayCode": "LHR",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Heathrow",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T07:50:00",
//                         "arrival": "2024-02-20T09:10:00",
//                         "durationInMinutes": 80,
//                         "flightNumber": "151",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-12712-2402201110-2402201355--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T11:10:00",
//                         "arrival": "2024-02-20T13:55:00",
//                         "durationInMinutes": 465,
//                         "flightNumber": "105",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             },
//             {
//                 "id": "12712-2402221700--32753-1-13554-2402230805",
//                 "origin": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "LHR",
//                     "name": "London Heathrow",
//                     "displayCode": "LHR",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 605,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-22T17:00:00",
//                 "arrival": "2024-02-23T08:05:00",
//                 "timeDeltaInDays": 1,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "12712-11154-2402221700-2402230425--32753",
//                         "origin": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-22T17:00:00",
//                         "arrival": "2024-02-23T04:25:00",
//                         "durationInMinutes": 385,
//                         "flightNumber": "104",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-13554-2402230640-2402230805--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "LHR",
//                             "displayCode": "LHR",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Heathrow",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-23T06:40:00",
//                         "arrival": "2024-02-23T08:05:00",
//                         "durationInMinutes": 85,
//                         "flightNumber": "152",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isSelfTransfer": false,
//         "isProtectedSelfTransfer": false,
//         "farePolicy": {
//             "isChangeAllowed": false,
//             "isPartiallyChangeable": false,
//             "isCancellationAllowed": false,
//             "isPartiallyRefundable": false
//         },
//         "tags": [
//             "second_cheapest"
//         ],
//         "isMashUp": false,
//         "hasFlexibleOptions": false,
//         "score": 0.564918
//     },
//     {
//         "id": "13542-2402201300--32753-1-12712-2402201940|12712-2402221700--32753-1-13542-2402230755",
//         "price": {
//             "raw": 529.03,
//             "formatted": "$530"
//         },
//         "legs": [
//             {
//                 "id": "13542-2402201300--32753-1-12712-2402201940",
//                 "origin": {
//                     "id": "LGW",
//                     "name": "London Gatwick",
//                     "displayCode": "LGW",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 700,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-20T13:00:00",
//                 "arrival": "2024-02-20T19:40:00",
//                 "timeDeltaInDays": 0,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "13542-11154-2402201300-2402201425--32753",
//                         "origin": {
//                             "flightPlaceId": "LGW",
//                             "displayCode": "LGW",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Gatwick",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T13:00:00",
//                         "arrival": "2024-02-20T14:25:00",
//                         "durationInMinutes": 85,
//                         "flightNumber": "237",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-12712-2402201640-2402201940--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T16:40:00",
//                         "arrival": "2024-02-20T19:40:00",
//                         "durationInMinutes": 480,
//                         "flightNumber": "107",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             },
//             {
//                 "id": "12712-2402221700--32753-1-13542-2402230755",
//                 "origin": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "LGW",
//                     "name": "London Gatwick",
//                     "displayCode": "LGW",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 595,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-22T17:00:00",
//                 "arrival": "2024-02-23T07:55:00",
//                 "timeDeltaInDays": 1,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "12712-11154-2402221700-2402230425--32753",
//                         "origin": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-22T17:00:00",
//                         "arrival": "2024-02-23T04:25:00",
//                         "durationInMinutes": 385,
//                         "flightNumber": "104",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-13542-2402230630-2402230755--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "LGW",
//                             "displayCode": "LGW",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Gatwick",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-23T06:30:00",
//                         "arrival": "2024-02-23T07:55:00",
//                         "durationInMinutes": 85,
//                         "flightNumber": "230",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isSelfTransfer": false,
//         "isProtectedSelfTransfer": false,
//         "farePolicy": {
//             "isChangeAllowed": false,
//             "isPartiallyChangeable": false,
//             "isCancellationAllowed": false,
//             "isPartiallyRefundable": false
//         },
//         "tags": [
//             "third_cheapest"
//         ],
//         "isMashUp": false,
//         "hasFlexibleOptions": false,
//         "score": 0.552902
//     },
//     {
//         "id": "13554-2402201215--32753-1-12712-2402201940|12712-2402222110--32753-1-13554-2402231130",
//         "price": {
//             "raw": 527.97,
//             "formatted": "$528"
//         },
//         "legs": [
//             {
//                 "id": "13554-2402201215--32753-1-12712-2402201940",
//                 "origin": {
//                     "id": "LHR",
//                     "name": "London Heathrow",
//                     "displayCode": "LHR",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 745,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-20T12:15:00",
//                 "arrival": "2024-02-20T19:40:00",
//                 "timeDeltaInDays": 0,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "13554-11154-2402201215-2402201335--32753",
//                         "origin": {
//                             "flightPlaceId": "LHR",
//                             "displayCode": "LHR",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Heathrow",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T12:15:00",
//                         "arrival": "2024-02-20T13:35:00",
//                         "durationInMinutes": 80,
//                         "flightNumber": "159",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-12712-2402201640-2402201940--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-20T16:40:00",
//                         "arrival": "2024-02-20T19:40:00",
//                         "durationInMinutes": 480,
//                         "flightNumber": "107",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             },
//             {
//                 "id": "12712-2402222110--32753-1-13554-2402231130",
//                 "origin": {
//                     "id": "JFK",
//                     "name": "New York John F. Kennedy",
//                     "displayCode": "JFK",
//                     "city": "New York",
//                     "isHighlighted": false
//                 },
//                 "destination": {
//                     "id": "LHR",
//                     "name": "London Heathrow",
//                     "displayCode": "LHR",
//                     "city": "London",
//                     "isHighlighted": false
//                 },
//                 "durationInMinutes": 560,
//                 "stopCount": 1,
//                 "isSmallestStops": false,
//                 "departure": "2024-02-22T21:10:00",
//                 "arrival": "2024-02-23T11:30:00",
//                 "timeDeltaInDays": 1,
//                 "carriers": {
//                     "marketing": [
//                         {
//                             "id": -32753,
//                             "logoUrl": "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
//                             "name": "Aer Lingus"
//                         }
//                     ],
//                     "operationType": "fully_operated"
//                 },
//                 "segments": [
//                     {
//                         "id": "12712-11154-2402222110-2402230850--32753",
//                         "origin": {
//                             "flightPlaceId": "JFK",
//                             "displayCode": "JFK",
//                             "parent": {
//                                 "flightPlaceId": "NYCA",
//                                 "displayCode": "NYC",
//                                 "name": "New York",
//                                 "type": "City"
//                             },
//                             "name": "New York John F. Kennedy",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-22T21:10:00",
//                         "arrival": "2024-02-23T08:50:00",
//                         "durationInMinutes": 400,
//                         "flightNumber": "106",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     },
//                     {
//                         "id": "11154-13554-2402231010-2402231130--32753",
//                         "origin": {
//                             "flightPlaceId": "DUB",
//                             "displayCode": "DUB",
//                             "parent": {
//                                 "flightPlaceId": "DUBL",
//                                 "displayCode": "DUB",
//                                 "name": "Dublin",
//                                 "type": "City"
//                             },
//                             "name": "Dublin",
//                             "type": "Airport"
//                         },
//                         "destination": {
//                             "flightPlaceId": "LHR",
//                             "displayCode": "LHR",
//                             "parent": {
//                                 "flightPlaceId": "LOND",
//                                 "displayCode": "LON",
//                                 "name": "London",
//                                 "type": "City"
//                             },
//                             "name": "London Heathrow",
//                             "type": "Airport"
//                         },
//                         "departure": "2024-02-23T10:10:00",
//                         "arrival": "2024-02-23T11:30:00",
//                         "durationInMinutes": 80,
//                         "flightNumber": "158",
//                         "marketingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         },
//                         "operatingCarrier": {
//                             "id": -32753,
//                             "name": "Aer Lingus",
//                             "alternateId": "EI",
//                             "allianceId": 0
//                         }
//                     }
//                 ]
//             }
//         ],
//         "isSelfTransfer": false,
//         "isProtectedSelfTransfer": false,
//         "farePolicy": {
//             "isChangeAllowed": false,
//             "isPartiallyChangeable": false,
//             "isCancellationAllowed": false,
//             "isPartiallyRefundable": false
//         },
//         "tags": [
//             "second_cheapest"
//         ],
//         "isMashUp": false,
//         "hasFlexibleOptions": false,
//         "score": 0.549767
//     },

// ]

