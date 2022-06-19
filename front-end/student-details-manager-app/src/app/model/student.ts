import { EducationalDetail } from "../model/educational-detail";

export class Student {
    id!: number;
    firstName!: string;
    lastName!: string;
    contactNumber!: string;
    email!: string;
    parentName!: string;
    parentContactNumber!: string;
    parentEmail!: string;
    educationalDetailList!: EducationalDetail[];
}