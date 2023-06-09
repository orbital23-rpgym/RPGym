/**
 * In-game quest.
 */
export default class Quest {
  name: string;
  description: string;
  maxProgress: number;
  currentProgress: number;
  startDateTime: Date;
  endDateTime: Date;

  constructor(
    name: string,
    description: string,
    maxProgress: number,
    currentProgress: number,
    startDateTime: Date,
    endDateTime: Date,
  ) {
    this.name = name;
    this.description = description;
    this.maxProgress = maxProgress;
    this.currentProgress = currentProgress;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
  }
}
