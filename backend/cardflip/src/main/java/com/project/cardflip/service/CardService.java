package com.project.cardflip.service;

import com.project.cardflip.entity.Card;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CardService {

    Card findById(long id);
    List<Card> findAll();
    Card save(Card card);
    long delete(long id);
    List<Card> findAllByTopicId(long id);

//    int deleteByTopic(Long topicId);
}
