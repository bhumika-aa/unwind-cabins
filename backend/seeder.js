const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Cabin = require('./models/Cabin');
const Blog = require('./models/Blog');
const Experience = require('./models/Experience');
const Review = require('./models/Review');
const Booking = require('./models/Booking');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const mockImage = {
  url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&w=800&q=80',
  public_id: 'mock_image_id'
};

const cabins = Array.from({ length: 30 }).map((_, i) => ({
  title: `Cabin Retreat ${i + 1}`,
  location: 'Hampshire · England',
  description: 'A beautiful place to stay and unwind.',
  price: 150 + (i * 10),
  rating: 4.5,
  reviews: 12,
  maxGuests: 4,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  amenities: ['Wifi', 'Kitchen', 'Free parking'],
  images: [mockImage]
}));

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@unwindcabins.com',
    password: 'password123',
    role: 'admin',
    avatar: mockImage
  }
];

// Add more users
for (let i = 1; i < 10; i++) {
  users.push({
    firstName: `User${i}`,
    lastName: 'Test',
    email: `user${i}@example.com`,
    password: 'password123',
    role: 'user',
    avatar: mockImage
  });
}

const blogs = Array.from({ length: 10 }).map((_, i) => ({
  title: `Travel Guide ${i + 1}`,
  content: 'Discover the beauty of the great outdoors. This guide covers the best hiking trails, packing essentials, and how to make the most of your cabin retreat.',
  author: 'Jane Doe',
  tags: ['Travel'],
  image: mockImage
}));

const experiences = Array.from({ length: 10 }).map((_, i) => ({
  title: `Wilderness Adventure ${i + 1}`,
  description: 'Join us for a guided tour of the local flora and fauna.',
  category: 'Adventure',
  image: mockImage
}));

const importData = async () => {
  try {
    await Cabin.deleteMany();
    await User.deleteMany();
    await Blog.deleteMany();
    await Experience.deleteMany();
    await Review.deleteMany();
    await Booking.deleteMany();

    const createdCabins = await Cabin.insertMany(cabins);
    const createdUsers = await User.insertMany(users);
    await Blog.insertMany(blogs);
    await Experience.insertMany(experiences);

    // Create Bookings & Reviews tied to users and cabins
    const bookings = [];
    const reviews = [];
    
    for (let i = 0; i < 15; i++) {
      const user = createdUsers[i % createdUsers.length]._id;
      const cabin = createdCabins[i % createdCabins.length]._id;
      
      bookings.push({
        cabin,
        user,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        guests: 2,
        totalPrice: createdCabins[i % createdCabins.length].price * 3,
        status: i % 2 === 0 ? 'confirmed' : 'completed'
      });

      reviews.push({
        cabin,
        user,
        rating: 4 + (i % 2),
        comment: 'Absolutely wonderful experience! Highly recommended.',
      });
    }

    await Booking.insertMany(bookings);
    await Review.insertMany(reviews);

    console.log('Database successfully seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
