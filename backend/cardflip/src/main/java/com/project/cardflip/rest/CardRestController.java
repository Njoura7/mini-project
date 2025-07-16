package com.project.cardflip.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.cardflip.dao.CardRepository;
import com.project.cardflip.entity.Card;
import com.project.cardflip.service.CardService;
import com.project.cardflip.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CardRestController {

    private CardService cardService;
    //private TopicService topicService;
    //private ObjectMapper objectMapper;

    @Autowired
    public CardRestController(CardService cardService) {
        this.cardService = cardService;
        //this.topicService = topicService;
    }

    @GetMapping("/cards")
    public List<Card> findAll() {return cardService.findAll();}

    @GetMapping("/cards/{cardId}")
    public Card findById(@PathVariable long cardId) {
        return cardService.findById(cardId);
    }
    //need to check for topicId and diffeculty
    @PostMapping("/cards")
    public Card save(@RequestBody Card card){
        return cardService.save(card);
    }

    @DeleteMapping("/cards/{cardId}")
    public long delete(@PathVariable long cardId){
       return  cardService.delete(cardId);
    }

}
