package com.project.cardflip.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.cardflip.entity.Card;
import com.project.cardflip.entity.Topic;
import com.project.cardflip.exceptions.ApiException;
import com.project.cardflip.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TopicRestController {

    private TopicService topicService;
    private ObjectMapper objectMapper;

    @Autowired
    public TopicRestController(TopicService topicService,  ObjectMapper objectMapper) {
        this.topicService = topicService;
        this.objectMapper = objectMapper;
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

    @PatchMapping("/topics/{topicId}")
    public Topic updateTopic(@RequestBody Map<String, Object> patchPayload, @PathVariable Long topicId) {
        Topic existingTopic = topicService.getById(topicId);
        if (existingTopic == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Topic id : " + topicId + " not found, unable to edit");}

        if (patchPayload.containsKey("id")) {
            throw new ApiException(HttpStatus.NOT_FOUND,"Topic id modification not allowed");}

        try{
            return topicService.save(edit(patchPayload, existingTopic));
        } catch (IllegalArgumentException ex) {
            String causeMessage = ex.getCause() != null ? ex.getCause().getMessage() : ex.getMessage();
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid input: " + causeMessage);
        }

    }

    private Topic edit(Map<String, Object> patchPayload, Topic topic) {
        ObjectNode topicNode = objectMapper.convertValue(topic, ObjectNode.class);
        ObjectNode patchNode = objectMapper.convertValue(patchPayload, ObjectNode.class);

        topicNode.setAll(patchNode);

        return objectMapper.convertValue(topicNode, Topic.class);


    }

}
