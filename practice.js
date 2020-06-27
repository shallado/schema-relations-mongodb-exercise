// explain what type of schema is this ? 
// Essentially this approach makes it so the data structures are the same just different values
db.products.insertOne({
  name: 'A book',
  price: 12.99
});

db.products.insertOne({
  name: 'A T-Shirt',
  price: 20.99
});

// explain what type of schema is this?
// Essentially the same data structure just with different values but some will have extra fields such as the last inserted document in the collection
db.products.insertOne({
  name: 'A book',
  price: 12.99
});
db.products.insertOne({
  name: 'A T-Shirt',
  price: 20.99
});
db.products.insertOne({
  name: 'A Computer',
  price: 12.99,
  details: {
    cpu: 'Intel i7 8770'
  }
});

// drop database
db.dropDatabase();

// drop a single collection
db.products.drop();

// show all collections in current database
db.products.find();