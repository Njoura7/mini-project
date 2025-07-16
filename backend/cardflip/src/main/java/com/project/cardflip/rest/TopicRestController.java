package com.project.cardflip.rest;

import com.project.cardflip.entity.Topic;
import com.project.cardflip.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TopicRestController {

    private TopicService topicService;

    @Autowired
    public TopicRestController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("/topics")
    public List<Topic> getTopics(){
        return topicService.getTopics();
    }

    @GetMapping("/topics/{topicId}")
    public Topic getTopic(@PathVariable long topicId){
        return topicService.getTopicById(topicId);
    }

}
