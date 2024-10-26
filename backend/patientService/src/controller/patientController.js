"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicalHistory = exports.getPatientsBySex = exports.getPatientCount = exports.getPatientsByAgeRange = exports.searchPatientsByName = exports.deletePatient = exports.updatePatient = exports.getAPatient = exports.getAllPatients = exports.createPatient = void 0;
const patient_1 = __importDefault(require("../entity/patient")); // Adjust the path as necessary
// Create a new Patient
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = new patient_1.default(req.body);
        yield patient.save();
        res.status(201).json(patient);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating patient', error });
    }
});
exports.createPatient = createPatient;
// Get all Patients
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patient_1.default.find();
        res.status(200).json(patients);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching all patients', error });
    }
});
exports.getAllPatients = getAllPatients;
// Get a single Patient by ID
const getAPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId } = req.params;
        const patient = yield patient_1.default.findById(patientId);
        if (!patient) {
            res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    }
    catch (error) {
        res.status(400).json({ message: "Error fetching the patient", error: error });
    }
});
exports.getAPatient = getAPatient;
// Update a Patient
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId } = req.params;
        const updatedPatient = yield patient_1.default.findByIdAndUpdate(patientId, req.body, { new: true, runValidators: true });
        if (!updatedPatient) {
            res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(updatedPatient);
    }
    catch (error) {
        res.status(400).json({ message: "Error updating the patient", error });
    }
});
exports.updatePatient = updatePatient;
// Delete a Patient
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId } = req.params;
        const result = yield patient_1.default.findByIdAndDelete(patientId);
        if (!result) {
            res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully", patient: result });
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting the patient", error });
    }
});
exports.deletePatient = deletePatient;
// Search Patients by Name
const searchPatientsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const patients = yield patient_1.default.find({ name: new RegExp(name, 'i') });
        res.status(200).json(patients);
    }
    catch (error) {
        res.status(400).json({ message: 'Error searching patients', error });
    }
});
exports.searchPatientsByName = searchPatientsByName;
// Get Patients by Age Range
const getPatientsByAgeRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { min, max } = req.query;
    try {
        const patients = yield patient_1.default.find({ age: { $gte: min, $lte: max } });
        res.status(200).json(patients);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching patients by age range', error });
    }
});
exports.getPatientsByAgeRange = getPatientsByAgeRange;
// Get Patient Count
const getPatientCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield patient_1.default.countDocuments();
        res.status(200).json({ count });
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching patient count', error });
    }
});
exports.getPatientCount = getPatientCount;
// Get Patients by Sex
const getPatientsBySex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sex } = req.params;
    try {
        const patients = yield patient_1.default.find({ sex });
        res.status(200).json(patients);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching patients by sex', error });
    }
});
exports.getPatientsBySex = getPatientsBySex;
// Get Medical History for a Patient
const getMedicalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    try {
        const patient = yield patient_1.default.findById(patientId);
        if (!patient) {
            res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ medicalHistory: patient === null || patient === void 0 ? void 0 : patient.medicalHistory });
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching medical history', error });
    }
});
exports.getMedicalHistory = getMedicalHistory;
