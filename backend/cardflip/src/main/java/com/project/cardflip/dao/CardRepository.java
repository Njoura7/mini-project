package com.project.cardflip.dao;

import com.project.cardflip.entity.Card;
import com.project.cardflip.entity.Difficulty;
import com.project.cardflip.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByTopicId(long topicId);

    @Query("SELECT c FROM Card c WHERE c.difficulty = :difficulty")
    List<Card> findByDifficulty(@Param("difficulty") Difficulty difficulty);



}
