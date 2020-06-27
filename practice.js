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

// ------------------------------------------------
// one-to-one relationships
// use hospital database

// create a one-to-one relationship with patients and diseaseSummaries
// use references
// patients fields: name, age, diseaseSummary
// diseaseSummaries fields: _id, diseases = array with cold, broken leg
db.patients.insertOne({
  name: 'ryan',
  age: 30,
  diseaseSummary: ObjectId('123123321323123123123123')
});

db.diseaseSummaries.insertOne({
  _id: ObjectId('123123321323123123123123'),
  diseases: ['cold', 'broken leg']
});

// get a disease summary of a patient
const patientOne = db.patients.find({
  name: 'ryan'
}).diseaseSummary;

db.diseaseSummary.find({
  _id: patientOne
})

// delete all documents in patients collection and start the next exercise
db.patients.deleteMany({});

// use embedded
// insert a document in patients collection with the same information from previous exercise but use embedded documents

// use references between persons and cars data set
// person to car
// insert into persons table name = 'Max', age: 29, salary: 3000
// insert into cars table model = 'BMW', price: 4000
db.persons.insertOne({
  name: 'Max',
  age: 29,
  salary: 3000
});

db.cars.insertOne({
  name: 'BMW',
  price: 4000,
  owner: ObjectId("5ef4e4a2a6fad84e9088e785")
});

// ----------------------- One-To-Many Using Embedded ----------------------
// use references
// what is the relationship here
// insert document into questionThreads collection
// fields: creator, question, answers = array with 2 answer
// insert document into answers collection should be an array with 2 answers
// fields: _id, text should contain answers

db.questionThreads.insertOne({
  create: 'ryan',
  question: 'Who is the current president?',
  answers: [
    ObjectId("5ef4e744a6fad84e9088e787"),
    ObjectId("5ef4e744a6fad84e9088e788")
  ]
});

db.answers.insertMany([{
    name: 'Donald Trump'
  },
  {
    name: 'Barack Obama'
  }
]);


db.questionThreads.deleteMany({});

// use embedded
// perform the same exercise above but using embedded documents
db.questionThreads.insertOne({
  creator: 'ryan',
  question: 'Who is the current president?',
  answers: [{
    name: 'Donald Trump'
  }, {
    name: 'Barack Obama'
  }]
});

// ----------------------- One-To-Many Using References ----------------------
// what is the one-to-many relationship here?
// why do we use references here instead of embedded documents?
// insert city in cities collection with name, coordinates field that is an object with fields lat, lng
// insert 2 citizens in the citizens collection with name
// create a one to many connection between city and citizens
db.cities.insertOne({
  name: 'Los Angeles',
  coordinates: {
    lat: 201,
    lng: 500
  }
});

db.citizens.insertMany([{
  name: 'ryan',
  city: ObjectId("5ef4ec69a6fad84e9088e789")
}, {
  name: 'michael',
  city: ObjectId("5ef4ec69a6fad84e9088e789")
}]);

// ----------------------- Many-To-Many Using Embedded ----------------------
// which approach is the best and why?
// references approach
use shop;

// reference approach
// insert document into products collection
// fields: title, price
// insert document into customers collection
// fields: name, age
// make a many to many connection between the two collections
db.products.insertOne({
  title: 'towel',
  price: 5.00
});
db.customers.insertOne({
  name: 'ryan',
  age: 29
});
db.orders.insertOne({
  productId: ObjectId("5ef4f09da6fad84e9088e78a"),
  customerId: ObjectId("5ef4f0b0a6fad84e9088e78b")
});

// embedded approach 
// perform the same exercise above but use an embedded approach
db.customers.insertOne({
  name: 'shaun',
  age: 40,
  products: [{
    title: 'towel',
    price: 5.00
  }]
});

// ----------------------- Many-To-Many Using References ----------------------
// which approach is better and why?
// what is the relationship?
use bookRegistry;

// embedded
db.books.insertOne({
  name: 'My favorite Book',
  authors: [{
    name: 'Max Schwarz',
    age: 29,
    address: {
      street: 'Main'
    }
  }, {
    name: 'Manuel Lor',
    age: 30,
    address: {
      street: 'Tree'
    }
  }]
});

// reference
// insert 2 authors in authors collection name, age, address is an object with a field street
// insert 1 books in books collection name
// create a many to many relationship without a join table
db.authors.insertMany([{
  name: 'Michael Jackson',
  age: 50,
  address: {
    street: 'World'
  }
}, {
  name: 'Tony Gwynn',
  age: 54,
  address: {
    street: 'Way'
  }
}]);

db.books.insertOne({
  name: 'Lord of the Rings'
  authorsId: [
    authorsObjectIdOne,
    authorsObjectIdTwo
  ]
})


// ----------------------- Using lookup() --------
db.customers.insertOne({
  userName: 'max',
  favBooks: [
    'id1'
  ],
});

db.books.insertOne({
  _id: 'id1',
  name: 'Lord of the Rings 1'
});

// give me this output using aggregation 
// {
//   _id: ObjectId("5ef65548c643b1fe4be89e8e"),
//   userName: "max",
//   favBooks: ["id1"],
//   favBookData: [{
//     _id: "id1",
//     name: "Lord of the Rings 1"
//   }]
// }
db.customers.aggregate({
  $lookup: {
    from: 'books',
    localField: 'favBooks',
    foreignField: '_id',
    as: 'favBookData'
  }
});



// ----------------------- Planning Example Exercise ----------------------
// What is the relationships here?

use blog;

db.users.insertyMany([{
  name: 'Max Well',
  age: 29,
  email: 'max@test.com'
}, {
  name: 'Mauel Lorenz',
  age: 30,
  email: 'manu@test.com'
}]);

db.posts.insertOne({
  title: 'My first Post!',
  text: 'This is my first post, I hope you like it!',
  tags: ['new', 'tech'],
  creator: ObjectId('authoruser1id'),
  comments: [{
    text: 'I like ',
    author: ObjectId('authoruser2id')
  }]
});

// ----------------------- Schema Validation ----------------------
// create a schema for the collection posts
db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [title, text, create, comments],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an id and is required'
        },
        comments: {
          type: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: [text, author],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an object and is required'
              }
            }
          }
        }
      }
    }
  }
})

// type of data is an object
// make sure that title, text, create, comments is required data
// set title: type = string, description = 'must be a string and is required'
// set text: type = string, description = 'must be a string and is required'
// set creator type = id, description = 'must be an id and is required'
// set comments type = array, description = 'must be an array and is required'
// set items type = 'object', make sure text, author is required
// set properties 
// set text type = 'string', description = 'must be a string and is required'
// set author type = 'id', description: 'must be an object and is required'

// change validation settings without having to create the create collection schema again
