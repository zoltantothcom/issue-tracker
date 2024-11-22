import mockData from '../../data/issues.json';
import { Issue } from '../types/common';

export class DataService {
  async fetchIssues(): Promise<Issue[]> {
    return new Promise((resolve) => resolve(mockData));
  }

  async saveIssue(issue: Issue) {
    return new Promise((resolve) => resolve(issue));
  }

  async deleteIssue(id: string) {
    return new Promise((resolve) => resolve(id));
  }
}
