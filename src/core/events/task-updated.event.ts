interface TaskUpdatedEventProps {
  id: string;
  title: string;
  description: string;
}

export class TaskUpdatedEvent {
  constructor(public readonly payload: TaskUpdatedEventProps) {}
}
