import type { Types } from "mongoose";

export interface IReview {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;

  rating: number;
  review: string;

  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
