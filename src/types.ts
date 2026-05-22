export type RiskCategory = 'Low' | 'Moderate' | 'High';

export interface RiskAssessmentData {
  age: number;
  sex: 'male' | 'female';
  bpSystolic?: number;
  bpDiastolic?: number;
  cholesterol?: number;
  smoking?: boolean;
  diabetes?: boolean;
  physicalActivity?: string;
  riskScore: number;
  riskCategory: RiskCategory;
  timestamp: Date;
  userId?: string;
}

export interface EnquiryData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  interestedInConsultation?: boolean;
  createdAt: Date;
}
