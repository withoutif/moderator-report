import Moderator, { IModerator } from "../data/models/moderator";
import Report, { IReport } from "../data/models/report";
import { ReviewStates } from "../types/reviewStates";

export class ReportService {
  static async createReport(reportedPostId: String): Promise<IReport> {
    const mod = await this.findNextModerator();
    const state = mod?.id ? ReviewStates.IN_REVIEW : ReviewStates.QUEUED;
    const report = Report.create({
      postId: reportedPostId,
      reviewState: state,
      assignedModerator: mod?._id || "unassigned",
    });


    if (state.valueOf() == ReviewStates.IN_REVIEW.valueOf()) {
      await this.toggleModeratorBusy(mod?._id, false);
    }

    return report;
  }

  static async resolveReport(reportId: string): Promise<ReviewStates> {
    const report = await Report.findOneAndUpdate(
      { _id: reportId },
      {
        reviewState: ReviewStates.RESOLVED,
        resolvedDate: Date.now(),
      }
    );

    if (report?.assignedModerator) {
      await this.toggleModeratorBusy(report?.assignedModerator, true);
      await this.assignNextReport(report?.assignedModerator);
    }

    return ReviewStates.RESOLVED;
  }

  static async findNextModerator(): Promise<IModerator | null> {
    return Moderator.findOne(
      { available: true },
      {},
      { sort: { lastAssigned: 1 } }
    );
  }

  static async findNextReport(): Promise<IReport | null> {
    return Report.findOne({ reviewState: ReviewStates.QUEUED }, {}, { sort: { created_at: 1 } });
  }

  static async assignNextReport(moderatorId: string) {
    const report: IReport | null = await this.findNextReport();
    if (report) {
      await report.updateOne({ reviewState: ReviewStates.IN_REVIEW, assignedModerator: moderatorId });
      await this.toggleModeratorBusy(moderatorId, false);
    }
  }

  static async toggleModeratorBusy(id: string, isAvail: boolean) {
    const updateData = {
      available: isAvail,
      ...(!isAvail && { lastAssigned: Date.now() }),
    };
    Moderator.findOneAndUpdate({ _id: id }, updateData, {}, function (err) {
      if (err) {
        console.log(500, { error: err });
      } else {
        console.log(`Succesfully saved ${id}`);
      }
    });
  }
}
