import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection.js';

Meteor.methods({
  'tasks.update'(taskD, id){
    check(taskD, String);
    if(!this.userId){
      throw new Meteor.Error('Not authorized.');
    }
    TasksCollection.update(id, {$set: {Task_d: taskD}})

  },

  'tasks.insert'(text,task_description) {
    check(text, String);
    check(task_description, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    console.log(task_description)
    TasksCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
      Task_d: task_description
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  }
});
