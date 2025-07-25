package com.project.cardflip.rest;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.cardflip.dao.CardRepository;
import com.project.cardflip.entity.Card;
import com.project.cardflip.exceptions.ApiException;
import com.project.cardflip.service.CardService;
import com.project.cardflip.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CardRestController {

    private CardService cardService;
    private ObjectMapper objectMapper;

    @Autowired
    public CardRestController(CardService cardService,  ObjectMapper objectMapper) {
        this.cardService = cardService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/cards")
    public List<Card> findAll() {return cardService.findAll();}

    @GetMapping("/cards/{cardId}")
    public Card findById(@PathVariable long cardId) {
        return cardService.findById(cardId);
    }

    @PostMapping("/cards")
    public Card save(@Valid @RequestBody Card card){
        return cardService.save(card);
    }

    @DeleteMapping("/cards/{cardId}")
    public ResponseEntity<?> delete(@PathVariable long cardId){
        cardService.delete(cardId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/cards/{id}")
    public Card update(@RequestBody Map<String, Object> patchPayload, @PathVariable Long id) {
        Card existingCard = cardService.findById(id);
        if (existingCard == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Card id : " + id + " not found, unable to edit");}

        if (patchPayload.containsKey("id")) {
            throw new ApiException(HttpStatus.NOT_FOUND,"Card id modification not allowed");}

        try{
            return cardService.save(applyEdit(patchPayload, existingCard));
        } catch (IllegalArgumentException ex) {
            String causeMessage = ex.getCause() != null ? ex.getCause().getMessage() : ex.getMessage();
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid input: " + causeMessage);
        }

    }

    private Card applyEdit(Map<String, Object> patchPayload, Card card) {
        ObjectNode cardNode = objectMapper.convertValue(card, ObjectNode.class);
        ObjectNode patchNode = objectMapper.convertValue(patchPayload, ObjectNode.class);

        cardNode.setAll(patchNode);

        return objectMapper.convertValue(cardNode, Card.class);


    }




}
