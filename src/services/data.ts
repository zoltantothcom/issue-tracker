import mockData from '../../data/issues.json';
import { Issue } from '../types/common';

export class DataService {
  async fetchComments(): Promise<Issue[]> {
    return new Promise((resolve) => resolve(mockData));
  }

  async saveComment(comment: Issue) {
    return new Promise((resolve) => resolve(comment));
  }

  async deleteComment(id: string) {
    return new Promise((resolve) => resolve(id));
  }
}
