var Graduation = artifacts.require("./Diploma.sol");

contract("Graduation", function(accounts) {
  it("Initialized with two students", function() {
    return Graduation.deployed().then(function(instance){
      return instance.studentsCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("Initialized students with correct values", function() { 
    return Graduation.deployed().then(async function(instance) {
        diplomaInstance = instance;
        return diplomaInstance.students(123456789);
    }).then(async function(student) {
        assert.equal(student.name, "Student 1", "contains the correct name");
        assert.equal(student.graduationDate, "2021-1-1", "containts the correct graduation date");
        assert.equal(student.degree, "Bachelor's", "containts the correct degree type");
        assert.equal(student.college, "Engineering", "containts the correct college");
        assert.equal(student.major, "Computer Science", "containts the correct major");
        assert.equal(student.minor, "Business", "containts the correct minor");
        assert.equal(student.GPA, 400, "containts the correct GPA");
        assert.equal(student.credits, 200, "containts the correct credit count");
        assert.equal(student.graduated, true, "containts valid graduation");
        assert.equal(student.classesTaken, "CS161,CS270,CS340", "containts valid class taken");
        return diplomaInstance.students(987654321);
    }).then(async function(student) {
        assert.equal(student.name, "Student 2", "contains the correct name");
        assert.equal(student.graduationDate, "2021-1-1", "containts the correct graduation date");
        assert.equal(student.degree, "Associate", "containts the correct degree type");
        assert.equal(student.college, "Business", "containts the correct college");
        assert.equal(student.major, "Accounting", "containts the correct major");
        assert.equal(student.minor, "Statistics", "containts the correct minor");
        assert.equal(student.GPA, 335, "containts the correct GPA");
        assert.equal(student.credits, 100, "containts the correct credit count");
        assert.equal(student.graduated, true, "containts valid graduation");
        assert.equal(student.classesTaken, "BA270,BA300,BA400", "containts valid graduation");
    });
  });

  it("Allows admin to add student", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentid = 156156156;
      studentname = "Student 3";
      date = "2018-06-14";
      degree = "Masters";
      college = "Science";
      major = "mathematics";
      minor = "accounting";
      gpa = 375;
      credits = 190;
      graduated = true;
      classes = "CS161,CS162";
      await diplomaInstance.Add(studentid, studentname, date, degree, college, major, minor, gpa, credits, graduated, classes);
      return diplomaInstance.studentsCount();
    }).then(function (count) {
      assert.equal(count, 3, "Total of 3 students");
      return diplomaInstance.students(156156156);
    }).then(function (newstudent) {
      assert.equal(newstudent.exists, true, "New studentexists");
      assert.equal(newstudent.name, studentname, "New student name matches one desired");
    });
  });

  it("Prevents admin to add duplicate student", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentid = 156156156;
      studentname = "Student 3";
      date = "2018-06-14";
      degree = "Masters";
      college = "Science";
      major = "mathematics";
      minor = "accounting";
      gpa = 375;
      credits = 190;
      graduated = true;
      classes = "CS161,CS162";
      return diplomaInstance.Add(studentid, studentname, date, degree, college, major, minor, gpa, credits, graduated, classes);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return diplomaInstance.studentsCount();
    });
  });

  it("Prevents non admin to add student", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentid = 123;
      studentname = "Student 4";
      date = "2018-06-14";
      degree = "Masters";
      college = "Science";
      major = "mathematics";
      minor = "accounting";
      gpa = 375;
      credits = 190;
      graduated = true;
      classes = "CS161,CS162";
      return diplomaInstance.Add(studentid, studentname, date, degree, college, major, minor, gpa, credits, graduated, classes, {from:accounts[1]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return diplomaInstance.studentsCount();
    }).then(function (count) {
      assert.equal(count, 3, "Total of 3 students");
      return diplomaInstance.students(studentid);
    }).then(function (newstudent) {
      assert.equal(newstudent.exists, false, "student doesn't exist");
    });
  });

  it("Non existent student is non existent", function() {  
    return Graduation.deployed().then(function(instance) {
      diplomaInstance = instance;
      return diplomaInstance.students(123);
    }).then(function(student) {
      assert.equal(student.exists, false, "student doesn't exist");
    }); 
  });

  it("Allows admin to edit a student", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentid = 123456789;
      studentname = "Student 0";
      date = "2018-06-14";
      degree = "Masters";
      college = "Science";
      major = "mathematics";
      minor = "accounting";
      gpa = 375;
      credits = 190;
      graduated = true;
      classes = "CS161,CS162";
      await diplomaInstance.Edit(studentid, studentname, date, degree, college, major, minor, gpa, credits, graduated, classes);
      return diplomaInstance.studentsCount();
    }).then(function (count) {
      assert.equal(count, 3, "No new students added on EDIT");
      return diplomaInstance.students(studentid);
    }).then(function (newstudent) {
      assert.equal(newstudent.name, studentname, " student name editted to student 0");
    });
  });

  it("Prevents non admin to edit a student", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentid = 123456789;
      studentname = "Student 1";
      date = "2018-06-14";
      degree = "Masters";
      college = "Science";
      major = "nothing";
      minor = "accounting";
      gpa = 375;
      credits = 190;
      graduated = true;
      classes = "CS161,CS162";
      return diplomaInstance.Edit(studentid, studentname, date, degree, college, major, minor, gpa, credits, graduated, classes, {from:accounts[1]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return diplomaInstance.studentsCount();
    }).then(function (count) {
      assert.equal(count, 3, "No new students added on EDIT");
      return diplomaInstance.students(studentid);
    }).then(function (newstudent) {
      assert.equal(newstudent.name, "Student 0", "student name not changed");
    });
  });

  it("Prevents admin to edit a non existent student", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentid = 123;
      studentname = "Student 1";
      date = "2018-06-14";
      degree = "Masters";
      college = "Science";
      major = "nothing";
      minor = "accounting";
      gpa = 375;
      credits = 190;
      graduated = true;
      classes = "CS161,CS162";
      return diplomaInstance.Edit(studentid, studentname, date, degree, college, major, minor, gpa, credits, graduated, classes, {from:accounts[1]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return diplomaInstance.studentsCount();
    }).then(function (count) {
      assert.equal(count, 3, "No new students added on EDIT");
      return diplomaInstance.students(studentid);
    }).then(function (newstudent) {
      assert.equal(newstudent.exists, false, "student doesn't exist");
    });
  });

  it("Allows admin to delete a student", function() {  
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      oldStudentsCount = await diplomaInstance.studentsCount();  //get old student count
      studentId = 123456789;
      await diplomaInstance.Delete(studentId);
      return oldStudentsCount;
    }).then(async function(count) {
      var newStudentsCount = await diplomaInstance.studentsCount();
      assert.equal(newStudentsCount, count-1, "one less student");  //assert one less student
      return diplomaInstance.students(studentid);
    }).then(async function(student) {
      assert.equal(student.exists, false, "student doesn't exist anymore");
    });
  });

  it("Student exists", function() {
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentId = 987654321;
      return diplomaInstance.students(studentId);
    }).then(function (student) {
      assert.equal(student.exists, true, "student exists");
    });
  });

  it("Prevents non admin to delete a student", function() {  
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentId = 987654321;
      return diplomaInstance.Delete(studentId, {from:accounts[1]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return diplomaInstance.studentsCount();
    }).then(async function(count) {
      assert.equal(count, 2, "same number of students");  //assert one less student
      return diplomaInstance.students(studentId);
    }).then(async function(student) {
      assert.equal(student.exists, true, "student still exists");
    });
  });

  it("Prevents admin to delete a non existent student", function() {  
    return Graduation.deployed().then(async function(instance) {
      diplomaInstance = instance;
      studentId = 123;
      return diplomaInstance.Delete(studentId);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return diplomaInstance.studentsCount();
    }).then(async function(count) {
      assert.equal(count, 2, "same number of students");  //assert one less student
      return diplomaInstance.students(studentid);
    }).then(async function(student) {
      assert.equal(student.exists, false, "student still doesn't exist");
    });
  });

});