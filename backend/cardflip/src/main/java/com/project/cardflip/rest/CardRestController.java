package com.project.cardflip.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.cardflip.dao.CardRepository;
import com.project.cardflip.entity.Card;
import com.project.cardflip.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CardRestController {

    private CardService cardService;
    //private ObjectMapper objectMapper;

    @Autowired
    public CardRestController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/cards")
    public List<Card> findAll() {return cardService.findAll();}

    @GetMapping("/cards/{cardId}")
    public Card findById(@PathVariable long cardId) {
        return cardService.findById(cardId);
    }

}
