package com.project.cardflip.service;

import com.project.cardflip.dao.CardRepository;
import com.project.cardflip.dao.TopicRepository;
import com.project.cardflip.entity.Card;
import com.project.cardflip.entity.Topic;
import com.project.cardflip.exceptions.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicServiceImpl implements TopicService {

    TopicRepository topicRepository;
    CardRepository cardRepository;

    public TopicServiceImpl(TopicRepository topicRepository, CardRepository cardRepository) {
        this.topicRepository = topicRepository;
        this.cardRepository = cardRepository;
    }


    @Override
    public Topic getById(Long id) {
        Optional<Topic> topic = topicRepository.findById(id);

        if (!topic.isPresent()) {
            throw new ApiException(HttpStatus.NOT_FOUND,
                    "Topic not found with id " + id);
        }
        return topic.get();
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    @Override
    public Topic save(Topic topic) {
        return topicRepository.save(topic);
    }


    @Override
    public void delete(long id)
    {
        Optional<Topic> topic = topicRepository.findById(id);
        if (!topic.isPresent()) {
            throw new ApiException(HttpStatus.NOT_FOUND,
                    "Topic not found with id " + id + " unable to delete");
        }

        deleteAllCards(id);
        topicRepository.deleteById(id);


    }

    private void deleteAllCards(long topicId){
        List<Card> cards = cardRepository.findByTopicId(topicId);
        cards.forEach(card -> {
            cardRepository.deleteById(card.getId());
        });
    }


}
