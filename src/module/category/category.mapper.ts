import { Injectable } from '@nestjs/common';
import _ from 'underscore';
@Injectable()
export class CategoryMapper {
  constructor() {}

  mapper(queryResultTopics) {
    const result = [];
    const group = {};
    for (const queryResultTopic of queryResultTopics) {
      if (!group[queryResultTopic.topic_name]) {
        group[queryResultTopic.topic_name] = {};
        group[queryResultTopic.topic_name].categories = [];
        group[queryResultTopic.topic_name].topic_img =
          queryResultTopic.topic_img;
      }
      const { topic_name, topic_img, ...trimmedObj } = queryResultTopic;
      group[queryResultTopic.topic_name].categories.push(trimmedObj);
    }
    for (const categoryName of Object.keys(group)) {
      result.push({
        topic_name: categoryName,
        topic_img: group[categoryName].topic_img,
        categories: group[categoryName].categories,
      });
    }
    return result;
  }
}
