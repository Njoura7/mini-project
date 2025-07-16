package com.project.cardflip.service;

import com.project.cardflip.entity.Topic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TopicService {


    Topic getById(Long id);
    List<Topic> getTopics();
    Topic save(Topic topic);
    long delete(long id);

}
