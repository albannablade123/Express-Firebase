'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();

const addStudent = async (req, res, next) => {
    try {
        const data = req.body;

        await firestore.collection('students').doc().set(data);
        res.send('Record Saved Succesfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllStudent = async (req, res, next) => {
    try {
        const students = await firestore.collection('students');
        const data = await students.get();

        data.forEach(doc => {
            console.log(doc.data());
        })
        const studentsArray = [];

        if (data.empty) {
            res.status(404).send("No students record found");
        } else {
            data.forEach(doc => {
                var student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().fatherName,
                    doc.data().class,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().subject,
                    doc.data().year,
                    doc.data().semester,
                    doc.data().status
                );

                studentsArray.push(student);
            });

            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req,res,next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();

        if (!data.exists) {
            res.status(404).send('Student with the ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        const student = await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student Record Updated Succesfully ');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Student Record Deleted Succesfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStudent,
    getAllStudent,
    getStudent,
    updateStudent,
    deleteStudent
}