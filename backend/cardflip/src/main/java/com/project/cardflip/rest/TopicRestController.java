package com.project.cardflip.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.cardflip.entity.Card;
import com.project.cardflip.entity.Topic;
import com.project.cardflip.exceptions.ApiException;
import com.project.cardflip.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
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
    public Topic saveTopic(@Valid @RequestBody Topic topic) {
        return topicService.save(topic);
    }

    @DeleteMapping("/topics/{topicId}")
    public ResponseEntity<?> deleteTopic(@PathVariable long topicId) {
         topicService.delete(topicId);
         return ResponseEntity.noContent().build();
    }



}
