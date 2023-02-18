interface CreateTaskInput {
  title: string;
  description: string;
}

export class CreateManyTasksCommand {
  constructor(public readonly payload: CreateTaskInput[]) {}
}
