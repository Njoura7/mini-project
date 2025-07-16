package com.project.cardflip.service;

import com.project.cardflip.dao.TopicRepository;
import com.project.cardflip.entity.Topic;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicServiceImpl implements TopicService {

    TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }


    @Override
    public Topic getTopicById(Long id) {
        Optional<Topic> topic = topicRepository.findById(id);

        if (topic.isPresent()) {
            return topic.get();
        }else{
            throw new RuntimeException("Topic not found with id " + id);
        }
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    @Override
    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }


}
