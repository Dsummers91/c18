//dynamically static metadata
//let item = require('./items.js');
//let images = require('./image.js');

module.exports = function(token) {
 return metadata[token % metadata.length];
}

let metadata = [
  {
    "Buyer": "Green Farm",
    "Item": "Strawberries",
    "Number of Boxes": 10,
    "Cost": "$100",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Carrots",
    "Number of Boxes": 20,
    "Cost": "$100",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Beets",
    "Number of Boxes": 10,
    "Cost": "$50",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Apples",
    "Number of Boxes": 20,
    "Cost": "$120",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Eggs",
    "Number of Boxes": 20,
    "Cost": "$80",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Eggplant",
    "Number of Boxes": 10,
    "Cost": "$50",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Acorn Squash",
    "Number of Boxes": 10,
    "Cost": "$50",
    "Delivery Date": "5/20/18"
  },
  {
    "Buyer": "Green Farm",
    "Item": "Peas",
    "Number of Boxes": 15,
    "Cost": "$50",
    "Delivery Date": "5/20/18"
  }
]

