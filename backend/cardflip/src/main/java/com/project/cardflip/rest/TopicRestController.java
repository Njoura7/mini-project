package com.project.cardflip.rest;

import com.project.cardflip.entity.Topic;
import com.project.cardflip.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return topicService.getById(topicId);
    }

    @PostMapping("/topics")
    public Topic saveTopic(@RequestBody Topic topic) {
        return topicService.save(topic);
    }

    @DeleteMapping("/topics/{topicId}")
    public long deleteTopic(@PathVariable long topicId) {
        return topicService.delete(topicId);
    }

}
