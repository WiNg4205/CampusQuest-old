var Polygon = [
  {   // Bottom right blue
    type: "Feature",
    properties: { zLevel: 1, name: 'YR1' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.23136, -33.91921],
          [151.23086, -33.91914],
          [151.23102, -33.91825],
          [151.23154, -33.91832],
          [151.23136, -33.91921]
        ]
      ]
    }
  },
  {   // Bottom left pink
    type: "Feature",
    properties: { zLevel: 1, name: 'YR2' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.22886, -33.91924],
          [151.22710, -33.91902],
          [151.22736, -33.91753],
          [151.22918, -33.91777],
          [151.22886, -33.91924]
        ]
      ]
    }
  },
  {   // Top left blue
    type: "Feature",
    properties: { zLevel: 1, name: 'YR3' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.22704, -33.91678],
          [151.22660, -33.91675],
          [151.22646, -33.91655],
          [151.22649, -33.91633],
          [151.22664, -33.91617],
          [151.22706, -33.91623],
          [151.22718, -33.91638],
          [151.22722, -33.91658],
          [151.22704, -33.91678]
        ]
      ]
    }
  },
  {   // Top left light green
    type: "Feature",
    properties: { zLevel: 1, name: 'YR4' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.22813, -33.91593],
          [151.22753, -33.91585],
          [151.22764, -33.91529],
          [151.22822, -33.91538],
          [151.22813, -33.91593]
        ]
      ]
    }
  },
  {   // Middle Orange
    type: "Feature",
    properties: { zLevel: 1, name: 'YR5' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.23104, -33.91756],
          [151.22995, -33.91738],
          [151.23007, -33.91662],
          [151.23119, -33.91679],
          [151.23104, -33.91756]
        ]
      ]
    }
  },
  {   // Top right red
    type: "Feature",
    properties: { zLevel: 1, name: 'YR6' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.23315, -33.91710],
          [151.23232, -33.91695],
          [151.23238, -33.91663],
          [151.23254, -33.91664],
          [151.23264, -33.91630],
          [151.23329, -33.91637],
          [151.23315, -33.91710]
        ]
      ]
    }
  },
  {   // Top right blue+pink (shape changed to better fit the restaurants' locations).
    type: "Feature",
    properties: { zLevel: 1, name: 'YR7' },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [151.23461, -33.91805],
          [151.23306, -33.91784],
          [151.23324, -33.91678],
          [151.23568, -33.91710],
          [151.23552, -33.91784],
          [151.23467, -33.91773],
          [151.23461, -33.91805]
        ]
      ]
    }
  }
];

export default Polygon;
