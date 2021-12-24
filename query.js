// ---------------------------------------- //

//      Penyewaan Meeting Room/Aula         //

// ---------------------------------------- //

// Membuat Collection customers
db.createCollection('customers');

// Membuat Collection rooms
db.createCollection('rooms');

// Membuat Collection orders
db.createCollection('orders');

// ----------------------------------------

// Insert document customers
db.customers.insertMany([
    {
        _id: "mr94t3z",
        name: "Muhamad Taopik",
        alamat: "Bandung"
    },
    {
        _id: "iqbal",
        name: "Iqbal Putra Ramadhan",
        alamat: "Bandung"
    },
    {
        _id: "af",
        name: "Afrinaldi",
        alamat: "Bandung"
    }
]);

// ----------------------------------------

// Update 1 data customers
db.customers.updateOne(
    {_id: "mr94t3z"}, 
    {$set: {alamat: "Majalengka"}}
)

// ----------------------------------------

// Delete 1 data customers
db.customers.remove(
    {_id: "af"}
);

// ----------------------------------------

// Insert document rooms
db.rooms.insertMany([
    {
        _id: 1,
        room_name: "Semanggi Ballroom",
        price: 500,
        theatre_capacity: 1500,
        seating_capacity: 880,
        classroom_capacity: 600,
        height: "47 x 28 x 9 m",
        surface: "1,316 sqm",
        rental_time: "1 day"
    },
    {
        _id: 2,
        room_name: "Cemara 1",
        price: 150,
        theatre_capacity: 120,
        seating_capacity: 60,
        classroom_capacity: 60,
        height: "10 x 10 x 10 m",
        surface: "230 sqm",
        rental_time: "1 day"
    },
    {
        _id: 3,
        room_name: "Cemara 2",
        price: 150,
        theatre_capacity: 120,
        seating_capacity: 60,
        classroom_capacity: 60,
        height: "10 x 10 x 10 m",
        surface: "230 sqm",
        rental_time: "1 day"
    }
]);

// ----------------------------------------

// Update 1 data rooms
db.rooms.updateOne(
    {_id: 2}, 
    {$set: {
        height: "8 x 16 x 3 m",
        surface: "128 sqm"
    }}
)

// ----------------------------------------

// Delete 1 data rooms
db.rooms.remove(
    {_id: 3}
);

// ----------------------------------------

// Insert document orders ke-1
db.orders.insertOne({
    _id: new ObjectId(),
    name: "Muhamad Taopik",
    total: 650,
    date: new Date(),
    items: [
        {
            room_id: 1,
            room_name: "Semanggi Ballroom",
            price: 500,
            rental_time: "1 day"
        },
        {
            room_id: 2,
            room_name: "Cemara 1",
            price: 150,
            rental_time: "1 day"
        }
    ]
});

// Insert document orders ke-2
db.orders.insertOne({
    _id: new ObjectId(),
    name: "Iqbal Putra Ramadhan",
    total: 150,
    date: new Date(),
    items: [
        {
            room_id: 2,
            room_name: "Cemara 1",
            price: 150,
            rental_time: "1 day"
        }
    ]
});

// Insert document orders ke-3
db.orders.insertOne({
    _id: new ObjectId(),
    name: "Afrinaldi",
    total: 150,
    date: new Date(),
    items: [
        {
            room_id: 3,
            room_name: "Cemara 2",
            price: 150,
            rental_time: "1 day"
        }
    ]
});

// ----------------------------------------

// Update 1 data orders
db.orders.updateOne(
    {name: "Afrinaldi"}, 
    {$set: {
        name: "Khoerul Ummam"
    }}
)

// ----------------------------------------

// Delete 1 data orders
db.orders.remove(
    {name: "Khoerul Ummam"}
);

// ----------------------------------------

// Laporan pendapatan perhari, perbulan, pertahun
db.orders.aggregate(
    [
      { $group: { 
          _id: { 
              day: { $dayOfYear: "$date"}, 
              year: { $year: "$date" } },
              pendapatan_perhari: { $sum: { $multiply: [ "$total", 1 ] } },
              pendapatan_perbulan: { $sum: { $multiply: [ "$total", 30 ] } },
              pendapatan_tahun: { $sum: { $multiply: [ "$total", 365 ] } },
              count: { $sum: 1 },
        }
    }
    ]
 ).pretty()

// Laporan per-item/customers
 db.orders.aggregate([
    { $project: {
        name: 1,
        items: 1,
        total_bayar: { $multiply: [ "$total", 1 ] }
        
      }
    }
 ]).pretty()

// ---------------------------------------- //

//              End Of Script               //

// ---------------------------------------- //