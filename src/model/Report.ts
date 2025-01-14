import mongoose, { Schema, Document } from 'mongoose';

export interface Report extends Document {
  title: string;
  content: string;
  project: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId[]; // Array of members
  createdAt: Date;
}

const ReportSchema: Schema<Report> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Report title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  createdBy: [{ // Array of members
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReportModel =
  (mongoose.models.Report as mongoose.Model<Report>) ||
  mongoose.model<Report>('Report', ReportSchema);

export default ReportModel;
