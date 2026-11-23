
// Connect to studentDB database
db = db.getSiblingDB("studentDB");

// Access students collection
const students = db.students;

// Clear old records (for fresh practical execution)
students.deleteMany({});

// 1. Insert 5 student records
students.insertMany([
    {rollNo: 1, name: "Himanshu", age: 20, branch: "CSE", marks: 85},
    {rollNo: 2, name: "Rahul", age: 22, branch: "CSE", marks: 90},
    {rollNo: 3, name: "Priya", age: 21, branch: "IT", marks: 88},
    {rollNo: 4, name: "Aman", age: 19, branch: "ECE", marks: 78},
    {rollNo: 5, name: "Neha", age: 23, branch: "CSE", marks: 92}
]);

print("1. Five students inserted successfully");

// 2. Find all students older than 20
print("2. Students older than 20:");

printjson(students.find({age: {$gt: 20}}).toArray());

// 3. Update Rahul's age using $set
students.updateOne(
    {name: "Rahul"},
    {$set: {age: 24}}
);

print("3. Rahul's age updated successfully");

// 4. Delete one student
students.deleteOne({name: "Aman"});

print("4. Aman deleted successfully");

// 5. Display all remaining students
print("5. Final student records:");

printjson(students.find().toArray());
