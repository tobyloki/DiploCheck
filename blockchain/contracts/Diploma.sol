// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract Diploma {
    struct Student {
        bool exists;
        string name;
        string graduationDate;  //yyyy-mm-dd
        string degree;
        string college;
        string major;
        string minor;
        uint GPA;  //no floats, so divde by 100 before displaying
        uint credits;
        bool graduated;
        string classesTaken;
    }

    mapping (address => bool) public admins;
    mapping (uint => Student) public students;

    uint public adminsCount;
    uint public studentsCount;    

    constructor() {
        addAdmin(msg.sender);

        addStudent(123456789, "Student 1", "2021-1-1", "Bachelor's", "Engineering", "Computer Science", "Business", 400, 200,  true, "CS161,CS270,CS340");
        addStudent(987654321, "Student 2", "2021-1-1", "Associate", "Business", "Accounting", "Statistics", 335, 100,  true, "BA270,BA300,BA400");
    }

    function addAdmin(address addr) private{
        admins[addr] = true;
    }

    function addStudent(uint id, string memory _name, string memory _date, string memory _degree, string memory _college, string memory _major, string memory _minor, uint _GPA, uint _credits, bool _graduated, string memory classes) private {
        studentsCount++;
        students[id] = Student(true, _name, _date, _degree, _college, _major, _minor, _GPA, _credits, _graduated, classes);
    }

    function Add(uint id, string memory _name, string memory _date, string memory _degree, string memory _college, string memory _major, string memory _minor, uint _GPA, uint _credits, bool _graduated, string memory classes) public {
        require(admins[msg.sender]);    // check if user is admin
        require(!students[id].exists);  // check if student doesn't exist

        studentsCount++;
        students[id] = Student(true, _name, _date, _degree, _college, _major, _minor, _GPA, _credits, _graduated, classes);
    }

    // Does not need student index, only student id
    function Edit(uint id, string memory _name, string memory _date, string memory _degree, string memory _college, string memory _major, string memory _minor, uint _GPA, uint _credits, bool _graduated, string memory classes) public{
        require(admins[msg.sender]);    // check if user is admin
        require(students[id].exists);  // check if student exists

        students[id] = Student(true, _name, _date, _degree, _college, _major, _minor, _GPA, _credits, _graduated, classes);
    }

    // requires studentid, not student index
    function Delete(uint id) public{
        require(admins[msg.sender]);    // check if user is admin
        require(students[id].exists);  // check if student exists

        studentsCount--;
        students[id] = Student(false, '', '', '', '', '', '', 0, 0, false, '');
    }
}