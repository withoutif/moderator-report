import sinon from 'sinon';
import { Document } from "mongoose";
import Moderator, { IModerator } from '../src/data/models/moderator';
import Report, { IReport } from '../src/data/models/report';
import { ReportService } from '../src/services/reportService';
import { ReviewStates } from '../src/types/reviewStates';


describe('ReportService', () => {
  const rep: IReport = new Report({
    postId: '123',
    reportDate: '1/12/68',
  });

  const moderator: IModerator = new Moderator({
    username: 'test',
    available: true
  });

  beforeEach(async () => {
    sinon.stub(Moderator, 'findOneAndUpdate').resolves(moderator);
    sinon.stub(Moderator, 'findOne').resolves(moderator);
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('createReport', () => {
    beforeEach(async () => {
      sinon.stub(Report, 'create').resolves(rep);
    });

    it('should create and return new report', async () => {
      const result = await ReportService.createReport('123');
      expect(result).toEqual(rep);
    });

    it('should create a report in queue if no available rep', async () => {
      
    });
  });

  describe('resolveReport', () => {

    beforeEach(async () => {
      sinon.stub(Report, 'findOneAndUpdate').resolves(rep);
      sinon.stub(Report, 'update').resolves();
    });

    afterEach(async () => {
      sinon.reset();
    });

    it('should resolve and return report', async () => {
      const result = await ReportService.resolveReport('123');
      expect(result).toEqual(rep);
    });

    it('should make call to assign report to freed agent', async () => {
      
    });

    it('should not assign report to freed agent if queue is empty', async () => {

    });
  });
});
