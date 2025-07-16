package com.project.cardflip.service;

import com.project.cardflip.dao.CardRepository;
import com.project.cardflip.dao.TopicRepository;
import com.project.cardflip.entity.Card;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImpl implements CardService {

    CardRepository cardRepository;
    TopicRepository topicRepository;


    public CardServiceImpl(CardRepository cardRepository,  TopicRepository topicRepository) {
        this.cardRepository = cardRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public Card findById(Long id) {
        Optional<Card > card = cardRepository.findById(id);
        if(card.isPresent()) {
            return card.get();
        }else{
            throw new EntityNotFoundException("Card not found at id = " + id);
        }


    }

    @Override
    public List<Card> findAll() {
        return cardRepository.findAll();
    }
}
