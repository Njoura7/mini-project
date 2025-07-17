package com.project.cardflip.service;

import com.project.cardflip.dao.CardRepository;
import com.project.cardflip.dao.TopicRepository;
import com.project.cardflip.entity.Card;
import com.project.cardflip.exceptions.ApiException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public Card findById(long id) {
        Optional<Card > card = cardRepository.findById(id);
        if(!card.isPresent()) {
            throw new ApiException(HttpStatus.NOT_FOUND,
                    "Card not found with id " + id);

        }return card.get();
    }

    @Override
    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    @Override
    public Card save(Card card) {
        if(!topicRepository.existsById(card.getTopicId())) {
            throw new ApiException(HttpStatus.NOT_FOUND,
                    "Topic for card can not be found with id " + card.getTopicId());
        }
        return cardRepository.save(card);
    }

    @Override
    public void delete(long id) {
        Optional<Card > card = cardRepository.findById(id);
        if(!card.isPresent()) {
            throw new ApiException(HttpStatus.NOT_FOUND,
                    "Card not found with id " + id + ", unable to delete");
        }
        cardRepository.deleteById(id);

    }



}
