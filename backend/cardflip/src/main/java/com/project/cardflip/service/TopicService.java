package com.project.cardflip.service;

import com.project.cardflip.entity.Topic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TopicService {


    Topic getTopicById(Long id);
    List<Topic> getTopics();
    Topic saveTopic(Topic topic);

}
