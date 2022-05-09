import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Event extends mongoose.Document {
  @Prop()
  type: string;

  // 根据事件名称检索事件 为加快搜索速度
  @Prop({ index: true })
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventScheam = SchemaFactory.createForClass(Event);
// name: 1 索引按升序对项目进行排序  type: -1 索引按降序排序
EventScheam.index({ name: 1, type: -1 });
