interface UpdateTaskInput {
  title?: string;
  description?: string;
}

export class UpdateTaskCommand {
  constructor(public readonly id: string, public readonly payload: Partial<UpdateTaskInput>) {}
}
