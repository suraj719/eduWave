// MongoDB initialization script
db = db.getSiblingDB('eduwave');

// Create collections
db.createCollection('teachers');
db.createCollection('students');
db.createCollection('quizzes');
db.createCollection('resources');

// Create indexes for better performance
db.teachers.createIndex({ "email": 1 }, { unique: true });
db.students.createIndex({ "rollNumber": 1 }, { unique: true });
db.students.createIndex({ "email": 1 }, { unique: true });
db.quizzes.createIndex({ "createdAt": -1 });
db.resources.createIndex({ "class": 1 });
db.resources.createIndex({ "subject": 1 });
db.resources.createIndex({ "createdAt": -1 });

print('Database initialized successfully!');
