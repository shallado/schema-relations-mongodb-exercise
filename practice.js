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

// ------------------------------------------------
// our database name will be shop
// collection is products

// add a new product with these fields name, price, details
// make a field name available but its data not available
db.products.insertOne({
  name: 'shoes',
  price: '55.00',
  details: null
});

// ------------------------------------------------
// collection numbers

// insert a document into collection 
db.numbers.insertOne({
  a: 1
});

// find the document you just inserted
db.numbers.findOne();

// get the stats of your database
db.stats();

// store number value using NumberInt see the change in db.stats
db.numbers.insertOne({
  a: NumberInt(1)
});

// Compare data with and without using NumberInt analyze the differences