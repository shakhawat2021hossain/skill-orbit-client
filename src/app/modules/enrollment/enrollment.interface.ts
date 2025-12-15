import type { Types } from "mongoose";
export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID"
}

export interface IEnrollment {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;

    // Stripe / payment related
    paymentIntentId?: string;
    checkoutSessionId?: string;
    amountPaid?: number; // snapshot of course price at purchase time
    paymentStatus?: PaymentStatus
    

    progress: number;
    completedLessons: Types.ObjectId[];
}
