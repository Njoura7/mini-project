package com.project.cardflip.service;

import com.project.cardflip.entity.Card;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CardService {

    Card findById(Long id);
    List<Card> findAll();
//
//    Card update(Card card);
//    Card save(Card card);
//    int deleteById(Long id);
//    int deleteByTopic(Long topicId);
}
