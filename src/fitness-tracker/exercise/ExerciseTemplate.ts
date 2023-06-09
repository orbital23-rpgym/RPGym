/**
 * Exercise template.
 */
export default class ExerciseTemplate {
  name: string;
  category: string;
  notes: string;

  constructor(name: string, category: string, notes: string) {
    this.name = name;
    this.category = category;
    this.notes = notes;
  }
}
