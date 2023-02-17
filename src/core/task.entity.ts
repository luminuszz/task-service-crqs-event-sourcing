import { randomUUID } from 'node:crypto';
import { AggregateRoot } from '@nestjs/cqrs';
import { TaskCompletedEvent } from './events/task-completed.event';

interface TaskProps {
  title: string;
  description: string;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export class Task extends AggregateRoot {
  private props: TaskProps;

  private readonly _id: string;

  private constructor(props: TaskProps, id?: string) {
    super();
    this.props = props;
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(value: string) {
    this.props.title = value;
  }

  public get description() {
    return this.props.description;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public get completed_at() {
    return this.props.completed_at;
  }

  public get created_at() {
    return this.props.created_at;
  }
  public set created_at(value: Date) {
    this.props.created_at = value;
  }

  static create(props: TaskProps, id?: string) {
    return new Task(props, id);
  }

  public markAsCompleted() {
    this.props.completed_at = new Date();

    this.apply(new TaskCompletedEvent(this._id));
  }
}
