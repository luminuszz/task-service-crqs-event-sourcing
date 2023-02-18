interface TaskCreatedEventPayload {
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  completed_at: null;
  id: string;
}

export class TaskCreatedEvent {
  constructor(public readonly task: TaskCreatedEventPayload) {}
}
