package com.project.cardflip.service;

import com.project.cardflip.entity.Card;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CardService {

    Card findById(long id);
    List<Card> findAll();
    Card save(Card card);
    void delete(long id);

}
